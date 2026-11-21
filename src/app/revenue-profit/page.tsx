"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { DonutChartPlaceholder } from "@/components/ui/DonutChartPlaceholder";
import { Table } from "@/components/ui/Table";
import { ProgressBar } from "@/components/ui/ProgressBar";
import GlobalPagination from "@/components/pagination/GlobalPagination";
import { Banknote, TrendingUp, Loader } from "lucide-react";
import { useGetRevenueProfitQuery } from "@/redux/features/revenueProfit/revenueProfitAPI";
import {
  useGetOverviewQuery,
  useGetPercentageQuery,
} from "@/redux/features/overview/overviewAPI";

interface ProfitEntry {
  user_name: string;
  service: string;
  gross_amount: number;
  commission_percentage: number;
  net_profit: number;
  date: string;
}

const getInitials = (name?: string) => {
  if (!name || !name.trim()) return "U";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase();
};

const getAvatarColor = (service?: string) => {
  const s = service?.toLowerCase() || "";
  if (s.includes("vet")) return "bg-blue-100 text-blue-700";
  if (s.includes("transport")) return "bg-orange-100 text-orange-700";
  if (s.includes("product")) return "bg-green-100 text-green-700";
  if (s.includes("auction")) return "bg-purple-100 text-purple-700";
  return "bg-pink-100 text-pink-700";
};

const getServiceBadgeStyle = (service?: string) => {
  const s = service?.toLowerCase() || "";
  if (s.includes("vet"))
    return "bg-blue-50 text-blue-700 border-blue-200";
  if (s.includes("transport"))
    return "bg-orange-50 text-orange-700 border-orange-200";
  if (s.includes("product"))
    return "bg-green-50 text-green-700 border-green-200";
  if (s.includes("auction"))
    return "bg-purple-50 text-purple-700 border-purple-200";
  return "bg-gray-50 text-gray-700 border-gray-200";
};

