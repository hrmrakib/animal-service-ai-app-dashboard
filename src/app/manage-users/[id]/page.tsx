"use client";

import { use } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserHeader } from "@/components/ui/UserHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Table } from "@/components/ui/Table";
import { SearchInput } from "@/components/ui/SearchInput";
import { Pagination } from "@/components/ui/Pagination";
import {
  ArrowLeft,
  Banknote,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGetUserDetailsQuery } from "@/redux/features/user/userAPI";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import GlobalPagination from "@/components/pagination/GlobalPagination";

// 1. Define the TypeScript interface for your trip records
interface TripRecord {
  transport_id: number;
  pickup_location: string;
  drop_location: string;
  date: string;
  amount: number;
  status: string;
}

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const id = searchParams.get("id") || unwrappedParams.id;
  const limit = 10;
  const debounceSearch = useDebounce(search, 999);

  const { data, isLoading } = useGetUserDetailsQuery({
    role: role as string,
    id: id as string,
    page: currentPage,
    limit,
    search: debounceSearch,
  });

  // 2. Cast `data` to `any` temporarily to bypass the 'never' error,
  // then explicitly type the extracted lists
  const apiData = (data as any)?.data || {};
  const userDetails = apiData.rider_details || {};
  const recentList: TripRecord[] = apiData.recent_list?.results || [];
  const totalPages = apiData.recent_list?.total_pages || 1;

  // Determine user role type safely (fallback for display)
  const currentRole = userDetails.role || role || "Transport";

  // Helper to render role-specific stat cards
  const renderStatCards = () => {
    return (
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <StatCard
          title='Total Earning'
          value={`$${apiData.total_earnings_amount?.toFixed(2) || "0.00"}`}
          icon={<Banknote className='w-5 h-5 text-brand' />}
          withBorder
        />
        <StatCard
          title='Platform Fee'
          value={`$${apiData.platform_commission?.toFixed(2) || "0.00"}`}
          icon={<Users className='w-5 h-5 text-blue-500' />}
          iconBgColor='bg-blue-50'
          withBorder
        />
        <StatCard
          title='Completed Trip'
          value={apiData.completed_rides_count || 0}
          icon={<CheckCircle2 className='w-5 h-5 text-green-500' />}
          iconBgColor='bg-green-50'
          withBorder
        />
        <StatCard
          title='Pending Trip'
          value={apiData.pending_rides_count || 0}
          icon={<Clock className='w-5 h-5 text-blue-500' />}
          iconBgColor='bg-blue-50'
          withBorder
        />
        <StatCard
          title='Canceled Trip'
          value={apiData.cancelled_rides_count || 0}
          icon={<XCircle className='w-5 h-5 text-red-500' />}
          iconBgColor='bg-red-50'
          withBorder
        />
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-50 px-2 py-1 rounded-md font-medium";
      case "assigned":
        return "text-blue-600 bg-blue-50 px-2 py-1 rounded-md font-medium";
      case "cancelled":
        return "text-red-600 bg-red-50 px-2 py-1 rounded-md font-medium";
      default:
        return "text-gray-500 bg-gray-50 px-2 py-1 rounded-md font-medium";
    }
  };

  // Helper to render role-specific table
  const renderTable = () => {
    return (
      <Table
        data={recentList}
        keyExtractor={(row: TripRecord) => row.transport_id?.toString()}
        columns={[
          {
            header: "Trip ID",
            accessor: "transport_id",
            className: "font-medium text-gray-900",
          },
          {
            header: "Pickup Location",
            accessor: "pickup_location",
            className: "text-gray-500 max-w-xs truncate",
          },
          {
            header: "Drop Location",
            accessor: "drop_location",
            className: "text-gray-500 max-w-xs truncate",
          },
          {
            header: "Date & Time",
            accessor: "date",
            className: "text-gray-500",
          },
          {
            header: "Amount",
            // 3. Explicitly type the `row` parameter in accessors
            accessor: (row: TripRecord) => `$${Number(row.amount).toFixed(2)}`,
            className: "text-gray-900 font-medium",
          },
          {
            header: "Status",
            // 3. Explicitly type the `row` parameter in accessors
            accessor: (row: TripRecord) => (
              <span
                className={`text-xs capitalize ${getStatusColor(row.status)}`}
              >
                {row.status}
              </span>
            ),
          },
        ]}
      />
    );
  };

  const getTableTitle = () => {
    return currentRole.includes("transport")
      ? "Recent Trips"
      : "Recent Activity";
  };

  return (
    <DashboardLayout title=''>
      <div className='flex flex-col gap-4 -mt-6'>
        {/* Top Title Bar Container */}
        <div className='flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 w-full'>
          <Link
            href='/manage-users'
            className='hover:bg-gray-100 p-1.5 rounded-full transition-colors'
          >
            <ArrowLeft className='w-5 h-5 text-gray-700' />
          </Link>
          <span className='text-xl font-semibold text-gray-900'>
            {userDetails.name || "Loading..."}
          </span>
        </div>

        {/* Main Content Container */}
        <div className='flex flex-col gap-8 bg-white rounded-xl shadow-sm p-6 lg:p-8'>
          {/* User Top Info */}
          <UserHeader
            name={userDetails.name || "N/A"}
            roleId={`${
              userDetails.role?.toUpperCase() || "ID"
            }-${userDetails.id || "N/A"}`}
            email={userDetails.email || "N/A"}
            phone={userDetails.phone || "N/A"}
            rating={userDetails.is_verified ? 5 : 0}
          />

          {/* Dynamic Stat Cards */}
          <div>{renderStatCards()}</div>

          {/* Divider */}
          <hr className='border-border-subtle' />

          {/* Dynamic Table Section */}
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
              <h3 className='text-lg font-semibold text-gray-900'>
                {getTableTitle()}
              </h3>
              <SearchInput
                placeholder={`Search ${getTableTitle().split(" ")[1] || ""}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {isLoading ? (
              <div className='py-8 text-center text-gray-500'>
                Loading data...
              </div>
            ) : recentList.length > 0 ? (
              renderTable()
            ) : (
              <div className='py-8 text-center text-gray-500'>
                No records found.
              </div>
            )}

            {totalPages > 1 && (
              <GlobalPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
