import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Upload } from "lucide-react";
import clsx from "clsx";

interface CreateVetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CreateVetModal({ isOpen, onClose, onSubmit }: CreateVetModalProps) {
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>(["Small Animals"]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>(["BVM & AH"]);

  const allSpecs = ["Small Animals", "Large Animals", "Exotic Animals", "Surgery", "Livestock", "Emergency Care", "Dental", "Radiology"];
  const allCerts = ["BVM & AH", "MVSc", "PHD", "DVM", "Veterinary Surgery Board"];

  const toggleSpec = (spec: string) => {
    setSelectedSpecs(prev => prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]);
  };

  const toggleCert = (cert: string) => {
    setSelectedCerts(prev => prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-3xl"
    >
      <div className="flex flex-col h-full">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create New Veterinarian</h2>
            <p className="text-sm text-gray-500 mt-1">Add a new veterinarian to your team</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          
          {/* Personal Information */}
          <section className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
                <User className="w-6 h-6 text-gray-400" />
              </div>
              <Button type="button" variant="outline" className="text-gray-700 font-medium">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name (with Dr. prefix)" placeholder="Dr. John Smith" />
              <Input label="Email Address" type="email" placeholder="vet@example.com" />
              <Input label="Phone Number" placeholder="+1 234 567 8900" />
              <Input label="Date of Birth" placeholder="MM/DD/YYYY" />
            </div>
            <Button type="button" variant="outline" size="sm" className="mt-2 text-gray-600 bg-gray-50">Add More</Button>
          </section>

          {/* Professional Information */}
          <section className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Veterinary License Number" placeholder="VET123456789" />
              <Input label="Years of Experience" placeholder="e.g., 3.5 Years" />
              <Input label="Clinic/Hospital Name" placeholder="Pet Care Center" />
            </div>
            <Button type="button" variant="outline" size="sm" className="mt-2 text-gray-600 bg-gray-50">Add More</Button>
          </section>

          {/* Specializations */}
          <section className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {allSpecs.map(spec => {
                const isSelected = selectedSpecs.includes(spec);
                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => toggleSpec(spec)}
                    className={clsx(
                      "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
                      isSelected 
                        ? "border-[#d08726] bg-[#FAF8F3] text-gray-900" 
                        : "border-[#F0EBE1] bg-[#FAF9F6] text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {spec}
                  </button>
                )
              })}
            </div>
            <Button type="button" variant="outline" size="sm" className="mt-2 text-gray-600 bg-gray-50">Add More</Button>
          </section>

          {/* Certifications */}
          <section className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {allCerts.map(cert => {
                const isSelected = selectedCerts.includes(cert);
                return (
                  <button
                    key={cert}
                    type="button"
                    onClick={() => toggleCert(cert)}
                    className={clsx(
                      "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
                      isSelected 
                        ? "border-[#d08726] bg-[#FAF8F3] text-[#d08726]" 
                        : "border-[#F0EBE1] bg-[#FAF9F6] text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {cert}
                  </button>
                )
              })}
            </div>
            <Button type="button" variant="outline" size="sm" className="mt-2 text-gray-600 bg-gray-50">Add More</Button>
          </section>

          {/* About */}
          <section className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">About</h3>
            <textarea
              className="w-full h-32 p-3 rounded-lg border border-gray-200 bg-[#FAF9F6] focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand resize-none placeholder:text-gray-400 text-sm"
              placeholder="Brief description about the veterinarian's expertise and experience..."
            ></textarea>
          </section>

          {/* Documents */}
          <section className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-700">Veterinary License</span>
                <button type="button" className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                  <Upload className="w-5 h-5 mb-2" />
                  <span className="text-xs">Upload license document</span>
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-700">National ID Card</span>
                <button type="button" className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                  <Upload className="w-5 h-5 mb-2" />
                  <span className="text-xs">Upload ID document</span>
                </button>
              </div>
            </div>
          </section>

          <div className="flex justify-between gap-3 pt-4 border-t mt-4 sticky bottom-0 bg-white pb-2">
            <Button type="button" variant="outline" onClick={onClose} className="w-1/2">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="w-1/2">
              Create Veterinarian Account
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
