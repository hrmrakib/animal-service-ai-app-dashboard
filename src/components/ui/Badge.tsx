import clsx from "clsx";

interface BadgeProps {
  status: "Active" | "Suspended" | "Pending";
}

export function Badge({ status }: BadgeProps) {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Suspended: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium", styles[status])}>
      {status}
    </span>
  );
}
