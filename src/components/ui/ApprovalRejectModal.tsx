"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertCircle, X } from "lucide-react";

interface ApprovalRejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  title?: string;
  itemName?: string;
  presetReasons?: string[];
  isSubmitting?: boolean;
}

export function ApprovalRejectModal({
  isOpen,
  onClose,
  onSubmit,
  title = "Reject Reason",
  itemName,
  presetReasons = [],
  isSubmitting = false,
}: ApprovalRejectModalProps) {
  const [reason, setReason] = useState("");

  const handleClose = () => {
    setReason("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onSubmit(reason.trim());
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className='max-w-lg p-0 overflow-hidden'
      hideCloseButton
    >
      <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-red-50/60'>
        <div className='flex items-center gap-2.5'>
          <div className='w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0'>
            <AlertCircle className='w-4 h-4' />
          </div>
          <div>
            <h3 className='font-semibold text-gray-900 text-base'>{title}</h3>
            {itemName && (
              <p className='text-xs text-gray-500'>Item: {itemName}</p>
            )}
          </div>
        </div>
        <button
          onClick={handleClose}
          type='button'
          className='p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors'
        >
          <X className='w-4 h-4' />
        </button>
      </div>

      <form onSubmit={handleSubmit} className='p-6 flex flex-col gap-4'>
        <div>
          <label className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5'>
            Reason for Rejection <span className='text-red-500'>*</span>
          </label>
          <textarea
            className='w-full h-28 p-3 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 resize-none placeholder:text-gray-400'
            placeholder='State why this submission is being rejected...'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            autoFocus
          />
        </div>

        {presetReasons.length > 0 && (
          <div>
            <p className='text-xs text-gray-500 mb-2 font-medium'>
              Quick preset suggestions (click to use):
            </p>
            <div className='flex flex-wrap gap-1.5'>
              {presetReasons.map((preset, idx) => (
                <button
                  key={idx}
                  type='button'
                  onClick={() => setReason(preset)}
                  className='text-xs bg-gray-100 hover:bg-red-50 hover:text-red-700 text-gray-700 px-2.5 py-1 rounded-md transition-colors text-left border border-gray-200/60'
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className='flex items-center justify-end gap-3 pt-3 border-t border-gray-100 mt-2'>
          <Button
            type='button'
            variant='outline'
            onClick={handleClose}
            disabled={isSubmitting}
            size='sm'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='danger'
            size='sm'
            className='px-5'
            disabled={isSubmitting || !reason.trim()}
          >
            {isSubmitting ? "Rejecting..." : "Confirm Rejection"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
