import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  X,
  Star,
  CheckCircle2,
  XCircle,
  MapPin,
  Mail,
  Phone,
  Store,
} from "lucide-react";
import type { Seller } from "../data";

interface SellerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: Seller | null;
  onReject: () => void;
  onResubmit: () => void;
  onAccept: () => void;
  isAccepting?: boolean;
}

export function SellerProfileModal({
  isOpen,
  onClose,
  seller,
  onReject,
  onResubmit,
  onAccept,
  isAccepting = false,
}: SellerProfileModalProps) {
  if (!seller) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='max-w-4xl p-0'
      hideCloseButton
    >
      <div className='flex flex-col h-full max-h-[85vh]'>
        <div className='bg-[#d08726] text-white p-6 relative shrink-0'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-1.5 rounded-md transition-colors'
          >
            <X className='w-5 h-5 text-white' />
          </button>

          <div className='flex items-center gap-5'>
            <div className='relative'>
              {seller.profilePic ? (
                <img
                  src={seller.profilePic}
                  alt={seller.name}
                  className='w-20 h-20 rounded-full object-cover border-4 border-white'
                />
              ) : (
                <div className='w-20 h-20 rounded-full bg-white text-[#d08726] border-4 border-white flex items-center justify-center text-2xl font-bold'>
                  {seller.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className='absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full'></div>
            </div>

            <div>
              <h2 className='text-2xl font-bold mb-1'>{seller.name}</h2>
              <p className='text-white/80 text-sm mb-3'>
                Seller • ID: {seller.id}
              </p>

              <div className='flex items-center gap-4 text-sm text-white/90'>
                <div className='flex items-center gap-1'>
                  <Star className='w-4 h-4 fill-white' />
                  <span>{seller.rating} Rating</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Store className='w-4 h-4' />
                  <span>{seller.totalReviews} Reviews</span>
                </div>
                <div className='flex items-center gap-1'>
                  {seller.isVerified ? (
                    <>
                      <CheckCircle2 className='w-4 h-4' />
                      <span>Verified</span>
                    </>
                  ) : (
                    <>
                      <XCircle className='w-4 h-4' />
                      <span>Not Verified</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='p-6 overflow-y-auto flex-1 bg-[#FAFAFA] flex flex-col gap-6 custom-scrollbar'>
          <section className='bg-white rounded-xl border border-gray-100 p-5'>
            <h3 className='font-bold text-gray-900 mb-4'>
              Personal Information
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12'>
              <div>
                <p className='text-xs text-gray-400 mb-1'>Full Name</p>
                <p className='font-medium text-sm text-gray-900'>
                  {seller.name}
                </p>
              </div>
              <div>
                <p className='text-xs text-gray-400 mb-1'>Seller ID</p>
                <p className='font-medium text-sm text-gray-900'>{seller.id}</p>
              </div>
              <div>
                <p className='text-xs text-gray-400 mb-1 flex items-center gap-1'>
                  <Mail className='w-3 h-3' /> Email
                </p>
                <p className='font-medium text-sm text-gray-900'>
                  {seller.email || "N/A"}
                </p>
              </div>
              <div>
                <p className='text-xs text-gray-400 mb-1 flex items-center gap-1'>
                  <Phone className='w-3 h-3' /> Phone
                </p>
                <p className='font-medium text-sm text-gray-900'>
                  {seller.phone || "N/A"}
                </p>
              </div>
              <div className='md:col-span-2'>
                <p className='text-xs text-gray-400 mb-1 flex items-center gap-1'>
                  <MapPin className='w-3 h-3' /> Location
                </p>
                <p className='font-medium text-sm text-gray-900'>
                  {seller.location || "N/A"}
                </p>
              </div>
              {seller.deliveryAddress && (
                <div className='md:col-span-2'>
                  <p className='text-xs text-gray-400 mb-1'>Delivery Address</p>
                  <p className='font-medium text-sm text-gray-900'>
                    {seller.deliveryAddress}
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className='bg-white rounded-xl border border-gray-100 p-5'>
            <h3 className='font-bold text-gray-900 mb-4'>
              Business Information
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12'>
              <div>
                <p className='text-xs text-gray-400 mb-1'>Business Name</p>
                <p className='font-medium text-sm text-gray-900'>
                  {seller.businessName || "N/A"}
                </p>
              </div>
              <div>
                <p className='text-xs text-gray-400 mb-1'>Business Location</p>
                <p className='font-medium text-sm text-gray-900'>
                  {seller.businessLocation || "N/A"}
                </p>
              </div>
              <div>
                <p className='text-xs text-gray-400 mb-1'>Account Status</p>
                <p className='font-medium text-sm text-gray-900'>
                  {seller.isActive ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className='bg-white p-6 border-t flex gap-4 shrink-0 justify-center'>
          <Button
            variant='danger'
            className='w-40'
            onClick={onReject}
            disabled={isAccepting}
          >
            Reject
          </Button>
          <Button
            variant='brand'
            className='w-40'
            onClick={onResubmit}
            disabled={isAccepting}
          >
            Re submit
          </Button>
          <Button
            variant='primary'
            className='w-40'
            onClick={onAccept}
            disabled={isAccepting}
          >
            {isAccepting ? "Accepting..." : "Accept"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
