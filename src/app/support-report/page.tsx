"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SupportRequestCard } from "./_components/SupportRequestCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { useGetSupportQuery } from "@/redux/features/support/supportAPI";
import { SupportTicket } from "./data";

const PAGE_SIZE = 6;

export default function SupportReportPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, isError } = useGetSupportQuery({
    page: currentPage,
    page_size: PAGE_SIZE,
  });

  const requests = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;
  const totalCount = data?.count ?? 0;

  // Local optimistic hide — swap this for a real delete mutation if you have one
  const [hiddenIds, setHiddenIds] = useState<number[]>([]);
  const visibleRequests = requests.filter(
    (r: SupportTicket) => !hiddenIds.includes(r.id),
  );

  const handleDelete = (id: number) => {
    setHiddenIds((prev) => [...prev, id]);
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
      title='Support Requests'
      subtitle='Some support requests have come to you. Please reply to them.'
    >
      <div className='flex flex-col gap-6 mt-4'>
        {isLoading ? (
          <div className='flex items-center justify-center py-20 text-sm text-gray-400'>
            Loading support requests...
          </div>
        ) : isError ? (
          <div className='flex items-center justify-center py-20 text-sm text-red-500'>
            Failed to load support requests. Please try again.
          </div>
        ) : visibleRequests.length > 0 ? (
          <div
            className={clsx(
              "grid grid-cols-1 md:grid-cols-2 gap-5 transition-opacity",
              isFetching && "opacity-60",
            )}
          >
            {visibleRequests.map((request: SupportTicket) => (
              <SupportRequestCard
                key={request.id}
                request={{
                  id: request.id,
                  name: request.user_name,
                  email: request.user_email,
                  description: request.description ?? "",
                  attachment: request.attachment ?? "",
                  isResolved: request.is_resolved,
                  createdAt: request.created_at,
                }}
                onDelete={() => handleDelete(request.id)}
              />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100'>
            <div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
              <span className='text-3xl'>📭</span>
            </div>
            <h3 className='font-semibold text-gray-900 text-lg mb-1'>
              No Support Requests
            </h3>
            <p className='text-sm text-gray-500'>
              All caught up! There are no pending support requests.
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
                        ? "bg-green-500 text-white shadow-sm"
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

// "use client";

// import React, { useState } from "react";
// import { DashboardLayout } from "@/components/layout/DashboardLayout";
// import { SupportRequestCard } from "./_components/SupportRequestCard";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import clsx from "clsx";
// import { useGetSupportQuery } from "@/redux/features/support/supportAPI";

// // in your supportAPI.ts or types file
// export interface SupportTicket {
//   id: number;
//   user: number;
//   user_name: string;
//   user_email: string;
//   description: string;
//   attachment: string | null;
//   is_resolved: boolean;
//   created_at: string;
//   updated_at: string;
// }

// export interface SupportListResponse {
//   count: number;
//   total_pages: number;
//   next: string | null;
//   previous: string | null;
//   results: SupportTicket[];
// }

// const PAGE_SIZE = 6;

// export default function SupportReportPage() {
//   const [currentPage, setCurrentPage] = useState(1);

//   const { data, isLoading, isFetching, isError } = useGetSupportQuery({
//     page: currentPage,
//     page_size: PAGE_SIZE,
//   });

//   const requests = data?.results ?? [];
//   const totalPages = data?.total_pages ?? 1;
//   const totalCount = data?.count ?? 0;

//   // Local optimistic delete — swap this for a real delete mutation if you have one
//   const [hiddenIds, setHiddenIds] = useState<number[]>([]);
//   const visibleRequests = requests.filter(
//     (r: any) => !hiddenIds.includes(r.id),
//   );

//   const handleDelete = (id: number | string) => {
//     // setHiddenIds((prev) => [...prev, id]);
//   };

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages || page === currentPage) return;
//     setCurrentPage(page);
//   };

//   const getPageNumbers = () => {
//     const pages: (number | "...")[] = [];
//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       pages.push(1, 2, 3);
//       if (currentPage > 4) pages.push("...");
//       const start = Math.max(4, currentPage - 1);
//       const end = Math.min(totalPages - 1, currentPage + 1);
//       for (let i = start; i <= end; i++) {
//         if (!pages.includes(i)) pages.push(i);
//       }
//       if (currentPage < totalPages - 3) pages.push("...");
//       if (!pages.includes(totalPages - 1)) pages.push(totalPages - 1);
//       if (!pages.includes(totalPages)) pages.push(totalPages);
//     }
//     return pages;
//   };

//   return (
//     <DashboardLayout
//       title='Support Requests'
//       subtitle='Some support requests have come to you. Please reply to them.'
//     >
//       <div className='flex flex-col gap-6 mt-4'>
//         {isLoading ? (
//           <div className='flex items-center justify-center py-20 text-sm text-gray-400'>
//             Loading support requests...
//           </div>
//         ) : isError ? (
//           <div className='flex items-center justify-center py-20 text-sm text-red-500'>
//             Failed to load support requests. Please try again.
//           </div>
//         ) : visibleRequests.length > 0 ? (
//           <div
//             className={clsx(
//               "grid grid-cols-1 md:grid-cols-2 gap-5 transition-opacity",
//               isFetching && "opacity-60",
//             )}
//           >
//             {visibleRequests.map((request: SupportTicket) => (
//               <SupportRequestCard
//                 key={request.id}
//                 request={{
//                   id: String(request.id),
//                   name: request.user_name,
//                   email: request.user_email,
//                   description: request.description ?? "",
//                   attachment: request.attachment!,
//                   isResolved: request.is_resolved,
//                   createdAt: request.created_at,
//                 }}
//                 onDelete={() => handleDelete(request.id)}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className='flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100'>
//             <div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
//               <span className='text-3xl'>📭</span>
//             </div>
//             <h3 className='font-semibold text-gray-900 text-lg mb-1'>
//               No Support Requests
//             </h3>
//             <p className='text-sm text-gray-500'>
//               All caught up! There are no pending support requests.
//             </p>
//           </div>
//         )}

//         {totalPages > 1 && (
//           <div className='flex items-center justify-center gap-2 py-4'>
//             <button
//               onClick={() => goToPage(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={clsx(
//                 "flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors",
//                 currentPage === 1
//                   ? "border-gray-200 text-gray-300 cursor-not-allowed"
//                   : "border-gray-200 text-gray-600 hover:bg-gray-50",
//               )}
//             >
//               <ChevronLeft className='w-4 h-4' />
//               Previous
//             </button>

//             <div className='flex items-center gap-1'>
//               {getPageNumbers().map((page, idx) =>
//                 page === "..." ? (
//                   <span
//                     key={`ellipsis-${idx}`}
//                     className='px-2 py-1 text-gray-400 text-sm'
//                   >
//                     …
//                   </span>
//                 ) : (
//                   <button
//                     key={page}
//                     onClick={() => goToPage(page)}
//                     className={clsx(
//                       "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
//                       currentPage === page
//                         ? "bg-green-500 text-white shadow-sm"
//                         : "text-gray-600 hover:bg-gray-100",
//                     )}
//                   >
//                     {page}
//                   </button>
//                 ),
//               )}
//             </div>

//             <button
//               onClick={() => goToPage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={clsx(
//                 "flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors",
//                 currentPage === totalPages
//                   ? "border-gray-200 text-gray-300 cursor-not-allowed"
//                   : "border-gray-200 text-gray-600 hover:bg-gray-50",
//               )}
//             >
//               Next
//               <ChevronRight className='w-4 h-4' />
//             </button>
//           </div>
//         )}

//         {totalCount > 0 && (
//           <p className='text-center text-xs text-gray-400 -mt-2'>
//             Showing page {currentPage} of {totalPages} ({totalCount} total)
//           </p>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }
