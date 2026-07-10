"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DriverCard } from "./_components/DriverCard";
import { DeleteDriverModal } from "./_components/DeleteDriverModal";
import { RejectReasonModal } from "@/components/ui/RejectReasonModal";
import { DriverProfileModal } from "./_components/DriverProfileModal";
import { Driver } from "./data";
import {
  Banknote,
  Wallet,
  Car,
  Users,
  Truck,
  List,
  Grid2X2,
} from "lucide-react";
import { useGetAllDriversQuery } from "@/redux/features/manage/manageDriversVeterinariansAPI";
import {
  useAcceptUserMutation,
  useDeleteUserMutation,
  useRejectUserMutation,
  useResubmitUserMutation,
} from "@/redux/features/manage/manageDriversVeterinariansAPI";
import { toast } from "react-hot-toast";
import { TransportProviderApi } from "@/redux/features/manage/manage.type";

function mapApiDriverToDriver(item: TransportProviderApi): Driver {
  const status: Driver["status"] = !item.is_verified
    ? "Pending"
    : item.rider_status === "suspended"
      ? "Reject"
      : item.rider_status === "active"
        ? "Available"
        : "Offline";

  return {
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    profilePic: item.profile_pic,
    location: item.location,
    rating: item.average_rating ?? 0,
    totalTrips: item.total_reviews ?? 0,
    status,
    isVerified: item.is_verified,
    riderStatus: item.rider_status,
    license: item.license,
    licenseExpiry: item.license_expiry,
    licenseType: item.license_type,
    vehicleType: item.vehicle_type,
    vehicleYear: item.vehicle_year,
    yearOfExperience: item.year_of_experience ?? 0,
  };
}

type ModalAction = "reject" | "resubmit" | null;

export default function ManageDriversPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [modalAction, setModalAction] = useState<ModalAction>(null);

  const { data, isLoading, isError, refetch } =
    useGetAllDriversQuery(undefined);

  const [acceptUser, { isLoading: isAccepting }] = useAcceptUserMutation();
  const [rejectUser, { isLoading: isRejecting }] = useRejectUserMutation();
  const [resubmitUser, { isLoading: isResubmitting }] =
    useResubmitUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const drivers: Driver[] = (data?.results ?? []).map(mapApiDriverToDriver);
  const summary = data?.summary;

  const handleAccept = async () => {
    if (!selectedDriver) return;
    try {
      await acceptUser(selectedDriver.id).unwrap();
      toast.success("Driver accepted successfully");
      setIsProfileOpen(false);
      setSelectedDriver(null);
      refetch();
    } catch {
      toast.error("Failed to accept driver");
    }
  };

  const handleRejectSubmit = async (reason: string) => {
    if (!selectedDriver || !modalAction) return;
    try {
      if (modalAction === "reject") {
        await rejectUser({ id: selectedDriver.id, data: { reason } }).unwrap();
        toast.success("Driver rejected successfully");
      } else {
        await resubmitUser({
          id: selectedDriver.id,
          data: { reason },
        }).unwrap();
        toast.success("Resubmit request sent successfully");
      }
      setIsRejectOpen(false);
      setIsProfileOpen(false);
      setSelectedDriver(null);
      setModalAction(null);
      refetch();
    } catch {
      toast.error(
        modalAction === "reject"
          ? "Failed to reject driver"
          : "Failed to request resubmit",
      );
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDriver) return;
    try {
      await deleteUser(selectedDriver.id).unwrap();
      toast.success("Driver deleted successfully");
      setIsDeleteOpen(false);
      setSelectedDriver(null);
      refetch();
    } catch {
      toast.error("Failed to delete driver");
    }
  };

  const stats = [
    {
      label: "Total Revenue",
      value: `$${(summary?.total_revenue ?? 0).toFixed(2)}`,
      icon: <Banknote className='w-5 h-5 text-blue-500' />,
      bg: "bg-blue-50",
    },
    {
      label: "Total Trips",
      value: `${summary?.total_trips ?? 0}`,
      icon: <Wallet className='w-5 h-5 text-orange-500' />,
      bg: "bg-orange-50",
    },
    {
      label: "Total Drivers",
      value: `${summary?.total_transport_providers ?? 0}`,
      icon: <Car className='w-5 h-5 text-blue-500' />,
      bg: "bg-blue-50",
    },
    {
      label: "Verified Drivers",
      value: `${summary?.verified_count ?? 0}`,
      icon: <Users className='w-5 h-5 text-green-500' />,
      bg: "bg-green-50",
    },
    {
      label: "Unverified Drivers",
      value: `${summary?.unverified_count ?? 0}`,
      icon: <Truck className='w-5 h-5 text-red-500' />,
      bg: "bg-red-50",
    },
  ];

  return (
    <DashboardLayout title='Drivers' subtitle='Welcome back, Admin'>
      <div className='flex flex-col gap-6 mt-4'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className='bg-white rounded-xl p-5 border border-gray-100 flex flex-col gap-3 shadow-sm'
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg}`}
              >
                {stat.icon}
              </div>
              <div>
                <p className='text-xs text-gray-500 font-medium mb-1'>
                  {stat.label}
                </p>
                <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <h2 className='text-lg font-bold text-gray-900'>All Drivers</h2>
            <div className='flex items-center gap-3'>
              <div className='flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1'>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-white shadow-sm text-brand" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <Grid2X2 className='w-4 h-4' />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-white shadow-sm text-brand" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <List className='w-4 h-4' />
                </button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className='py-16 text-center text-gray-400 text-sm'>
              Loading drivers...
            </div>
          ) : isError ? (
            <div className='py-16 text-center text-red-500 text-sm'>
              Failed to load drivers. Please try again.
            </div>
          ) : drivers.length === 0 ? (
            <div className='py-16 text-center text-gray-400 text-sm'>
              No drivers found.
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  : "flex flex-col gap-4"
              }
            >
              {drivers.map((driver) => (
                <DriverCard
                  key={driver.id}
                  driver={driver}
                  viewMode={viewMode}
                  onDelete={() => {
                    setSelectedDriver(driver);
                    setIsDeleteOpen(true);
                  }}
                  onView={() => {
                    setSelectedDriver(driver);
                    setIsProfileOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <DeleteDriverModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedDriver(null);
        }}
        onConfirm={handleDeleteConfirm}
        driver={selectedDriver}
        isDeleting={isDeleting}
      />

      <DriverProfileModal
        isOpen={isProfileOpen}
        onClose={() => {
          setIsProfileOpen(false);
          setSelectedDriver(null);
        }}
        driver={selectedDriver}
        onReject={() => {
          setModalAction("reject");
          setIsRejectOpen(true);
        }}
        onResubmit={() => {
          setModalAction("resubmit");
          setIsRejectOpen(true);
        }}
        onAccept={handleAccept}
        isAccepting={isAccepting}
      />

      <RejectReasonModal
        isOpen={isRejectOpen}
        onClose={() => {
          setIsRejectOpen(false);
          setModalAction(null);
        }}
        onSubmit={handleRejectSubmit}
        title={modalAction === "resubmit" ? "Resubmit Reason" : "Reject Reason"}
        isSubmitting={modalAction === "reject" ? isRejecting : isResubmitting}
      />
    </DashboardLayout>
  );
}
