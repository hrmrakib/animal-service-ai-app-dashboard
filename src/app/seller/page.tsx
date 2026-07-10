"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SellerCard } from "./_components/SellerCard";
import { DeleteSellerModal } from "./_components/DeleteSellerModal";
import { SellerProfileModal } from "./_components/SellerProfileModal";
import { RejectReasonModal } from "@/components/ui/RejectReasonModal";
import { Seller } from "./data";
import { Store, ShoppingBag, DollarSign, Star } from "lucide-react";
import {
  useGetAllSellersQuery,
  useAcceptUserMutation,
  useRejectUserMutation,
  useResubmitUserMutation,
  useDeleteUserMutation,
} from "@/redux/features/manage/manageDriversVeterinariansAPI";
import { toast } from "react-hot-toast";
import { SellerApi } from "@/redux/features/manage/manage.type";

function mapApiSellerToSeller(item: SellerApi): Seller {
  const isVerified = item.is_verified ?? false;
  const status: Seller["status"] = !isVerified
    ? "Pending"
    : !item.is_active
      ? "Suspended"
      : "Verified";

  return {
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    profilePic: item.profile_pic,
    location: item.location,
    deliveryAddress: item.delivery_address,
    isActive: item.is_active,
    isVerified,
    businessName: item.business_name,
    businessLocation: item.business_location,
    rating: item.average_rating ?? 0,
    totalReviews: item.total_reviews ?? 0,
    status,
  };
}

type ModalAction = "reject" | "resubmit" | null;

export default function ManageSellersPage() {
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [modalAction, setModalAction] = useState<ModalAction>(null);

  const { data, isLoading, isError, refetch } =
    useGetAllSellersQuery(undefined);

  const [acceptUser, { isLoading: isAccepting }] = useAcceptUserMutation();
  const [rejectUser, { isLoading: isRejecting }] = useRejectUserMutation();
  const [resubmitUser, { isLoading: isResubmitting }] =
    useResubmitUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const sellers: Seller[] = (data?.results ?? []).map(mapApiSellerToSeller);
  const summary = data?.summary;

  const handleAccept = async () => {
    if (!selectedSeller) return;
    try {
      await acceptUser(selectedSeller.id).unwrap();
      toast.success("Seller accepted successfully");
      setIsProfileOpen(false);
      setSelectedSeller(null);
      refetch();
    } catch {
      toast.error("Failed to accept seller");
    }
  };

  const handleRejectSubmit = async (reason: string) => {
    if (!selectedSeller || !modalAction) return;
    try {
      if (modalAction === "reject") {
        await rejectUser({ id: selectedSeller.id, data: { reason } }).unwrap();
        toast.success("Seller rejected successfully");
      } else {
        await resubmitUser({
          id: selectedSeller.id,
          data: { reason },
        }).unwrap();
        toast.success("Resubmit request sent successfully");
      }
      setIsRejectOpen(false);
      setIsProfileOpen(false);
      setSelectedSeller(null);
      setModalAction(null);
      refetch();
    } catch {
      toast.error(
        modalAction === "reject"
          ? "Failed to reject seller"
          : "Failed to request resubmit",
      );
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSeller) return;
    try {
      await deleteUser(selectedSeller.id).unwrap();
      toast.success("Seller deleted successfully");
      setIsDeleteOpen(false);
      setSelectedSeller(null);
      refetch();
    } catch {
      toast.error("Failed to delete seller");
    }
  };

  const stats = [
    {
      label: "Verified Sellers",
      sub: "Currently active",
      value: `${summary?.verified_count ?? 0}`,
      icon: <Store className='w-5 h-5 text-green-500' />,
    },
    {
      label: "Unverified Sellers",
      sub: `${summary?.suspended_count ?? 0} suspended`,
      value: `${summary?.unverified_count ?? 0}`,
      icon: <ShoppingBag className='w-5 h-5 text-yellow-500' />,
    },
    {
      label: "Completed Orders",
      sub: "Overall",
      value: `${summary?.completed_orders ?? 0}`,
      icon: <DollarSign className='w-5 h-5 text-blue-500' />,
    },
    {
      label: "Total Revenue",
      sub: "Overall",
      value: `$${(summary?.total_revenue ?? 0).toFixed(2)}`,
      icon: <Star className='w-5 h-5 text-orange-500' />,
    },
  ];

  return (
    <DashboardLayout title='Sellers' subtitle='Welcome back, Admin'>
      <div className='flex flex-col gap-6 mt-4'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <h2 className='text-xl font-bold text-gray-900'>Seller Management</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className='bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between'
            >
              <div className='flex items-center gap-2 mb-3'>
                {stat.icon}
                <span className='text-sm font-semibold text-gray-700'>
                  {stat.label}
                </span>
              </div>
              <div>
                <p className='text-3xl font-bold text-gray-900 leading-none mb-1'>
                  {stat.value}
                </p>
                <p className='text-xs text-gray-400'>{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className='py-16 text-center text-gray-400 text-sm'>
            Loading sellers...
          </div>
        ) : isError ? (
          <div className='py-16 text-center text-red-500 text-sm'>
            Failed to load sellers. Please try again.
          </div>
        ) : sellers.length === 0 ? (
          <div className='py-16 text-center text-gray-400 text-sm'>
            No sellers found.
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {sellers.map((seller) => (
              <SellerCard
                key={seller.id}
                seller={seller}
                onDelete={() => {
                  setSelectedSeller(seller);
                  setIsDeleteOpen(true);
                }}
                onView={() => {
                  setSelectedSeller(seller);
                  setIsProfileOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <DeleteSellerModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedSeller(null);
        }}
        onConfirm={handleDeleteConfirm}
        seller={selectedSeller}
        isDeleting={isDeleting}
      />

      <SellerProfileModal
        isOpen={isProfileOpen}
        onClose={() => {
          setIsProfileOpen(false);
          setSelectedSeller(null);
        }}
        seller={selectedSeller}
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
