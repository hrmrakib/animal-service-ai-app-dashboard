import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FileText, Plus } from "lucide-react";
import type { Vet } from "../data";

interface VetProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  vet: Vet | null;
  onReject: () => void;
  onResubmit: () => void;
  onAccept: () => void;
}

export function VetProfileModal({ 
  isOpen, 
  onClose, 
  vet,
  onReject,
  onResubmit,
  onAccept
}: VetProfileModalProps) {
  if (!vet) return null;

  const getInitials = (name: string) => {
    const cleanName = name.replace("Dr. ", "").replace("Dr ", "");
    const parts = cleanName.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return cleanName.slice(0, 2).toUpperCase();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-2xl p-0"
    >
      <div className="flex flex-col h-full max-h-[85vh]">
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-28 h-28 rounded-full border-4 border-[#F0EBE1] flex items-center justify-center bg-[#d08726] text-white text-3xl font-bold shrink-0">
              {getInitials(vet.name)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{vet.name}</h2>
              <p className="text-gray-600 text-lg">{vet.specialization.join(", ")}</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex border border-[#F0EBE1] bg-[#FAF8F3] rounded-lg mb-8 divide-x divide-[#F0EBE1]">
            <div className="flex-1 flex flex-col items-center justify-center py-4">
              <span className="text-[#d08726] font-bold text-xl flex items-center gap-1">
                {vet.patients} <Plus className="w-4 h-4" strokeWidth={3} />
              </span>
              <span className="text-sm text-gray-600 font-semibold mt-1">Patients</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center py-4">
              <span className="text-[#d08726] font-bold text-xl">{vet.experienceYears} Years</span>
              <span className="text-sm text-gray-600 font-semibold mt-1">Experience</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center py-4">
              <span className="text-[#d08726] font-bold text-xl">{vet.rating}</span>
              <span className="text-sm text-gray-600 font-semibold mt-1">Ratings</span>
            </div>
          </div>

          {/* About Doctor */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 text-lg mb-3">About Doctor</h3>
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              {vet.about}
            </p>
          </div>

          {/* Basic Info */}
          <div className="border border-gray-100 rounded-lg p-5 mb-6 shadow-sm">
            <h4 className="text-sm font-semibold text-gray-500 mb-4">Basic Info</h4>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-3">
                <span className="text-gray-600 font-medium">Phone</span>
                <span className="text-gray-900">{vet.phone}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Clinic</span>
                <span className="text-gray-900">{vet.clinic}</span>
              </div>
            </div>
          </div>

          {/* Specialization */}
          <div className="border border-gray-100 rounded-lg p-5 mb-6 shadow-sm">
            <h4 className="text-sm font-semibold text-gray-500 mb-4">Specialization</h4>
            <div className="flex flex-wrap gap-2">
              {vet.specialization.map((spec, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full border border-green-400 text-xs font-medium text-green-700 bg-green-50/50">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="border border-gray-100 rounded-lg p-5 mb-6 shadow-sm">
            <h4 className="text-sm font-semibold text-gray-500 mb-4">Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {vet.certifications.map((cert, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full border border-[#d08726]/60 text-xs font-medium text-[#d08726] bg-[#d08726]/5">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="border border-gray-100 rounded-lg p-5 mb-2 shadow-sm">
            <h4 className="text-sm font-semibold text-gray-500 mb-4">Documents</h4>
            <div className="flex flex-col gap-4">
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#FAF8F3] border border-[#F0EBE1] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#d08726]" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">Veterinary License</h5>
                  <p className="text-gray-500 text-xs mt-0.5">BVM & AH Certificate</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#FAF8F3] border border-[#F0EBE1] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#d08726]" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">National ID Card</h5>
                  <p className="text-gray-500 text-xs mt-0.5">NID / Passport</p>
                </div>
              </div>

            </div>
          </div>

        </div>
        
        {/* Footer Actions */}
        <div className="bg-white p-6 border-t flex gap-4 shrink-0 justify-center">
          <Button variant="danger" className="flex-1 py-6 font-bold text-base" onClick={onReject}>Reject</Button>
          <Button variant="brand" className="flex-1 py-6 font-bold text-base" onClick={onResubmit}>Re submit</Button>
          <Button variant="primary" className="flex-1 py-6 font-bold text-base" onClick={onAccept}>Accept</Button>
        </div>
      </div>
    </Modal>
  );
}
