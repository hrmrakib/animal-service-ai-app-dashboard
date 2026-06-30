import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface RejectReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

export function RejectReasonModal({ isOpen, onClose, onSubmit }: RejectReasonModalProps) {
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reason);
    setReason("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-md"
      hideCloseButton
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-sm font-semibold text-gray-700">Reason</label>
        <textarea
          className="w-full h-32 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand resize-none placeholder:text-gray-400"
          placeholder="Write Reject or resubmit reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        ></textarea>
        
        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" className="px-8">
            Send
          </Button>
        </div>
      </form>
    </Modal>
  );
}
