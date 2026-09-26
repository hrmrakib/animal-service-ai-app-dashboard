"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { AreaChartPlaceholder } from "@/components/ui/AreaChartPlaceholder";
import { DonutChartPlaceholder } from "@/components/ui/DonutChartPlaceholder";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { useState } from "react";
import { UserProfileModal } from "@/components/ui/UserProfileModal";
import {
  Banknote,
  Users,
  Gavel,
  ClipboardList,
  Clock,
  Eye,
  Loader,
} from "lucide-react";
import {
  useGetOverviewQuery,
  useGetPercentageQuery,
} from "@/redux/features/overview/overviewAPI";
import { useGetAllUsersQuery } from "@/redux/features/user/userAPI";

interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  is_verified: boolean;
  is_suspended: boolean;
  created_at: string;
}

function formatRole(role: string) {
  if (!role) return "—";
  return role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(dateStr: string) {
  if (!dateStr) return "—";
  const normalized = dateStr.includes("T") ? dateStr : dateStr.replace(" ", "T");
  const date = new Date(normalized);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getInitials(name?: string, email?: string) {
  if (name && name.trim()) {
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return "U";
}

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<ApiUser | null>(null);
  const { data } = useGetOverviewQuery(undefined);
  const { data: percentageData } = useGetPercentageQuery(undefined);
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetAllUsersQuery({
    page: 1,
    limit: 10,
  });

  const users: ApiUser[] = (
    usersData?.results ??
    usersData?.data?.results ??
    []
  ).slice(0, 10);

  const overview = data?.data ?? data ?? percentageData?.data ?? percentageData;
  const summary = overview?.summary;

  const totalRevenue =
    summary?.total_revenue !== undefined && summary?.total_revenue !== null
      ? `SAR ${Number(summary.total_revenue).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "SAR 0";

  const totalUsers = summary?.total_users ?? 0;
  const totalAuctions = summary?.total_auctions ?? 0;
  const activeOrders = summary?.active_orders ?? 0;
  const pendingOrders = summary?.pending_orders ?? 0;

  return (
    <DashboardLayout
      title='Overview here'
      subtitle='Real-time monetization and user acquisition insights'
    >
      <div className='flex flex-col gap-6'>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5'>
          <StatCard
            title='Total Revenue'
            value={totalRevenue}
            icon={<Banknote className='h-6 w-6 text-brand' />}
          />
          <StatCard
            title='Total Users'
            value={totalUsers}
            icon={<Users className='h-6 w-6 text-blue-500' />}
            iconBgColor='bg-blue-50'
          />
          <StatCard
            title='Total Auctions'
            value={totalAuctions}
            icon={<Gavel className='h-6 w-6 text-green-500' />}
            iconBgColor='bg-green-50'
          />
          <StatCard
            title='Active Order'
            value={activeOrders}
            icon={<ClipboardList className='h-6 w-6 text-blue-500' />}
            iconBgColor='bg-blue-50'
          />
          <StatCard
            title='Pending Order'
            value={pendingOrders}
            icon={<Clock className='h-6 w-6 text-red-500' />}
            iconBgColor='bg-red-50'
          />
        </div>

        {/* Charts Row */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <div className='lg:col-span-2 min-h-100'>
            <AreaChartPlaceholder data={overview} />
          </div>
          <div className='min-h-100'>
            <DonutChartPlaceholder
              percentageData={percentageData?.data ?? percentageData}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900'>
              Recent Users
            </h2>
            <Link
              href='/manage-users'
              className='text-sm font-medium text-brand hover:underline'
            >
              See All
            </Link>
          </div>

          {isUsersLoading ? (
            <div className='bg-white rounded-xl shadow-sm p-10 flex items-center justify-center gap-2 text-sm text-gray-400'>
              <Loader className='h-4 w-4 animate-spin text-brand' />
              Loading recent users...
            </div>
          ) : isUsersError ? (
            <div className='bg-white rounded-xl shadow-sm p-10 text-center text-sm text-red-500'>
              Failed to load recent users.
            </div>
          ) : users.length === 0 ? (
            <div className='bg-white rounded-xl shadow-sm p-10 text-center text-sm text-gray-400'>
              No recent users found.
            </div>
          ) : (
            <Table
              data={users}
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
                        {getInitials(row.name, row.email)}
                      </div>
                      <div className='flex flex-col'>
                        <span className='font-medium text-gray-900'>
                          {row.name || "—"}
                        </span>
                        <span className='text-xs text-gray-500'>
                          #{row.id}
                        </span>
                      </div>
                    </div>
                  ),
                },
                {
                  header: "Gmail",
                  accessor: (row) => row.email || "—",
                  className: "text-gray-500",
                },
                {
                  header: "Phone",
                  accessor: (row) => row.phone || "—",
                  className: "text-gray-500",
                },
                {
                  header: "Role",
                  accessor: (row) => formatRole(row.role),
                  className: "text-gray-500",
                },
                {
                  header: "Joining Date",
                  accessor: (row) => formatDate(row.created_at),
                  className: "text-gray-500",
                },
                {
                  header: "Status",
                  accessor: (row) => (
                    <Badge status={row.is_suspended ? "Suspended" : "Active"} />
                  ),
                },
                {
                  header: "Action",
                  accessor: (row) => (
                    <div className='flex items-center gap-3'>
                      <button
                        type='button'
                        onClick={() => setSelectedUser(row)}
                        className='text-gray-400 hover:text-brand transition-colors p-1 rounded hover:bg-gray-100'
                        title='View User Details'
                      >
                        <Eye className='h-4 w-4' />
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          )}
        </div>
      </div>

      <UserProfileModal
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />
    </DashboardLayout>
  );
}
