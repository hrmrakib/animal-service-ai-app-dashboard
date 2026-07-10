"use client";

import React, { useState } from "react";
import { Bell, Trash2, Clock, Loader2 } from "lucide-react";
import clsx from "clsx";
import { NotificationItem } from "../data";

interface NotificationCardProps {
  notification: NotificationItem;
  onDelete: (id: number) => Promise<void> | void;
}

export function NotificationCard({
  notification,
  onDelete,
}: NotificationCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const formattedDate = (() => {
    const d = new Date(notification.created_at);
    if (isNaN(d.getTime())) return notification.created_at;
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  })();

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await onDelete(notification.id);
    } catch {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={clsx(
        "bg-white rounded-xl border p-4 flex items-start gap-3 transition-all",
        notification.is_read
          ? "border-gray-100"
          : "border-[#d08726]/40 bg-[#d08726]/[0.03]",
        isDeleting && "opacity-50 pointer-events-none",
      )}
    >
      {/* Icon */}
      <div
        className={clsx(
          "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
          notification.is_read
            ? "bg-gray-100 text-gray-400"
            : "bg-[#d08726]/10 text-[#d08726]",
        )}
      >
        <Bell className='w-4 h-4' />
      </div>

      {/* Content */}
      <div className='flex-1 min-w-0'>
        <div className='flex items-start justify-between gap-2'>
          <h3 className='font-semibold text-gray-900 text-sm truncate'>
            {notification.title}
          </h3>
          {!notification.is_read && (
            <span className='w-2 h-2 rounded-full bg-[#d08726] shrink-0 mt-1.5' />
          )}
        </div>
        <p className='text-xs text-gray-600 mt-1 leading-relaxed'>
          {notification.message}
        </p>
        <div className='flex items-center gap-1.5 text-xs text-gray-400 mt-2'>
          <Clock className='w-3.5 h-3.5' />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Delete */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className='p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors shrink-0'
        title='Delete notification'
      >
        {isDeleting ? (
          <Loader2 className='w-4 h-4 animate-spin' />
        ) : (
          <Trash2 className='w-4 h-4' />
        )}
      </button>
    </div>
  );
}
