import React from "react";
import { Trash2, Eye, MapPin, Star } from "lucide-react";
import type { Seller } from "../data";

interface SellerCardProps {
  seller: Seller;
  onDelete: () => void;
  onView: () => void;
}

export function SellerCard({ seller, onDelete, onView }: SellerCardProps) {
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const statusStyles: Record<Seller["status"], string> = {
    Verified: "bg-green-50 text-green-600",
    Pending: "bg-yellow-50 text-yellow-600",
    Suspended: "bg-red-50 text-red-600",
  };

  return (
    <div className='bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col gap-4 transition-shadow hover:shadow-md'>
      {/* Header */}
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          {seller.profilePic ? (
            <img
              src={seller.profilePic}
              alt={seller.name}
              className='w-12 h-12 rounded-full object-cover'
            />
          ) : (
            <div className='w-12 h-12 rounded-full bg-[#d08726] text-white flex items-center justify-center font-bold text-lg'>
              {getInitials(seller.name)}
            </div>
          )}
          <div>
            <h3 className='font-semibold text-gray-900'>{seller.name}</h3>
            <div className='flex items-center text-xs text-gray-500 mt-0.5'>
              <Star className='w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1' />
              <span className='font-medium text-gray-700 mr-1'>
                {seller.rating}
              </span>
              <span>({seller.totalReviews} reviews)</span>
            </div>
          </div>
        </div>
        <div
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[seller.status]}`}
        >
          {seller.status}
        </div>
      </div>

      {/* Business Info */}
      <div className='bg-[#FAF9F6] rounded-lg p-3 flex flex-col gap-2'>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-gray-500 text-xs'>Business Name</span>
          <span className='font-semibold text-gray-900 truncate max-w-[140px] text-right'>
            {seller.businessName || "N/A"}
          </span>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-gray-500 text-xs'>Business Location</span>
          <span className='font-semibold text-gray-900 truncate max-w-[140px] text-right'>
            {seller.businessLocation || "N/A"}
          </span>
        </div>
      </div>

      {/* Location */}
      <div className='min-h-12'>
        {seller.location ? (
          <div className='flex flex-col gap-1'>
            <span className='text-xs text-blue-600 font-medium'>Location</span>
            <div className='flex items-center text-xs text-gray-500'>
              <MapPin className='w-3 h-3 text-blue-500 mr-1 shrink-0' />
              <span className='truncate'>{seller.location}</span>
            </div>
          </div>
        ) : (
          <div className='text-xs text-gray-400 italic flex items-center h-full'>
            No location on file
          </div>
        )}
      </div>

      {/* Actions */}
      <div className='flex items-center justify-between mt-auto pt-4 border-t border-gray-50'>
        <button
          onClick={onDelete}
          className='flex-1 flex justify-center items-center py-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors'
        >
          <Trash2 className='w-4 h-4' />
        </button>
        <div className='w-px h-6 bg-gray-200'></div>
        <button
          onClick={onView}
          className='flex-1 flex justify-center items-center py-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors'
        >
          <Eye className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
}
