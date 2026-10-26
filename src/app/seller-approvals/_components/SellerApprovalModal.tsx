"use client";

import React from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  X,
  XCircle,
  Mail,
  Phone,
  Store,
  ShieldAlert,
  UserCheck,
} from "lucide-react";
import { UnverifiedSeller } from "@/redux/features/approval/approval.type";

interface SellerApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: UnverifiedSeller | null;
  onApprove: (seller: UnverifiedSeller) => void;
  onReject: (seller: UnverifiedSeller) => void;
  isApproving?: boolean;
}

export function SellerApprovalModal({
  isOpen,
  onClose,
  seller,
  onApprove,
  onReject,
  isApproving = false,
}: SellerApprovalModalProps) {
  if (!seller) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='max-w-2xl p-0 overflow-hidden'
      hideCloseButton
    >
      <div className='flex flex-col'>
        {/* Header Banner */}
        <div className='bg-gradient-to-r from-[#d08726] to-[#b8751d] text-white p-6 relative'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-1.5 rounded-lg transition-colors text-white'
          >
            <X className='w-5 h-5' />
          </button>

          <div className='flex items-center gap-4'>
            <div className='relative'>
              {seller.profile_pic ? (
                <Image
                  src={seller.profile_pic}
                  alt={seller.name}
                  width={72}
                  height={72}
                  className='w-18 h-18 rounded-full object-cover border-4 border-white/80 shadow-sm'
                  unoptimized
                />
              ) : (
                <div className='w-18 h-18 rounded-full bg-white text-[#d08726] border-4 border-white/80 flex items-center justify-center text-xl font-bold shadow-sm'>
                  {(seller.name || "S").slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <div className='flex items-center gap-2'>
                <h2 className='text-2xl font-bold'>{seller.name}</h2>
                <span className='px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-400/30 border border-white/30 text-white'>
                  Pending Verification
                </span>
              </div>
              <p className='text-white/80 text-sm mt-0.5'>
                Role: {seller.role.toUpperCase()} • ID: #{seller.id}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className='p-6 bg-gray-50 flex flex-col gap-5'>
          <div className='bg-white rounded-xl border border-gray-100 p-5 shadow-sm'>
            <h3 className='font-semibold text-gray-900 text-sm uppercase tracking-wider mb-4 flex items-center gap-2'>
              <Store className='w-4 h-4 text-brand' />
              Seller Contact & Account Info
            </h3>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='p-3 bg-gray-50 rounded-lg'>
                <span className='text-xs text-gray-400 block mb-1'>Store / Full Name</span>
                <span className='text-sm font-medium text-gray-900'>{seller.name}</span>
              </div>

              <div className='p-3 bg-gray-50 rounded-lg'>
                <span className='text-xs text-gray-400 block mb-1'>Seller Account ID</span>
                <span className='text-sm font-semibold text-gray-900'>#{seller.id}</span>
              </div>

              <div className='p-3 bg-gray-50 rounded-lg'>
                <span className='text-xs text-gray-400 block mb-1 flex items-center gap-1'>
                  <Mail className='w-3 h-3' /> Email Address
                </span>
                <span className='text-sm font-medium text-gray-900 break-all'>
                  {seller.email}
                </span>
              </div>

              <div className='p-3 bg-gray-50 rounded-lg'>
                <span className='text-xs text-gray-400 block mb-1 flex items-center gap-1'>
                  <Phone className='w-3 h-3' /> Phone Number
                </span>
                <span className='text-sm font-medium text-gray-900'>
                  {seller.phone || "Not provided"}
                </span>
              </div>

              <div className='p-3 bg-gray-50 rounded-lg'>
                <span className='text-xs text-gray-400 block mb-1'>Verification Status</span>
                <span className='inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200'>
                  <ShieldAlert className='w-3.5 h-3.5' /> Unverified
                </span>
              </div>

              <div className='p-3 bg-gray-50 rounded-lg'>
                <span className='text-xs text-gray-400 block mb-1'>Account State</span>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md border ${
                  seller.is_suspended
                    ? "text-red-700 bg-red-50 border-red-200"
                    : "text-green-700 bg-green-50 border-green-200"
                }`}>
                  {seller.is_suspended ? "Suspended" : "Active (Awaiting Approval)"}
                </span>
              </div>
            </div>
          </div>

          <div className='bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 leading-relaxed'>
            <p className='font-semibold mb-1'>Review Guidance:</p>
            Please check the seller profile carefully before granting access. Approving will activate the seller’s verified status and permit them to publish product and auction listings.
          </div>
        </div>

        {/* Footer Actions */}
        <div className='bg-white px-6 py-4 border-t border-gray-100 flex items-center justify-between'>
          <Button
            variant='outline'
            size='sm'
            onClick={onClose}
            disabled={isApproving}
          >
            Cancel
          </Button>

          <div className='flex items-center gap-3'>
            <Button
              variant='danger'
              size='sm'
              className='px-5 flex items-center gap-1.5'
              onClick={() => onReject(seller)}
              disabled={isApproving}
            >
              <XCircle className='w-4 h-4' />
              Reject Seller
            </Button>
            <Button
              variant='primary'
              size='sm'
              className='px-6 flex items-center gap-1.5 bg-[#00b341] hover:bg-[#009b35]'
              onClick={() => onApprove(seller)}
              isLoading={isApproving}
            >
              <UserCheck className='w-4 h-4' />
              Approve Seller
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