const formatSAR = (n: number | null | undefined) => {
  const num = typeof n === "number" ? n : Number(n) || 0;
  return `SAR ${num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatDate = (iso?: string) => {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

export default function RevenueProfitPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, isError } = useGetRevenueProfitQuery({
    page: currentPage,
  });
  const { data: overviewData } = useGetOverviewQuery(undefined);
  const { data: usagePercentageData } = useGetPercentageQuery(undefined);

  const profitData = data?.data;
  const recentProfit = profitData?.recent_profit_service;
  const results: ProfitEntry[] = recentProfit?.results ?? [];
  const totalPages: number = recentProfit?.total_pages ?? 1;
  const totalCount: number = recentProfit?.count ?? results.length;

  const product_orders_commission =
    Number(profitData?.product_orders_commission) || 0;
  const transport_commission =
    Number(profitData?.transport_commission) || 0;
  const veterinary_appointments_commission =
    Number(profitData?.veterinary_appointments_commission) || 0;
  const veterinary_bills_commission =
    Number(profitData?.veterinary_bills_commission) || 0;
  const auctions_commission =
    Number(profitData?.auctions_commission) || 0;
  const total_commission =
    Number(profitData?.total_commission) || 0;

  // Total Revenue calculation
  const overviewSummary =
    overviewData?.data?.summary ?? overviewData?.summary;
  const overviewRevenue = overviewSummary?.total_revenue;
  const resultsGrossSum = results.reduce(
    (acc, r) => acc + (Number(r.gross_amount) || 0),
    0
  );

  const totalRevenueDisplay =
    (profitData as { total_revenue?: number })?.total_revenue !== undefined
      ? formatSAR((profitData as { total_revenue?: number }).total_revenue)
      : overviewRevenue !== undefined && overviewRevenue !== null
        ? formatSAR(Number(overviewRevenue))
        : formatSAR(resultsGrossSum);

  // Percentage calculations relative to total commission
  const calcPercent = (val: number) => {
    if (total_commission <= 0) return 0;
    return Math.min(100, Math.round((val / total_commission) * 100));
  };

  const calcSubtext = (val: number) => {
    if (total_commission <= 0) return "0.0% of total";
    return `${((val / total_commission) * 100).toFixed(1)}% of total`;
  };

  // Donut chart data: Commission share if available, fallback to role distribution
  const commissionPercentageData =
    total_commission > 0
      ? {
          product_orders_percentage:
            (product_orders_commission / total_commission) * 100,
          veterinary_percentage:
            ((veterinary_appointments_commission +
              veterinary_bills_commission) /
              total_commission) *
            100,
          transports_percentage:
            (transport_commission / total_commission) * 100,
          auctions_percentage:
            (auctions_commission / total_commission) * 100,
          total_usage_count: formatSAR(total_commission),
        }
      : undefined;

  const activeDonutData =
    commissionPercentageData ||
    usagePercentageData?.data ||
    usagePercentageData;

  return (
    <DashboardLayout title='Revenue & Profit'>
      <div className='flex flex-col gap-6'>
        {/* Stat Cards Grid */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <StatCard
            title='Total Revenue'
            value={totalRevenueDisplay}
            icon={<Banknote className='h-6 w-6 text-brand' />}
          />
          <StatCard
            title='Total Commission Earned'
            value={formatSAR(total_commission)}
            icon={<TrendingUp className='h-6 w-6 text-blue-500' />}
            iconBgColor='bg-blue-50'
          />
        </div>

        {/* Charts Row */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Revenue Analytics (Progress Bars) */}
          <div className='lg:col-span-2 flex flex-col h-full bg-white rounded-xl shadow-sm p-6'>
            <div className='flex items-center justify-between mb-8'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Commission Breakdown
              </h3>
              <span className='text-xs font-medium px-2.5 py-1 rounded-md bg-brand/10 text-brand'>
                Total: {formatSAR(total_commission)}
              </span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 flex-1'>
              <ProgressBar
                label='Product Commission'
                value={formatSAR(product_orders_commission)}
                percentage={calcPercent(product_orders_commission)}
                subtext={calcSubtext(product_orders_commission)}
              />
              <ProgressBar
                label='Transport Commission'
                value={formatSAR(transport_commission)}
                percentage={calcPercent(transport_commission)}
                subtext={calcSubtext(transport_commission)}
              />
              <ProgressBar
                label='Veterinary Appointments Commission'
                value={formatSAR(veterinary_appointments_commission)}
                percentage={calcPercent(veterinary_appointments_commission)}
                subtext={calcSubtext(veterinary_appointments_commission)}
              />
              <ProgressBar
                label='Veterinary Bills Commission'
                value={formatSAR(veterinary_bills_commission)}
                percentage={calcPercent(veterinary_bills_commission)}
                subtext={calcSubtext(veterinary_bills_commission)}
              />
              <ProgressBar
                label='Auctions Commission'
                value={formatSAR(auctions_commission)}
                percentage={calcPercent(auctions_commission)}
                subtext={calcSubtext(auctions_commission)}
              />
              <ProgressBar
                label='Total Commission'
                value={formatSAR(total_commission)}
                percentage={total_commission > 0 ? 100 : 0}
                subtext={
                  total_commission > 0
                    ? "100% total earned"
                    : "0.0% total earned"
                }
              />
            </div>
          </div>

          <div className='min-h-87.5'>
            <DonutChartPlaceholder
              title={
                commissionPercentageData
                  ? "Commission Share"
                  : "Role Distribution"
              }
              totalLabel={
                commissionPercentageData ? "Commission" : "Total"
              }
              percentageData={activeDonutData}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Recent Profit Entries
              </h2>
              {totalCount > 0 && (
                <span className='px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600'>
                  {totalCount}
                </span>
              )}
            </div>
            {totalCount > 0 && (
              <span className='text-sm text-gray-500'>
                Showing {results.length} of {totalCount} entries
              </span>
            )}
          </div>

          {isLoading || isFetching ? (
            <div className='bg-white rounded-xl shadow-sm p-10 flex items-center justify-center gap-2 text-sm text-gray-400'>
              <Loader className='h-4 w-4 animate-spin' />
              Loading profit entries...
            </div>
          ) : isError ? (
            <div className='bg-white rounded-xl shadow-sm p-10 text-center text-sm text-red-500'>
              Failed to load profit entries.
            </div>
          ) : results.length === 0 ? (
            <div className='bg-white rounded-xl shadow-sm p-10 text-center text-sm text-gray-400'>
              No recent profit entries.
            </div>
          ) : (
            <>
              <Table
                data={results}
                keyExtractor={(row: ProfitEntry, idx: number) =>
                  `${row.user_name}-${row.date}-${idx}`
                }
                columns={[
                  {
                    header: "User",
                    accessor: (row) => (
                      <div className='flex items-center gap-3'>
                        <div
                          className={`h-9 w-9 rounded-full overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs ${getAvatarColor(
                            row.service
                          )}`}
                        >
                          {getInitials(row.user_name)}
                        </div>
                        <div className='flex flex-col'>
                          <span className='font-medium text-gray-900'>
                            {row.user_name || "Unknown User"}
                          </span>
                          <span className='text-xs text-gray-400'>
                            {formatDate(row.date)}
                          </span>
                        </div>
                      </div>
                    ),
                  },
                  {
                    header: "Service Category",
                    accessor: (row) => (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getServiceBadgeStyle(
                          row.service
                        )}`}
                      >
                        {row.service || "—"}
                      </span>
                    ),
                  },
                  {
                    header: "Gross Amount",
                    accessor: (row) => formatSAR(row.gross_amount),
                    className: "text-gray-600 font-medium",
                  },
                  {
                    header: "Commission Rate",
                    accessor: (row) =>
                      `${row.commission_percentage ?? 0}%`,
                    className: "text-gray-500",
                  },
                  {
                    header: "Net Profit",
                    accessor: (row) => formatSAR(row.net_profit),
                    className: "text-emerald-600 font-semibold",
                  },
                ]}
              />

              {totalPages > 1 && (
                <GlobalPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
