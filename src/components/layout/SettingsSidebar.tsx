"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

const settingsNavItems = [
  { name: "Profile Info", href: "/settings/profile-info" },
  { name: "Change Password", href: "/settings/change-password" },
  { name: "Edit Terms & Policies", href: "/settings/terms-and-policies" },
  { name: "About Us", href: "/settings/about-us" },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full md:w-80 flex-col space-y-3 bg-white p-6 rounded-xl border border-border-subtle h-fit md:min-h-[500px]">
      {settingsNavItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              "group flex items-center justify-between rounded-full px-5 py-3.5 text-sm font-medium transition-colors border",
              isActive
                ? "bg-[#f4ebe1] text-gray-900 border-[#eae0d5]" // Matching the exact beige highlight color from screenshot
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            )}
          >
            <span>{item.name}</span>
            <ArrowRight 
              className={clsx(
                "h-4 w-4 shrink-0",
                isActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"
              )} 
            />
          </Link>
        );
      })}
    </nav>
  );
}
