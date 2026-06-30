import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertCircle } from "lucide-react";
import type { Driver } from "../data";

interface DeleteDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  driver: Driver | null;
}

export function DeleteDriverModal({ isOpen, onClose, onConfirm, driver }: DeleteDriverModalProps) {
  if (!driver) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-md"
      hideCloseButton
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Delete Driver Account</h2>
            <p className="text-sm text-gray-500 mt-1">This action cannot be undone</p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-lg p-4">
          <p className="text-gray-800 font-medium mb-3">
            Are you sure you want to delete <span className="font-bold">{driver.name}</span>'s account?
          </p>
          <p className="text-sm text-gray-600 mb-2">This will permanently remove:</p>
          <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
            <li>Driver profile and personal information</li>
            <li>Trip history and earnings records</li>
            <li>Vehicle and license information</li>
            <li>Customer ratings and reviews</li>
          </ul>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} className="flex-1">
            Delete Account
          </Button>
        </div>
      </div>
    </Modal>
  );
}
