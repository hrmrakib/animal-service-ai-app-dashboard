import React from "react";
import {
  Trash2,
  ExternalLink,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export interface SupportCardData {
  id: number;
  name: string;
  email: string;
  description: string;
  attachment: string;
  isResolved: boolean;
  createdAt: string;
}

interface SupportRequestCardProps {
  request: SupportCardData;
  onDelete: () => void;
}

export function SupportRequestCard({
  request,
  onDelete,
}: SupportRequestCardProps) {
  const getInitials = (name: string) => {
    const clean = name.replace(/^(Mr|Ms|Mrs|Dr)\.\s*/i, "").trim();
    const parts = clean.split(" ").filter(Boolean);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return clean.slice(0, 2).toUpperCase() || "??";
  };

  const formattedDate = (() => {
    const d = new Date(request.createdAt);
    if (isNaN(d.getTime())) return request.createdAt;
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  })();

  const mailtoHref = `mailto:${request.email}?subject=${encodeURIComponent(
    `Re: Support request from ${request.name}`,
  )}`;

  return (
    <div className='bg-white rounded-xl border border-[#F0EBE1] p-5 flex flex-col gap-4 transition-shadow hover:shadow-md'>
      {/* Card Header: Avatar, Name Badge, Email, Reply, Delete */}
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-2 min-w-0'>
          <div className='w-9 h-9 rounded-full bg-[#d08726] text-white flex items-center justify-center font-bold text-xs shrink-0'>
            {getInitials(request.name)}
          </div>
          <span className='px-2 py-0.5 bg-[#d08726] text-white text-[10px] font-semibold rounded-md shrink-0'>
            {request.name}
          </span>
          <a
            href={mailtoHref}
            className='text-xs text-gray-500 hover:text-brand transition-colors truncate'
            title={`Email ${request.email}`}
          >
            {request.email}
          </a>
          <a
            href={mailtoHref}
            className='p-1 hover:bg-gray-100 rounded transition-colors shrink-0'
            title='Reply via email'
          >
            <ExternalLink className='w-3.5 h-3.5 text-gray-500' />
          </a>
        </div>

        <button
          onClick={onDelete}
          className='p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors shrink-0'
          title='Delete request'
        >
          <Trash2 className='w-4 h-4' />
        </button>
      </div>

      {/* Status + Body */}
      <div>
        <div className='flex items-center gap-1.5 mb-1.5'>
          {request.isResolved ? (
            <CheckCircle2 className='w-3.5 h-3.5 text-green-500' />
          ) : (
            <AlertCircle className='w-3.5 h-3.5 text-amber-500' />
          )}
          <span
            className={
              request.isResolved
                ? "text-xs font-medium text-green-600"
                : "text-xs font-medium text-amber-600"
            }
          >
            {request.isResolved ? "Resolved" : "Pending"}
          </span>
        </div>
        <p className='text-xs text-gray-600 leading-relaxed line-clamp-3'>
          {request.description}
        </p>
      </div>

      {/* Attachment */}
      {request.attachment && (
        <div className='flex items-center gap-3'>
          <a
            href={request.attachment}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 text-[#d08726] hover:text-[#b8741f] transition-colors'
          >
            <div className='w-8 h-8 rounded-md bg-[#d08726]/10 flex items-center justify-center'>
              <Download className='w-4 h-4' />
            </div>
            <span className='text-xs font-medium text-gray-600 truncate max-w-[180px]'>
              {request.attachment.split("/").pop() || "Attachment"}
            </span>
          </a>
        </div>
      )}

      {/* Timestamp */}
      <div className='flex items-center gap-1.5 text-xs text-gray-400 mt-auto pt-2 border-t border-gray-50'>
        <Clock className='w-3.5 h-3.5' />
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}
