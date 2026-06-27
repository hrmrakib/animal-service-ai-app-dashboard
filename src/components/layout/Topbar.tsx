import { Bell, Search, Menu } from "lucide-react";
import Image from "next/image";

interface TopbarProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export function Topbar({ title, subtitle, onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between bg-bg-subtle px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 lg:hidden"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-gray-700 bg-gray-100 p-2 rounded-full">
          <span className="sr-only">View notifications</span>
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            3
          </span>
        </button>
        
        <div className="flex items-center gap-3">
          <span className="hidden text-sm font-medium text-gray-700 sm:block">Aiden Max</span>
          <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
             {/* Fallback to generic avatar */}
            <div className="h-full w-full bg-pink-200 flex items-center justify-center text-pink-700 font-bold">
               AM
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
