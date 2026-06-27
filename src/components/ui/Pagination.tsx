import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Simplified pagination logic for demonstration
  const pages = [1, 2, 3, "...", 8, 9, 10];

  return (
    <div className="flex items-center justify-center gap-2 mt-6 pb-4">
      <button 
        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page, index) => (
          typeof page === "number" ? (
            <button
              key={index}
              className={clsx(
                "w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md",
                currentPage === page
                  ? "bg-brand text-white"
                  : "text-gray-500 hover:bg-gray-100"
              )}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="w-8 flex items-center justify-center text-gray-400">
              {page}
            </span>
          )
        ))}
      </div>

      <button 
        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
