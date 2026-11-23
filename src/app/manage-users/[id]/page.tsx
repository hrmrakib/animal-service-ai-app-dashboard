"use client";

import { use } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserHeader } from "@/components/ui/UserHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Table } from "@/components/ui/Table";
import { SearchInput } from "@/components/ui/SearchInput";

import {
  ArrowLeft,
  Banknote,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  CalendarCheck,
  Truck,
  Loader,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGetUserDetailsQuery } from "@/redux/features/user/userAPI";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import GlobalPagination from "@/components/pagination/GlobalPagination";

// Generic activity record supporting rides, orders, appointments, etc.
interface ActivityRecord {
  id?: number | string;
  transport_id?: number | string;
  order_id?: number | string;
  appointment_id?: number | string;
  service?: string;
  type?: string;
  item?: string;
  product_name?: string;
  pickup_location?: string;
  drop_location?: string;
  date?: string;
  created_at?: string;
  appointment_date?: string;
  amount?: number | string;
  total_amount?: number | string;
  fee?: number | string;
  status?: string;
  user_name?: string;
  client_name?: string;
  patient_name?: string;
  pet_name?: string;
}

interface CommonUserDetails {
  id?: number | string;
  name?: string;
  email?: string;
  phone?: string | null;
  role?: string;
  is_verified?: boolean;
  clinic_name?: string;
  store_name?: string;
}

interface UserApiData {
  doctor_details?: CommonUserDetails;
  veterinarian_details?: CommonUserDetails;
  buyer_details?: CommonUserDetails;
  rider_details?: CommonUserDetails;
  seller_details?: CommonUserDetails;
  driver_details?: CommonUserDetails;
  user_details?: CommonUserDetails;
  recent_list?: {
    count?: number;
    results?: ActivityRecord[];
    total_pages?: number;
    next?: string | null;
    previous?: string | null;
  };
  // Buyer fields
  total_spending?: number;
  completed_orders_count?: number;
  pending_orders_count?: number;
  cancelled_orders_count?: number;
  // Appointments (Doctor / Vet / Buyer)
  completed_appointments_count?: number;
  pending_appointments_count?: number;
  cancelled_appointments_count?: number;
  // Transports (Rider / Buyer)
  completed_transports_count?: number;
  pending_transports_count?: number;
  // Earnings & Commissions
  total_earnings_amount?: number;
  platform_commission?: number;
  completed_rides_count?: number;
  pending_rides_count?: number;
  cancelled_rides_count?: number;
  total_orders?: number;
}

