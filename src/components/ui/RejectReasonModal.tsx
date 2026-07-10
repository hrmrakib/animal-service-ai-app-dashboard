import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface RejectReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  title?: string;
  isSubmitting?: boolean;
}

export function RejectReasonModal({
  isOpen,
  onClose,
  onSubmit,
  title = "Reason",
  isSubmitting = false,
}: RejectReasonModalProps) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!isOpen) setReason("");
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onSubmit(reason.trim());
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='max-w-md'
      hideCloseButton
    >
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label className='text-sm font-semibold text-gray-700'>{title}</label>
        <textarea
          className='w-full h-32 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand resize-none placeholder:text-gray-400'
          placeholder='Write reject or resubmit reason'
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <div className='flex justify-end pt-2'>
          <Button
            type='submit'
            variant='primary'
            className='px-8'
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
