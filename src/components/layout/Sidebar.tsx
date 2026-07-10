"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  PersonStanding,
} from "lucide-react";
import clsx from "clsx";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Revenue & Profit", href: "/revenue-profit", icon: TrendingUp },
  { name: "Manage Users", href: "/manage-users", icon: Users },
  { name: "Manage Drivers", href: "/manage-drivers", icon: Truck },
  { name: "Manage Veterinary", href: "/manage-veterinary", icon: Stethoscope },
  { name: "Manage Seller", href: "/seller", icon: PersonStanding },
  { name: "Create Notification", href: "/create-notification", icon: BellRing },
  { name: "Support/Report", href: "/support-report", icon: HelpCircle },
  { name: "Settings", href: "/settings/profile-info", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    if (!showLogoutConfirm) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setShowLogoutConfirm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLogoutConfirm]);

  const handleLogout = () => {
    setLoggingOut(true);

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    dispatch(logout());

    setLoggingOut(false);
    setShowLogoutConfirm(false);
    router.push("/login");
  };

  return (
    <aside className='fixed inset-y-0 left-0 z-50 flex w-64 flex-col h-full bg-white border-r border-border-subtle transition-transform duration-300 md:translate-x-0 -translate-x-full lg:static lg:flex'>
      {/* Logo Area */}
      <div className='flex h-35 shrink-0 items-center justify-center px-6'>
        <Image
          src={"/images/logo.png"}
          width={80}
          height={80}
          alt='Animal service'
        />
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-2.5 px-4 py-4 overflow-y-auto'>
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand text-white"
                  : "text-gray-600 hover:bg-brand-light hover:text-brand",
              )}
            >
              <item.icon
                className={clsx(
                  "mr-3 h-5 w-5 shrink-0",
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-brand",
                )}
                aria-hidden='true'
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className='relative p-4 border-t border-border-subtle'>
        {/* Confirmation popover */}
        {showLogoutConfirm && (
          <div
            ref={popoverRef}
            className='absolute bottom-full left-4 right-4 mb-2 bg-white border border-gray-100 rounded-xl shadow-lg p-4 animate-in fade-in slide-in-from-bottom-2 duration-150'
          >
            <p className='text-sm font-medium text-gray-800'>
              Log out of your account?
            </p>
            <p className='mt-1 text-xs text-gray-500'>
              You&apos;ll need to log in again next time.
            </p>
            <div className='mt-3 flex gap-2'>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                disabled={loggingOut}
                className='flex-1 rounded-md border border-gray-200 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60'
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className='flex-1 rounded-md bg-red-500 py-1.5 text-xs font-medium text-white hover:bg-red-600 transition-colors disabled:opacity-60'
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
            {/* Little arrow pointing to the button */}
            <div className='absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 bg-white border-b border-r border-gray-100' />
          </div>
        )}

        <button
          onClick={() => setShowLogoutConfirm((prev) => !prev)}
          className='group flex w-full items-center rounded-md px-3 py-2.5 text-sm font-medium text-brand hover:bg-brand-light transition-colors'
        >
          <LogOut className='mr-3 h-5 w-5 text-brand' aria-hidden='true' />
          Logout
        </button>
      </div>
    </aside>
  );
}
