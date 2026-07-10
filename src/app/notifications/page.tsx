"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { NotificationCard } from "./_components/NotificationCard";
import { ChevronLeft, ChevronRight, BellOff } from "lucide-react";
import clsx from "clsx";
import {
  useGetUserNotificationsQuery,
  useDeleteUserNotificationMutation,
} from "@/redux/features/notification/notificationAPI";
import { NotificationItem } from "./data";
import toast from "react-hot-toast";

const PAGE_SIZE = 10;

export default function NotificationsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, isError } = useGetUserNotificationsQuery(
    {
      page: currentPage,
      page_size: PAGE_SIZE,
    },
  );

  const [deleteNotification] = useDeleteUserNotificationMutation();

  const notifications = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;
  const totalCount = data?.count ?? 0;

  const handleDelete = async (id: number) => {
    try {
      await deleteNotification(id).unwrap();
      toast?.success?.("Notification deleted");
    } catch (err) {
      toast?.error?.("Failed to delete notification");
      throw err;
    }
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      if (currentPage > 4) pages.push("...");
      const start = Math.max(4, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 3) pages.push("...");
      if (!pages.includes(totalPages - 1)) pages.push(totalPages - 1);
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <DashboardLayout
      title='Notifications'
      subtitle='Stay up to date with the latest activity.'
    >
      <div className='flex flex-col gap-4 mt-4'>
        {isLoading ? (
          <div className='flex items-center justify-center py-20 text-sm text-gray-400'>
            Loading notifications...
          </div>
        ) : isError ? (
          <div className='flex items-center justify-center py-20 text-sm text-red-500'>
            Failed to load notifications. Please try again.
          </div>
        ) : notifications.length > 0 ? (
          <div
            className={clsx(
              "flex flex-col gap-3 transition-opacity",
              isFetching && "opacity-60",
            )}
          >
            {notifications.map((notification: NotificationItem) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100'>
            <div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
              <BellOff className='w-7 h-7 text-gray-400' />
            </div>
            <h3 className='font-semibold text-gray-900 text-lg mb-1'>
              No Notifications
            </h3>
            <p className='text-sm text-gray-500'>
              You&apos;re all caught up! Nothing new to see here.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className='flex items-center justify-center gap-2 py-4'>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={clsx(
                "flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors",
                currentPage === 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50",
              )}
            >
              <ChevronLeft className='w-4 h-4' />
              Previous
            </button>

            <div className='flex items-center gap-1'>
              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className='px-2 py-1 text-gray-400 text-sm'
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={clsx(
                      "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                      currentPage === page
                        ? "bg-[#d08726] text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100",
                    )}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={clsx(
                "flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors",
                currentPage === totalPages
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50",
              )}
            >
              Next
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>
        )}

        {totalCount > 0 && (
          <p className='text-center text-xs text-gray-400 -mt-2'>
            Showing page {currentPage} of {totalPages} ({totalCount} total)
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}
