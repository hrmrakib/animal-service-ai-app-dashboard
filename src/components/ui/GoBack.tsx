"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackProps {
  label?: string;
  className?: string;
  onClick?: () => void;
}

export default function GoBack({
  label = "",
  className = "",
  onClick,
}: BackProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className={`inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors ${className}`}
    >
      <MoveLeft className='h-6 w-6' />
      {label}
    </button>
  );
}
