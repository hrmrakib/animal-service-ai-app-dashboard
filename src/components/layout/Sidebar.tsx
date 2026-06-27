"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Truck, 
  Stethoscope, 
  BellRing, 
  HelpCircle, 
  Settings, 
  LogOut,
  ShieldHalf
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Revenue & Profit", href: "/revenue-profit", icon: TrendingUp },
  { name: "Manage Users", href: "/manage-users", icon: Users },
  { name: "Manage Transport", href: "#", icon: Truck },
  { name: "Manage Veterinary", href: "#", icon: Stethoscope },
  { name: "Create Notification", href: "#", icon: BellRing },
  { name: "Support/Report", href: "#", icon: HelpCircle },
  { name: "Settings", href: "#", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col h-full bg-white border-r border-border-subtle transition-transform duration-300 md:translate-x-0 -translate-x-full lg:static lg:flex">
      {/* Logo Area */}
      <div className="flex h-20 shrink-0 items-center justify-center px-6">
        <div className="flex flex-col items-center justify-center">
           {/* Placeholder for shield logo */}
          <ShieldHalf className="h-10 w-10 text-blue-900 fill-blue-900" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand text-white"
                  : "text-gray-600 hover:bg-brand-light hover:text-brand"
              )}
            >
              <item.icon
                className={clsx(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-white" : "text-gray-400 group-hover:text-brand"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border-subtle">
        <button
          className="group flex w-full items-center rounded-md px-3 py-2.5 text-sm font-medium text-brand hover:bg-brand-light transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-brand" aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
}
