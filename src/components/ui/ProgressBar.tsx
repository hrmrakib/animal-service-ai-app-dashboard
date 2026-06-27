import clsx from "clsx";

interface ProgressBarProps {
  label: string;
  value: string;
  percentage: number;
  subtext: string;
}

export function ProgressBar({ label, value, percentage, subtext }: ProgressBarProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-end">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{value}</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-brand rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-gray-400">{subtext}</span>
    </div>
  );
}