function formatCurrency(amount?: number | string | null) {
  const num = typeof amount === "number" ? amount : Number(amount) || 0;
  return `SAR ${num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  try {
    const normalized = dateStr.includes("T")
      ? dateStr
      : dateStr.replace(" ", "T");
    const date = new Date(normalized);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
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
  const roleParam = searchParams.get("role") || "buyer";
  const id = searchParams.get("id") || unwrappedParams.id;
  const limit = 10;
  const debounceSearch = useDebounce(search, 500);

  const { data, isLoading, isFetching, isError } = useGetUserDetailsQuery(
    {
      role: roleParam,
      id: String(id),
      page: currentPage,
      limit,
      search: debounceSearch,
    },
    {
      skip: !id,
    }
  );

  const apiData =
    ((data as unknown as { data?: UserApiData })?.data) || {};

  const userDetails: CommonUserDetails =
    apiData.doctor_details ||
    apiData.veterinarian_details ||
    apiData.buyer_details ||
    apiData.rider_details ||
    apiData.seller_details ||
    apiData.driver_details ||
    apiData.user_details ||
    (Object.values(apiData).find(
      (v) =>
        v &&
        typeof v === "object" &&
        !Array.isArray(v) &&
        ("role" in v || "email" in v || "name" in v)
    ) as CommonUserDetails | undefined) ||
    {};

  const recentList: ActivityRecord[] = apiData.recent_list?.results || [];
  const totalPages = apiData.recent_list?.total_pages || 1;

  const detectedRole = (
    userDetails.role ||
    roleParam ||
    ""
  ).toLowerCase();

  const isVet =
    detectedRole.includes("vet") ||
    detectedRole.includes("doctor") ||
    Boolean(apiData.doctor_details || apiData.veterinarian_details) ||
    (apiData.completed_appointments_count !== undefined &&
      apiData.total_spending === undefined &&
      apiData.completed_rides_count === undefined);

  const isBuyer =
    !isVet &&
    (detectedRole.includes("buyer") ||
      Boolean(apiData.buyer_details) ||
      apiData.total_spending !== undefined ||
      apiData.completed_orders_count !== undefined);

  const isRider =
    !isVet &&
    !isBuyer &&
    (detectedRole.includes("rider") ||
      detectedRole.includes("driver") ||
      detectedRole.includes("transport") ||
      Boolean(apiData.rider_details || apiData.driver_details) ||
      apiData.completed_rides_count !== undefined); 

  const renderStatCards = () => {
    if (isVet) {
      return (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
          <StatCard
            title='Total Earnings'
            value={formatCurrency(apiData.total_earnings_amount)}
            icon={<Banknote className='w-5 h-5 text-brand' />}
            iconBgColor='bg-brand/10'
            withBorder
          />
          <StatCard
            title='Platform Fee'
            value={formatCurrency(apiData.platform_commission)}
            icon={<Users className='w-5 h-5 text-blue-500' />}
            iconBgColor='bg-blue-50'
            withBorder
          />
          <StatCard
            title='Completed Appointments'
            value={apiData.completed_appointments_count ?? 0}
            icon={<CheckCircle2 className='w-5 h-5 text-green-500' />}
            iconBgColor='bg-green-50'
            withBorder
          />
          <StatCard
            title='Pending Appointments'
            value={apiData.pending_appointments_count ?? 0}
            icon={<Clock className='w-5 h-5 text-amber-500' />}
            iconBgColor='bg-amber-50'
            withBorder
          />
          <StatCard
            title='Cancelled Appointments'
            value={apiData.cancelled_appointments_count ?? 0}
            icon={<XCircle className='w-5 h-5 text-red-500' />}
            iconBgColor='bg-red-50'
            withBorder
          />
        </div>
      );
    }

    if (isBuyer) {
      return (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
          <StatCard
            title='Total Spending'
            value={formatCurrency(apiData.total_spending)}
            icon={<Wallet className='w-5 h-5 text-brand' />}
            iconBgColor='bg-brand/10'
            withBorder
          />
          <StatCard
            title='Completed Orders'
            value={apiData.completed_orders_count ?? 0}
            icon={<CheckCircle2 className='w-5 h-5 text-green-500' />}
            iconBgColor='bg-green-50'
            withBorder
          />
          <StatCard
            title='Pending Orders'
            value={apiData.pending_orders_count ?? 0}
            icon={<Clock className='w-5 h-5 text-amber-500' />}
            iconBgColor='bg-amber-50'
            withBorder
          />
          <StatCard
            title='Appointments'
            value={apiData.completed_appointments_count ?? 0}
            subtext={`${apiData.pending_appointments_count ?? 0} Pending`}
            icon={<CalendarCheck className='w-5 h-5 text-blue-500' />}
            iconBgColor='bg-blue-50'
            withBorder
          />
          <StatCard
            title='Transports'
            value={apiData.completed_transports_count ?? 0}
            subtext={`${apiData.pending_transports_count ?? 0} Pending`}
            icon={<Truck className='w-5 h-5 text-purple-500' />}
            iconBgColor='bg-purple-50'
            withBorder
          />
          <StatCard
            title='Cancelled Orders'
            value={apiData.cancelled_orders_count ?? 0}
            icon={<XCircle className='w-5 h-5 text-red-500' />}
            iconBgColor='bg-red-50'
            withBorder
          />
        </div>
      );
    }

    if (isRider) {
      return (
        <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
          <StatCard
            title='Total Earning'
            value={formatCurrency(apiData.total_earnings_amount)}
            icon={<Banknote className='w-5 h-5 text-brand' />}
            iconBgColor='bg-brand/10'
            withBorder
          />
          <StatCard
            title='Platform Fee'
            value={formatCurrency(apiData.platform_commission)}
            icon={<Users className='w-5 h-5 text-blue-500' />}
            iconBgColor='bg-blue-50'
            withBorder
          />
          <StatCard
            title='Completed Trip'
            value={apiData.completed_rides_count ?? 0}
            icon={<CheckCircle2 className='w-5 h-5 text-green-500' />}
            iconBgColor='bg-green-50'
            withBorder
          />
          <StatCard
            title='Pending Trip'
            value={apiData.pending_rides_count ?? 0}
            icon={<Clock className='w-5 h-5 text-amber-500' />}
            iconBgColor='bg-amber-50'
            withBorder
          />
          <StatCard
            title='Canceled Trip'
            value={apiData.cancelled_rides_count ?? 0}
            icon={<XCircle className='w-5 h-5 text-red-500' />}
            iconBgColor='bg-red-50'
            withBorder
          />
        </div>
      );
    }

    // Default fallback
    return (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <StatCard
          title='Total Spending'
          value={formatCurrency(apiData.total_spending)}
          icon={<Wallet className='w-5 h-5 text-brand' />}
          withBorder
        />
        <StatCard
          title='Orders'
          value={
            (apiData.completed_orders_count ?? 0) +
            (apiData.pending_orders_count ?? 0)
          }
          icon={<CheckCircle2 className='w-5 h-5 text-green-500' />}
          iconBgColor='bg-green-50'
          withBorder
        />
        <StatCard
          title='Appointments'
          value={apiData.completed_appointments_count ?? 0}
          icon={<CalendarCheck className='w-5 h-5 text-blue-500' />}
          iconBgColor='bg-blue-50'
          withBorder
        />
        <StatCard
          title='Transports'
          value={apiData.completed_transports_count ?? 0}
          icon={<Truck className='w-5 h-5 text-purple-500' />}
          iconBgColor='bg-purple-50'
          withBorder
        />
      </div>
    );
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
      case "active":
        return "text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full font-medium border border-green-200";
      case "assigned":
      case "pending":
      case "in_progress":
        return "text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full font-medium border border-amber-200";
      case "cancelled":
      case "rejected":
        return "text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full font-medium border border-red-200";
      default:
        return "text-gray-600 bg-gray-50 px-2.5 py-0.5 rounded-full font-medium border border-gray-200";
    }
  };

  const renderTable = () => {
    if (isVet) {
      return (
        <Table
          data={recentList}
          keyExtractor={(row: ActivityRecord, index: number) =>
            String(
              row.appointment_id ||
                row.id ||
                row.order_id ||
                index
            )
          }
          columns={[
            {
              header: "Appointment ID",
              accessor: (row: ActivityRecord) =>
                `#${row.appointment_id ?? row.id ?? "—"}`,
              className: "font-medium text-gray-900",
            },
            {
              header: "Client / Patient",
              accessor: (row: ActivityRecord) =>
                row.client_name ||
                row.user_name ||
                row.pet_name ||
                "—",
              className: "text-gray-700",
            },
            {
              header: "Service",
              accessor: (row: ActivityRecord) => (
                <span className='capitalize font-medium text-gray-800'>
                  {row.service || row.type || "Consultation"}
                </span>
              ),
              className: "text-gray-700",
            },
            {
              header: "Date & Time",
              accessor: (row: ActivityRecord) =>
                formatDate(
                  row.date ||
                    row.appointment_date ||
                    row.created_at
                ),
              className: "text-gray-500",
            },
            {
              header: "Amount",
              accessor: (row: ActivityRecord) =>
                formatCurrency(
                  row.amount ?? row.fee ?? row.total_amount
                ),
              className: "text-gray-900 font-medium",
            },
            {
              header: "Status",
              accessor: (row: ActivityRecord) => (
                <span
                  className={`text-xs capitalize ${getStatusColor(
                    row.status
                  )}`}
                >
                  {row.status || "—"}
                </span>
              ),
            },
          ]}
        />
      );
    }

    if (isBuyer) {
      return (
        <Table
          data={recentList}
          keyExtractor={(row: ActivityRecord, index: number) =>
            String(
              row.order_id ||
                row.id ||
                row.transport_id ||
                row.appointment_id ||
                index
            )
          }
          columns={[
            {
              header: "ID",
              accessor: (row: ActivityRecord) =>
                `#${
                  row.order_id ??
                  row.id ??
                  row.transport_id ??
                  row.appointment_id ??
                  "—"
                }`,
              className: "font-medium text-gray-900",
            },
            {
              header: "Service / Type",
              accessor: (row: ActivityRecord) => (
                <span className='capitalize font-medium text-gray-800'>
                  {row.service || row.type || "Order"}
                </span>
              ),
              className: "text-gray-700",
            },
            {
              header: "Details",
              accessor: (row: ActivityRecord) => {
                if (row.pickup_location && row.drop_location) {
                  return (
                    <span className='truncate max-w-xs block'>
                      {row.pickup_location} → {row.drop_location}
                    </span>
                  );
                }
                return row.product_name || row.item || "—";
              },
              className: "text-gray-500 max-w-xs truncate",
            },
            {
              header: "Date",
              accessor: (row: ActivityRecord) =>
                formatDate(row.date || row.created_at),
              className: "text-gray-500",
            },
            {
              header: "Amount",
              accessor: (row: ActivityRecord) =>
                formatCurrency(row.amount ?? row.total_amount),
              className: "text-gray-900 font-medium",
            },
            {
              header: "Status",
              accessor: (row: ActivityRecord) => (
                <span
                  className={`text-xs capitalize ${getStatusColor(
                    row.status
                  )}`}
                >
                  {row.status || "—"}
                </span>
              ),
            },
          ]}
        />
      );
    }

    return (
      <Table
        data={recentList}
        keyExtractor={(row: ActivityRecord, index: number) =>
          String(row.transport_id || row.id || index)
        }
        columns={[
          {
            header: "Trip ID",
            accessor: (row: ActivityRecord) =>
              `#${row.transport_id ?? row.id ?? "—"}`,
            className: "font-medium text-gray-900",
          },
          {
            header: "Pickup Location",
            accessor: (row: ActivityRecord) => row.pickup_location || "—",
            className: "text-gray-500 max-w-xs truncate",
          },
          {
            header: "Drop Location",
            accessor: (row: ActivityRecord) => row.drop_location || "—",
            className: "text-gray-500 max-w-xs truncate",
          },
          {
            header: "Date & Time",
            accessor: (row: ActivityRecord) =>
              formatDate(row.date || row.created_at),
            className: "text-gray-500",
          },
          {
            header: "Amount",
            accessor: (row: ActivityRecord) => formatCurrency(row.amount),
            className: "text-gray-900 font-medium",
          },
          {
            header: "Status",
            accessor: (row: ActivityRecord) => (
              <span
                className={`text-xs capitalize ${getStatusColor(row.status)}`}
              >
                {row.status || "—"}
              </span>
            ),
          },
        ]}
      />
    );
  };

  const getTableTitle = () => {
    if (isVet) return "Recent Appointments";
    if (isRider) return "Recent Trips";
    if (isBuyer) return "Recent Orders & Activities";
    return "Recent Activity";
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
          <div className='flex items-center gap-3 flex-wrap'>
            <span className='text-xl font-semibold text-gray-900'>
              {userDetails.name || userDetails.email || "User Details"}
            </span>
            {userDetails.role && (
              <span className='capitalize px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand/10 text-brand'>
                {userDetails.role}
              </span>
            )}
            {userDetails.clinic_name && (
              <span className='px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200'>
                Clinic: {userDetails.clinic_name}
              </span>
            )}
          </div>
        </div>

        {/* Main Content Container */}
        <div className='flex flex-col gap-8 bg-white rounded-xl shadow-sm p-6 lg:p-8'>
          {/* User Top Info */}
          <UserHeader
            name={userDetails.name || userDetails.email || "N/A"}
            roleId={`${
              (userDetails.role || roleParam || "ID").toUpperCase()
            }-${userDetails.id || id || "N/A"}`}
            email={userDetails.email || "N/A"}
            phone={userDetails.phone || "N/A"}
            rating={userDetails.is_verified ? 5 : 0}
            extraInfo={
              userDetails.clinic_name
                ? `Clinic: ${userDetails.clinic_name}`
                : undefined
            }
          />

          {/* Dynamic Stat Cards */}
          <div>{renderStatCards()}</div>

          {/* Divider */}
          <hr className='border-border-subtle' />

          {/* Dynamic Table Section */}
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
              <div className='flex items-center gap-2'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {getTableTitle()}
                </h3>
                {recentList.length > 0 && (
                  <span className='px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600'>
                    {apiData.recent_list?.count ?? recentList.length}
                  </span>
                )}
              </div>
              <SearchInput
                placeholder={`Search ${getTableTitle()}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {isLoading || isFetching ? (
              <div className='py-12 text-center text-gray-500 flex items-center justify-center gap-2'>
                <Loader className='w-4 h-4 animate-spin' />
                Loading records...
              </div>
            ) : isError ? (
              <div className='py-12 text-center text-red-500'>
                Failed to load user analytics.
              </div>
            ) : recentList.length > 0 ? (
              renderTable()
            ) : (
              <div className='py-12 text-center text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200'>
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
