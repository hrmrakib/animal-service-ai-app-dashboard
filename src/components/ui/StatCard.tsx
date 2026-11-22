import { ReactNode } from "react";
import clsx from "clsx";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor?: string;
  className?: string;
  withBorder?: boolean;
  subtext?: string;
}

export function StatCard({
  title,
  value,
  icon,
  iconBgColor = "bg-orange-100",
  className,
  withBorder = false,
  subtext,
}: StatCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col p-5 bg-white rounded-xl shadow-sm gap-3",
        withBorder && "border border-border-subtle",
        className
      )}
    >
      <div
        className={clsx(
          "flex h-11 w-11 items-center justify-center rounded-lg",
          iconBgColor
        )}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs sm:text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
        {subtext && <p className="mt-0.5 text-xs text-gray-400">{subtext}</p>}
      </div>
    </div>
  );
}
