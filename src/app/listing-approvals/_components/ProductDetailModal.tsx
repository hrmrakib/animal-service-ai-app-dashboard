"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  X,
  Tag,
  DollarSign,
  User,
  Package,
  CheckCircle,
  XCircle,
  Layers,
  AlertTriangle,
} from "lucide-react";
import { ApprovalProduct } from "@/redux/features/approval/approval.type";

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ApprovalProduct | null;
  onApprove: (product: ApprovalProduct) => void;
  onReject: (product: ApprovalProduct) => void;
  isApproving?: boolean;
}

export function ProductDetailModal({
  isOpen,
  onClose,
  product,
  onApprove,
  onReject,
  isApproving = false,
}: ProductDetailModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='max-w-3xl p-0 overflow-hidden'
      hideCloseButton
    >
      <div className='flex flex-col'>
        {/* Header */}
        <div className='bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 relative'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-1.5 rounded-lg transition-colors text-white'
          >
            <X className='w-5 h-5' />
          </button>

          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 text-white'>
              <Package className='w-6 h-6' />
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h2 className='text-2xl font-bold'>{product.name}</h2>
                <span className='px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/30 border border-white/30 text-white'>
                  Pending Approval
                </span>
              </div>
              <p className='text-white/80 text-xs mt-1'>
                Product ID: #{product.id} • Seller User ID: #{product.user}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className='p-6 bg-gray-50 flex flex-col gap-6 max-h-[75vh] overflow-y-auto'>
          {/* Images Gallery */}
          {images.length > 0 ? (
            <div className='flex flex-col gap-3'>
              <div className='relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border border-gray-200'>
                <Image
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className='object-contain'
                  unoptimized
                />
              </div>
              {images.length > 1 && (
                <div className='flex gap-2 overflow-x-auto pb-1'>
                  {images.map((img, i) => (
                    <button
                      key={i}
                      type='button'
                      onClick={() => setSelectedImageIndex(i)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImageIndex === i
                          ? "border-emerald-600 ring-2 ring-emerald-200"
                          : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`thumbnail-${i}`}
                        fill
                        className='object-cover'
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className='w-full h-36 bg-gray-100 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-1.5'>
              <Package className='w-8 h-8 text-gray-300' />
              <p className='text-xs'>No product images uploaded</p>
            </div>
          )}

          {/* Details Grid */}
          <div className='bg-white rounded-xl border border-gray-100 p-5 shadow-sm'>
            <h3 className='font-semibold text-gray-900 text-sm uppercase tracking-wider mb-4 flex items-center gap-2'>
              <Layers className='w-4 h-4 text-emerald-600' />
              Product Listing Information
            </h3>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='p-3 bg-gray-50 rounded-lg'>
                <span className='text-xs text-gray-400 block mb-1'>Product Name</span>
                <span className='text-sm font-semibold text-gray-900'>{product.name}</span>
              </div>

              <div className='p-3 bg-gray-50 rounded-lg'>
                <span className='text-xs text-gray-400 block mb-1 flex items-center gap-1'>
                  <DollarSign className='w-3.5 h-3.5 text-emerald-600' /> Listed Price
                </span>
                <span className='text-base font-bold text-emerald-600'>
                  ${Number(product.price).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className='p-3 bg-gray-50 rounded-lg'>
                <span className='text-xs text-gray-400 block mb-1 flex items-center gap-1'>
                  <Tag className='w-3.5 h-3.5 text-gray-400' /> Product Type / Category
                </span>
                <span className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 capitalize'>
                  {product.product_type}
                </span>
              </div>

              <div className='p-3 bg-gray-50 rounded-lg'>
                <span className='text-xs text-gray-400 block mb-1 flex items-center gap-1'>
                  <User className='w-3.5 h-3.5 text-gray-400' /> Seller / Owner User ID
                </span>
                <span className='text-sm font-semibold text-gray-900'>
                  User #{product.user}
                </span>
              </div>

              <div className='p-3 bg-gray-50 rounded-lg sm:col-span-2'>
                <span className='text-xs text-gray-400 block mb-1'>Approval State</span>
                <div className='flex items-center gap-2'>
                  <span className='inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200'>
                    <AlertTriangle className='w-3.5 h-3.5' /> Awaiting Admin Approval
                  </span>
                  {product.is_rejected && (
                    <span className='inline-flex items-center text-xs font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-200'>
                      Previously Rejected
                    </span>
                  )}
                </div>
              </div>
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
            <Button
              variant='danger'
              size='sm'
              className='px-5 flex items-center gap-1.5'
              onClick={() => onReject(product)}
              disabled={isApproving}
            >
              <XCircle className='w-4 h-4' />
              Reject Product
            </Button>
            <Button
              variant='primary'
              size='sm'
              className='px-6 flex items-center gap-1.5 bg-[#00b341] hover:bg-[#009b35]'
              onClick={() => onApprove(product)}
              isLoading={isApproving}
            >
              <CheckCircle className='w-4 h-4' />
              Approve Product
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
