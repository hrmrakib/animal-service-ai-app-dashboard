"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SupportRequestCard } from "./_components/SupportRequestCard";
import { mockSupportRequests, SupportRequest } from "./data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

const ITEMS_PER_PAGE = 6;

export default function SupportReportPage() {
  const [requests, setRequests] = useState<SupportRequest[]>(mockSupportRequests);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(requests.length / ITEMS_PER_PAGE);

  // Get the items for the current page
  const paginatedRequests = requests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    // If the current page is now empty and isn't page 1, go back a page
    const newTotal = Math.ceil((requests.length - 1) / ITEMS_PER_PAGE);
    if (currentPage > newTotal && newTotal > 0) {
      setCurrentPage(newTotal);
    }
  };

  // Generate page numbers for pagination display
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first 3
      pages.push(1, 2, 3);
      if (currentPage > 4) pages.push("...");
      // Middle range around current page
      const start = Math.max(4, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 3) pages.push("...");
      // Always show last 2
      if (!pages.includes(totalPages - 1)) pages.push(totalPages - 1);
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <DashboardLayout
      title="Support Requests"
      subtitle="Some support requests have come to you. Please reply to them."
    >
      <div className="flex flex-col gap-6 mt-4">

        {/* Grid of Support Cards */}
        {paginatedRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {paginatedRequests.map((request) => (
              <SupportRequestCard
                key={request.id}
                request={request}
                onDelete={() => handleDelete(request.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <span className="text-3xl">📭</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg mb-1">No Support Requests</h3>
            <p className="text-sm text-gray-500">All caught up! There are no pending support requests.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 py-4">
            {/* Previous button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={clsx(
                "flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors",
                currentPage === 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-2 py-1 text-gray-400 text-sm">
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={clsx(
                      "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                      currentPage === page
                        ? "bg-green-500 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            {/* Next button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={clsx(
                "flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors",
                currentPage === totalPages
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              )}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
