import { ReactNode } from "react";
import clsx from "clsx";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor?: string;
  className?: string;
}

export function StatCard({ title, value, icon, iconBgColor = "bg-orange-100", className }: StatCardProps) {
  return (
    <div className={clsx("flex flex-col p-6 bg-white rounded-xl shadow-sm gap-4", className)}>
      <div className={clsx("flex h-12 w-12 items-center justify-center rounded-lg", iconBgColor)}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
