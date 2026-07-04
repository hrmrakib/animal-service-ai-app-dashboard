import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { AreaChartPlaceholder } from "@/components/ui/AreaChartPlaceholder";
import { DonutChartPlaceholder } from "@/components/ui/DonutChartPlaceholder";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import {
  Banknote,
  Users,
  Gavel,
  ClipboardList,
  Clock,
  Eye,
  Ban,
} from "lucide-react";

const recentUsers = [
  {
    id: 1,
    name: "Olivia Rhye",
    username: "#12345",
    email: "Olivia123@gmail.com",
    phone: "0175589484",
    role: "Job Seeker",
    date: "19 March, 2026",
    status: "Active" as const,
  },
  {
    id: 2,
    name: "Olivia Rhye",
    username: "#12345",
    email: "Olivia123@gmail.com",
    phone: "0175589484",
    role: "Job Seeker",
    date: "19 March, 2026",
    status: "Suspended" as const,
  },
  {
    id: 3,
    name: "Olivia Rhye",
    username: "#12345",
    email: "Olivia123@gmail.com",
    phone: "0175589484",
    role: "Job Seeker",
    date: "19 March, 2026",
    status: "Active" as const,
  },
  {
    id: 4,
    name: "Olivia Rhye",
    username: "#12345",
    email: "Olivia123@gmail.com",
    phone: "0175589484",
    role: "Job Seeker",
    date: "19 March, 2026",
    status: "Active" as const,
  },
  {
    id: 5,
    name: "Olivia Rhye",
    username: "#12345",
    email: "Olivia123@gmail.com",
    phone: "0175589484",
    role: "Job Seeker",
    date: "19 March, 2026",
    status: "Active" as const,
  },
];

export default function Home() {
  return (
    <DashboardLayout
      title='Overview'
      subtitle='Real-time monetization and user acquisition insights'
    >
      <div className='flex flex-col gap-6'>
        {/* Stat Cards Grid */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5'>
          <StatCard
            title='Total Revenue'
            value='SAR 725'
            icon={<Banknote className='h-6 w-6 text-brand' />}
          />
          <StatCard
            title='Total Users'
            value='5180'
            icon={<Users className='h-6 w-6 text-blue-500' />}
            iconBgColor='bg-blue-50'
          />
          <StatCard
            title='Total Auctions'
            value='50'
            icon={<Gavel className='h-6 w-6 text-green-500' />}
            iconBgColor='bg-green-50'
          />
          <StatCard
            title='Active Order'
            value='525'
            icon={<ClipboardList className='h-6 w-6 text-blue-500' />}
            iconBgColor='bg-blue-50'
          />
          <StatCard
            title='Pending Order'
            value='75'
            icon={<Clock className='h-6 w-6 text-red-500' />}
            iconBgColor='bg-red-50'
          />
        </div>

        {/* Charts Row */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <div className='lg:col-span-2 min-h-100'>
            <AreaChartPlaceholder />
          </div>
          <div className='min-h-100'>
            <DonutChartPlaceholder />
          </div>
        </div>

        {/* Table Section */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900'>
              Recent Users
            </h2>
          </div>
          <Table
            data={recentUsers}
            keyExtractor={(row) => row.id}
            columns={[
              {
                header: "Users",
                accessor: (row) => (
                  <div className='flex items-center gap-3'>
                    <input
                      type='checkbox'
                      className='rounded border-gray-300 text-brand focus:ring-brand'
                    />
                    <div className='h-8 w-8 rounded-full bg-pink-200 overflow-hidden shrink-0 flex items-center justify-center text-pink-700 font-bold text-xs'>
                      OR
                    </div>
                    <div className='flex flex-col'>
                      <span className='font-medium text-gray-900'>
                        {row.name}
                      </span>
                      <span className='text-xs text-gray-500'>
                        {row.username}
                      </span>
                    </div>
                  </div>
                ),
              },
              {
                header: "Gmail",
                accessor: "email",
                className: "text-gray-500",
              },
              {
                header: "Phone",
                accessor: "phone",
                className: "text-gray-500",
              },
              { header: "Role", accessor: "role", className: "text-gray-500" },
              {
                header: "Joining Date",
                accessor: "date",
                className: "text-gray-500",
              },
              {
                header: "Status",
                accessor: (row) => <Badge status={row.status} />,
              },
              {
                header: "Action",
                accessor: () => (
                  <div className='flex items-center gap-3'>
                    <button className='text-gray-400 hover:text-gray-600'>
                      <Eye className='h-4 w-4' />
                    </button>
                    <button className='text-gray-400 hover:text-red-600'>
                      <Ban className='h-4 w-4' />
                    </button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
