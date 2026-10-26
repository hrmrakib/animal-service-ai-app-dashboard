"use client";

import React from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  X,
  Gavel,
  DollarSign,
  User,
  CheckCircle,
  XCircle,
  Clock,
  Layers,
  AlertTriangle,
} from "lucide-react";
import { UnverifiedAuction } from "@/redux/features/approval/approval.type";

interface AuctionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  auction: UnverifiedAuction | null;
  onApprove: (auction: UnverifiedAuction) => void;
  onReject: (auction: UnverifiedAuction) => void;
  isApproving?: boolean;
}

export function AuctionDetailModal({
  isOpen,
  onClose,
  auction,
  onApprove,
  onReject,
  isApproving = false,
}: AuctionDetailModalProps) {
  if (!auction) return null;

  const images = auction.images && auction.images.length > 0 ? auction.images : [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='max-w-2xl p-0 overflow-hidden'
      hideCloseButton
    >
      <div className='flex flex-col'>
        {/* Header Banner */}
        <div className='bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-6 relative'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-1.5 rounded-lg transition-colors text-white'
          >
            <X className='w-5 h-5' />
          </button>

          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 text-white'>
              <Gavel className='w-6 h-6' />
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h2 className='text-2xl font-bold'>{auction.name}</h2>
                {auction.is_verified ? (
                  <span className='px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/30 border border-emerald-300 text-white flex items-center gap-1'>
                    <CheckCircle className='w-3 h-3' /> Verified & Live
                  </span>
                ) : auction.is_rejected ? (
                  <span className='px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/30 border border-red-300 text-white flex items-center gap-1'>
                    <XCircle className='w-3 h-3' /> Rejected
                  </span>
                ) : (
                  <span className='px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-400/30 border border-white/30 text-white'>
                    Pending Auction Verification
                  </span>
                )}
              </div>
              <p className='text-white/80 text-xs mt-1'>
                Auction ID: #{auction.id} • Creator User ID: #{auction.user}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className='p-6 bg-gray-50 flex flex-col gap-6 max-h-[75vh] overflow-y-auto'>
          {images.length > 0 && (
            <div className='relative w-full h-56 bg-gray-100 rounded-xl overflow-hidden border border-gray-200'>
              <Image
                src={images[0]}
                alt={auction.name}
                fill
                className='object-contain'
                unoptimized
              />
            </div>
          )}

          <div className='bg-white rounded-xl border border-gray-100 p-5 shadow-sm'>
            <h3 className='font-semibold text-gray-900 text-sm uppercase tracking-wider mb-4 flex items-center gap-2'>
              <Layers className='w-4 h-4 text-purple-600' />
              Auction Terms & Information
            </h3>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='p-3 bg-gray-50 rounded-lg'>
                <span className='text-xs text-gray-400 block mb-1'>Auction Title</span>
                <span className='text-sm font-semibold text-gray-900'>{auction.name}</span>
              </div>

              <div className='p-3 bg-gray-50 rounded-lg'>
                <span className='text-xs text-gray-400 block mb-1 flex items-center gap-1'>
                  <DollarSign className='w-3.5 h-3.5 text-purple-600' /> Starting Bid
                </span>
                <span className='text-base font-bold text-purple-700'>
                  ${Number(auction.starting_bid).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className='p-3 bg-gray-50 rounded-lg'>
                <span className='text-xs text-gray-400 block mb-1 flex items-center gap-1'>
                  <User className='w-3.5 h-3.5 text-gray-400' /> Creator / Seller User ID
                </span>
                <span className='text-sm font-semibold text-gray-900'>
                  User #{auction.user}
                </span>
              </div>

              <div className='p-3 bg-gray-50 rounded-lg'>
                <span className='text-xs text-gray-400 block mb-1'>Auction State</span>
                {auction.is_verified ? (
                  <span className='inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200'>
                    <CheckCircle className='w-3.5 h-3.5' /> Verified & Live
                  </span>
                ) : auction.is_rejected ? (
                  <span className='inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-200'>
                    <XCircle className='w-3.5 h-3.5' /> Rejected
                  </span>
                ) : (
                  <span className='inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200'>
                    <Clock className='w-3.5 h-3.5' /> Awaiting Approval
                  </span>
                )}
              </div>

              {auction.is_rejected && (
                <div className='p-3 bg-red-50 rounded-lg sm:col-span-2 border border-red-200'>
                  <span className='text-xs text-red-600 font-semibold block mb-0.5'>
                    Status Flag: Rejected previously
                  </span>
                  <span className='text-xs text-red-500'>
                    This auction was rejected by moderation.
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className='bg-purple-50 border border-purple-200 rounded-xl p-4 text-xs text-purple-800 leading-relaxed flex items-start gap-2.5'>
            <AlertTriangle className='w-4 h-4 text-purple-600 shrink-0 mt-0.5' />
            <div>
              <p className='font-semibold mb-0.5'>Auction Verification Review:</p>
              Please verify that starting bid values adhere to animal valuation rules and auction guidelines before approving. Approving publishes the auction to bidders.
            </div>
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
            Close
          </Button>

          <div className='flex items-center gap-3'>
            {!auction.is_rejected && (
              <Button
                variant='danger'
                size='sm'
                className='px-5 flex items-center gap-1.5'
                onClick={() => onReject(auction)}
                disabled={isApproving}
              >
                <XCircle className='w-4 h-4' />
                Reject Auction
              </Button>
            )}

            {!auction.is_verified && (
              <Button
                variant='primary'
                size='sm'
                className='px-6 flex items-center gap-1.5 bg-[#00b341] hover:bg-[#009b35]'
                onClick={() => onApprove(auction)}
                isLoading={isApproving}
              >
                <CheckCircle className='w-4 h-4' />
                Approve Auction
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
