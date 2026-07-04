import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SettingsSidebar } from "@/components/layout/SettingsSidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout title="Settings">
      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 w-full max-w-7xl mx-auto h-full items-start">
        <SettingsSidebar />
        <div className="flex-1 w-full h-full bg-white rounded-xl border border-border-subtle p-6 md:min-h-[500px]">
          {children}
        </div>
      </div>
    </DashboardLayout>
  );
}
