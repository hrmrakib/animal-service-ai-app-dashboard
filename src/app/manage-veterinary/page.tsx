"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { VetCard } from "./_components/VetCard";
import { DeleteVetModal } from "./_components/DeleteVetModal";
import { VetProfileModal } from "./_components/VetProfileModal";
import { RejectReasonModal } from "@/components/ui/RejectReasonModal";
import { Vet } from "./data";
import { Users, Stethoscope, CalendarCheck, Star } from "lucide-react";
import {
  useGetAllVeterinariansQuery,
  useAcceptUserMutation,
  useRejectUserMutation,
  useResubmitUserMutation,
  useDeleteUserMutation,
} from "@/redux/features/manage/manageDriversVeterinariansAPI";

import { toast } from "react-hot-toast";
import { VeterinarianApi } from "@/redux/features/manage/manage.type";

function mapApiVetToVet(item: VeterinarianApi): Vet {
  const status: Vet["status"] = !item.is_verified
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
    rating: item.average_rating ?? 0,
    totalReviews: item.total_reviews ?? 0,
    isVerified: item.is_verified,
    isActive: item.is_active,
    clinicName: item.clinic_name,
    clinicLocation: item.clinic_location,
    specializations: item.specializations ?? [],
    certifications: item.certifications ?? [],
    professionalBio: item.professional_bio,
    yearsExperience: item.year_of_experience ?? 0,
    bookingFee: item.appointment_booking_fee,
    vetLicenseDoc: item.vetenary_license,
    nidDoc: item.nid,
    status,
  };
}

type ModalAction = "reject" | "resubmit" | null;

export default function ManageVeterinaryPage() {
  const [selectedVet, setSelectedVet] = useState<Vet | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [modalAction, setModalAction] = useState<ModalAction>(null);

  const { data, isLoading, isError, refetch } =
    useGetAllVeterinariansQuery(undefined);

  const [acceptUser, { isLoading: isAccepting }] = useAcceptUserMutation();
  const [rejectUser, { isLoading: isRejecting }] = useRejectUserMutation();
  const [resubmitUser, { isLoading: isResubmitting }] =
    useResubmitUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const vets: Vet[] = (data?.results ?? []).map(mapApiVetToVet);
  const summary = data?.summary;

  const handleAccept = async () => {
    if (!selectedVet) return;
    try {
      await acceptUser(selectedVet.id).unwrap();
      toast.success("Veterinarian accepted successfully");
      setIsProfileOpen(false);
      setSelectedVet(null);
      refetch();
    } catch {
      toast.error("Failed to accept veterinarian");
    }
  };

  const handleRejectSubmit = async (reason: string) => {
    if (!selectedVet || !modalAction) return;
    try {
      if (modalAction === "reject") {
        await rejectUser({ id: selectedVet.id, data: { reason } }).unwrap();
        toast.success("Veterinarian rejected successfully");
      } else {
        await resubmitUser({ id: selectedVet.id, data: { reason } }).unwrap();
        toast.success("Resubmit request sent successfully");
      }
      setIsRejectOpen(false);
      setIsProfileOpen(false);
      setSelectedVet(null);
      setModalAction(null);
      refetch();
    } catch {
      toast.error(
        modalAction === "reject"
          ? "Failed to reject veterinarian"
          : "Failed to request resubmit",
      );
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedVet) return;
    try {
      await deleteUser(selectedVet.id).unwrap();
      toast.success("Veterinarian deleted successfully");
      setIsDeleteOpen(false);
      setSelectedVet(null);
      refetch();
    } catch {
      toast.error("Failed to delete veterinarian");
    }
  };

  const stats = [
    {
      label: "Verified Vets",
      sub: "Currently active",
      value: `${summary?.verified_count ?? 0}`,
      icon: <Stethoscope className='w-5 h-5 text-green-500' />,
    },
    {
      label: "Total Appointments",
      sub: "Overall",
      value: `${summary?.total_appointments ?? 0}`,
      icon: <Users className='w-5 h-5 text-blue-500' />,
    },
    {
      label: "Total Bills",
      sub: `$${(summary?.total_revenue ?? 0).toFixed(2)} revenue`,
      value: `${summary?.total_bills ?? 0}`,
      icon: <CalendarCheck className='w-5 h-5 text-orange-500' />,
    },
    {
      label: "Unverified Vets",
      sub: `${summary?.suspended_count ?? 0} suspended`,
      value: `${summary?.unverified_count ?? 0}`,
      icon: <Star className='w-5 h-5 text-yellow-500' />,
    },
  ];

  return (
    <DashboardLayout title='Veterinary' subtitle='Welcome back, Admin'>
      <div className='flex flex-col gap-6 mt-4'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <h2 className='text-xl font-bold text-gray-900'>
            Veterinary Management
          </h2>
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
            Loading veterinarians...
          </div>
        ) : isError ? (
          <div className='py-16 text-center text-red-500 text-sm'>
            Failed to load veterinarians. Please try again.
          </div>
        ) : vets.length === 0 ? (
          <div className='py-16 text-center text-gray-400 text-sm'>
            No veterinarians found.
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {vets.map((vet) => (
              <VetCard
                key={vet.id}
                vet={vet}
                onDelete={() => {
                  setSelectedVet(vet);
                  setIsDeleteOpen(true);
                }}
                onView={() => {
                  setSelectedVet(vet);
                  setIsProfileOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <DeleteVetModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedVet(null);
        }}
        onConfirm={handleDeleteConfirm}
        vet={selectedVet}
        isDeleting={isDeleting}
      />

      <VetProfileModal
        isOpen={isProfileOpen}
        onClose={() => {
          setIsProfileOpen(false);
          setSelectedVet(null);
        }}
        vet={selectedVet}
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
