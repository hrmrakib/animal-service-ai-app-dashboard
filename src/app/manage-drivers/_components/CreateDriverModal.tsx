import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Upload } from "lucide-react";

interface CreateDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CreateDriverModal({ isOpen, onClose, onSubmit }: CreateDriverModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-3xl"
    >
      <div className="flex flex-col h-full">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create New Driver</h2>
            <p className="text-sm text-gray-500 mt-1">Add a new driver to your fleet</p>
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
              <Input label="Full Name" placeholder="Enter full name" />
              <Input label="Email Address" type="email" placeholder="driver@example.com" />
              <Input label="Phone Number" placeholder="+1 234 567 8900" />
              <Input label="Date of Birth" placeholder="MM/DD/YYYY" />
            </div>
          </section>

          {/* License Information */}
          <section className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">License Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="License Number" placeholder="DL123456789" />
              <Input label="License Expiry" placeholder="MM/DD/YYYY" />
              <Input label="License Type" placeholder="e.g. Commercial, Class A" />
              <Input label="Years of Experience" placeholder="5" type="number" />
            </div>
          </section>

          {/* Vehicle Information */}
          <section className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Vehicle Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Vehicle Type" placeholder="e.g. Pickup Truck" />
              <Input label="Vehicle Plate Number" placeholder="ABC-1234" />
              <Input label="Vehicle Make & Model" placeholder="Ford F-150" />
              <Input label="Vehicle Year" placeholder="2024" type="number" />
            </div>
          </section>

          {/* Address */}
          <section className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Address</h3>
            <Input label="Street Address" placeholder="123 Main Street" />
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1"><Input label="City" placeholder="New York" /></div>
              <div className="col-span-1"><Input label="State" placeholder="NY" /></div>
              <div className="col-span-1"><Input label="ZIP Code" placeholder="10001" /></div>
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-4 border-t mt-4 sticky bottom-0 bg-white pb-2">
            <Button type="button" variant="outline" onClick={onClose} className="px-8">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="px-8">
              Create Driver Account
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
