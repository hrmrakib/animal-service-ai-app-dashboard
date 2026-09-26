"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  X,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle2,
  XCircle,
  ExternalLink,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useGetUserDetailsQuery } from "@/redux/features/user/userAPI";

export interface UserDetail {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  is_verified: boolean;
  is_suspended: boolean;
  created_at: string;
}

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDetail | null;
}

function formatRole(role?: string) {
  if (!role) return "—";
  return role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  const normalized = dateStr.includes("T") ? dateStr : dateStr.replace(" ", "T");
  const date = new Date(normalized);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getInitials(name?: string, email?: string) {
  if (name && name.trim()) {
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return "U";
}

export function UserProfileModal({
  isOpen,
  onClose,
  user,
}: UserProfileModalProps) {
  const { data: detailsData, isLoading } = useGetUserDetailsQuery(
    {
      role: user?.role || "",
      id: user?.id ? String(user.id) : "",
    },
    {
      skip: !user?.id || !user?.role || !isOpen,
    }
  );

  if (!user) return null;

  const apiData = (detailsData as any)?.data || {};
  const userDetails = apiData.rider_details || {};
  const effectiveName = userDetails.name || user.name || "Unnamed User";
  const effectiveEmail = userDetails.email || user.email || "—";
  const effectivePhone = userDetails.phone || user.phone || "—";
  const effectiveRole = userDetails.role || user.role || "User";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='max-w-2xl p-0'
      hideCloseButton
    >
      <div className='flex flex-col h-full max-h-[85vh]'>
        {/* Header Banner */}
        <div className='bg-[#d08726] text-white p-6 relative shrink-0'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-1.5 rounded-md transition-colors'
            title='Close modal'
          >
            <X className='w-5 h-5 text-white' />
          </button>

          <div className='flex items-center gap-5'>
            <div className='relative'>
              <div className='w-20 h-20 rounded-full bg-white text-[#d08726] border-4 border-white flex items-center justify-center text-2xl font-bold shadow-md'>
                {getInitials(effectiveName, effectiveEmail)}
              </div>
              <div
                className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white ${
                  user.is_suspended ? "bg-red-500" : "bg-green-500"
                }`}
                title={user.is_suspended ? "Suspended" : "Active"}
              />
            </div>

            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2 flex-wrap'>
                <h2 className='text-2xl font-bold truncate'>{effectiveName}</h2>
                <span className='px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white'>
                  {formatRole(effectiveRole)}
                </span>
              </div>
              <p className='text-white/80 text-sm mt-0.5 mb-2'>
                User ID: #{user.id}
              </p>

              <div className='flex items-center gap-4 text-xs text-white/90 flex-wrap'>
                <div className='flex items-center gap-1'>
                  {user.is_verified ? (
                    <>
                      <CheckCircle2 className='w-4 h-4 text-green-300' />
                      <span>Verified Account</span>
                    </>
                  ) : (
                    <>
                      <XCircle className='w-4 h-4 text-red-200' />
                      <span>Unverified</span>
                    </>
                  )}
                </div>
                <div className='flex items-center gap-1'>
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      user.is_suspended ? "bg-red-300" : "bg-green-300"
                    }`}
                  />
                  <span>{user.is_suspended ? "Suspended" : "Active"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className='p-6 overflow-y-auto flex-1 bg-[#FAFAFA] flex flex-col gap-6 custom-scrollbar'>
          {/* User Information */}
          <section className='bg-white rounded-xl border border-gray-100 p-5 shadow-sm'>
            <h3 className='font-bold text-gray-900 mb-4 flex items-center gap-2 text-base'>
              <UserIcon className='w-4 h-4 text-brand' />
              Personal & Account Information
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8'>
              <div>
                <p className='text-xs text-gray-400 mb-1'>Full Name</p>
                <p className='font-medium text-sm text-gray-900'>
                  {effectiveName}
                </p>
              </div>

              <div>
                <p className='text-xs text-gray-400 mb-1 flex items-center gap-1'>
                  <Shield className='w-3 h-3 text-gray-400' /> Role
                </p>
                <p className='font-medium text-sm text-gray-900'>
                  {formatRole(effectiveRole)}
                </p>
              </div>

              <div>
                <p className='text-xs text-gray-400 mb-1 flex items-center gap-1'>
                  <Mail className='w-3 h-3 text-gray-400' /> Email Address
                </p>
                <p className='font-medium text-sm text-gray-900 break-all'>
                  {effectiveEmail}
                </p>
              </div>

              <div>
                <p className='text-xs text-gray-400 mb-1 flex items-center gap-1'>
                  <Phone className='w-3 h-3 text-gray-400' /> Phone Number
                </p>
                <p className='font-medium text-sm text-gray-900'>
                  {effectivePhone}
                </p>
              </div>

              <div>
                <p className='text-xs text-gray-400 mb-1 flex items-center gap-1'>
                  <Calendar className='w-3 h-3 text-gray-400' /> Registration Date
                </p>
                <p className='font-medium text-sm text-gray-900'>
                  {formatDate(user.created_at)}
                </p>
              </div>

              <div>
                <p className='text-xs text-gray-400 mb-1'>Account Status</p>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                    user.is_suspended
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  {user.is_suspended ? "Suspended" : "Active"}
                </span>
              </div>
            </div>
          </section>

          {/* Activity summary if available */}
          {(apiData.total_earnings_amount !== undefined ||
            apiData.completed_rides_count !== undefined ||
            apiData.total_orders !== undefined) && (
            <section className='bg-white rounded-xl border border-gray-100 p-5 shadow-sm'>
              <h3 className='font-bold text-gray-900 mb-4 text-base'>
                Activity Summary
              </h3>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                {apiData.total_earnings_amount !== undefined && (
                  <div className='p-3 bg-orange-50 rounded-lg'>
                    <p className='text-xs text-gray-500'>Total Earnings</p>
                    <p className='text-lg font-bold text-brand mt-1'>
                      ${Number(apiData.total_earnings_amount).toFixed(2)}
                    </p>
                  </div>
                )}
                {apiData.completed_rides_count !== undefined && (
                  <div className='p-3 bg-green-50 rounded-lg'>
                    <p className='text-xs text-gray-500'>Completed Trips</p>
                    <p className='text-lg font-bold text-green-600 mt-1'>
                      {apiData.completed_rides_count}
                    </p>
                  </div>
                )}
                {apiData.pending_rides_count !== undefined && (
                  <div className='p-3 bg-blue-50 rounded-lg'>
                    <p className='text-xs text-gray-500'>Pending Trips</p>
                    <p className='text-lg font-bold text-blue-600 mt-1'>
                      {apiData.pending_rides_count}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className='bg-white px-6 py-4 border-t border-gray-100 flex items-center justify-between shrink-0'>
          <Link
            href={`/manage-users/${user.id}?role=${user.role}`}
            className='inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline'
          >
            <span>Open Dedicated Page</span>
            <ExternalLink className='w-3.5 h-3.5' />
          </Link>

          <Button variant='outline' size='sm' onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
