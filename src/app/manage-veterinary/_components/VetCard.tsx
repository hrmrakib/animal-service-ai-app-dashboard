import React from "react";
import { Trash2, Eye } from "lucide-react";
import type { Vet } from "../data";

interface VetCardProps {
  vet: Vet;
  onDelete: () => void;
  onEdit?: () => void;
  onView: () => void;
}

export function VetCard({ vet, onDelete, onEdit, onView }: VetCardProps) {
  const getInitials = (name: string) => {
    // Remove "Dr. " if exists
    const cleanName = name.replace("Dr. ", "").replace("Dr ", "");
    const parts = cleanName.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return cleanName.slice(0, 2).toUpperCase();
  };

  return (
    <div className='bg-[#FCFBF8] rounded-xl border border-[#F0EBE1] overflow-hidden flex flex-col transition-shadow hover:shadow-md'>
      {/* Header Info */}
      <div className='p-6 flex flex-col items-center text-center pb-4'>
        <div className='w-16 h-16 rounded-full bg-[#d08726] text-white flex items-center justify-center font-bold text-xl mb-3 shadow-sm'>
          {getInitials(vet.name)}
        </div>
        <h3 className='font-bold text-gray-900 text-lg leading-tight'>
          {vet.name}
        </h3>
        <p className='text-xs text-gray-500 mt-1'>
          {vet.specialization.join(", ")}
        </p>
      </div>

      {/* Stats Row */}
      <div className='flex border-y border-[#F0EBE1] bg-[#FAF8F3]'>
        <div className='flex-1 flex flex-col items-center justify-center py-3 border-r border-[#F0EBE1]'>
          <span className='text-[#d08726] font-bold text-lg leading-tight'>
            {vet.patients}
          </span>
          <span className='text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-0.5'>
            Patients
          </span>
        </div>
        <div className='flex-1 flex flex-col items-center justify-center py-3 border-r border-[#F0EBE1]'>
          <span className='text-[#d08726] font-bold text-lg leading-tight'>
            {vet.experienceYears} Years
          </span>
          <span className='text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-0.5'>
            Experience
          </span>
        </div>
        <div className='flex-1 flex flex-col items-center justify-center py-3'>
          <span className='text-[#d08726] font-bold text-lg leading-tight'>
            {vet.rating}
          </span>
          <span className='text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-0.5'>
            Rating
          </span>
        </div>
      </div>

      <div className='p-5 flex flex-col gap-4 flex-1'>
        {/* About */}
        <div>
          <h4 className='text-xs font-semibold text-gray-900 mb-1'>About</h4>
          <p className='text-xs text-gray-500 leading-relaxed line-clamp-3'>
            {vet.about}
          </p>
        </div>

        {/* Specialization Tags */}
        <div>
          <h4 className='text-xs font-semibold text-gray-900 mb-1.5'>
            Specialization
          </h4>
          <div className='flex flex-wrap gap-1.5'>
            {vet.specialization.map((spec, idx) => (
              <span
                key={idx}
                className='px-2 py-0.5 rounded-full border border-green-300 text-[10px] text-green-700 bg-green-50/50'
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications Tags */}
        <div>
          <h4 className='text-xs font-semibold text-gray-900 mb-1.5'>
            Certifications
          </h4>
          <div className='flex flex-wrap gap-1.5'>
            {vet.certifications.map((cert, idx) => (
              <span
                key={idx}
                className='px-2 py-0.5 rounded-full border border-[#d08726]/40 text-[10px] text-[#d08726] bg-[#d08726]/5'
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Contact & Clinic */}
        <div className='border-t border-[#F0EBE1] pt-3 mt-auto space-y-2'>
          <div className='flex justify-between items-center text-xs'>
            <span className='text-gray-500'>Phone</span>
            <span className='font-medium text-gray-900'>{vet.phone}</span>
          </div>
          <div className='flex justify-between items-center text-xs'>
            <span className='text-gray-500'>Clinic</span>
            <span className='font-medium text-gray-900 text-right'>
              {vet.clinic}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='px-5 pb-5 flex items-center justify-between gap-2'>
        <button
          onClick={onDelete}
          className='flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-red-200 text-red-500 rounded-md hover:bg-red-50 transition-colors text-xs font-medium'
        >
          <Trash2 className='w-3.5 h-3.5' />
          Delete
        </button>

        <button
          onClick={onView}
          className='flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors text-xs font-medium'
        >
          <Eye className='w-3.5 h-3.5' />
          View
        </button>
      </div>
    </div>
  );
}
