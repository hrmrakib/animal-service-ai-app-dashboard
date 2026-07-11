"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { DonutChartPlaceholder } from "@/components/ui/DonutChartPlaceholder";
import { Table } from "@/components/ui/Table";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Banknote, Loader, Users } from "lucide-react";
import { useGetRevenueProfitQuery } from "@/redux/features/revenueProfit/revenueProfitAPI";

interface ProfitEntry {
  user_name: string;
  service: string;
  gross_amount: number;
  commission_percentage: number;
  net_profit: number;
  date: string;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const avatarColors: Record<string, string> = {
  "Veterinary Appointment": "bg-blue-200 text-blue-700",
  Transport: "bg-orange-200 text-orange-700",
  "Product Order": "bg-green-200 text-green-700",
  Auction: "bg-purple-200 text-purple-700",
};

const formatSAR = (n: number) =>
  `SAR ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function RevenueProfitPage() {
  const { data, isFetching } = useGetRevenueProfitQuery(undefined);

  const d = data?.data?.recent_profit_service;

  const results = d?.results ?? [];

  console.log(results);

  const product_orders_commission = data?.data?.product_orders_commission;
  const transport_commission = data?.data?.transport_commission;
  const veterinary_appointments_commission =
    data?.data?.veterinary_appointments_commission;
  const veterinary_bills_commission = data?.data?.veterinary_bills_commission;
  const auctions_commission = data?.data?.auctions_commission;
  const total_commission = data?.data?.total_commission;

  return (
    <DashboardLayout title='Revenue & Profit'>
      <div className='flex flex-col gap-6'>
        {/* Stat Cards Grid */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <StatCard
            title='Total Revenue'
            value='SAR 725'
            icon={<Banknote className='h-6 w-6 text-brand' />}
          />
          <StatCard
            title='Total Commission Earned'
            value='SAR 5180'
            icon={<Users className='h-6 w-6 text-blue-500' />}
            iconBgColor='bg-blue-50'
          />
        </div>

        {/* Charts Row */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Revenue Analytics (Progress Bars) */}
          <div className='lg:col-span-2 flex flex-col h-full bg-white rounded-xl shadow-sm p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-8'>
              Commission Breakdown{" "}
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 flex-1'>
              <ProgressBar
                label='Product Commission'
                value={"SAR " + product_orders_commission}
                percentage={product_orders_commission ?? 0}
              />
              <ProgressBar
                label='Transport Commission'
                value={"SAR " + transport_commission}
                percentage={transport_commission ?? 0}
              />
              <ProgressBar
                label='Veterinary Appointments Commission'
                value={"SAR " + veterinary_appointments_commission}
                percentage={veterinary_appointments_commission ?? 0}
              />
              <ProgressBar
                label='Veterinary Bills Commission'
                value={"SAR " + veterinary_bills_commission}
                percentage={veterinary_bills_commission ?? 0}
              />
              <ProgressBar
                label='Auctions Commission'
                value={"SAR " + auctions_commission}
                percentage={auctions_commission ?? 0}
              />
              <ProgressBar
                label='Total Commission'
                value={"SAR " + total_commission}
                percentage={total_commission ?? 0}
              />
            </div>
          </div>

          <div className='min-h-87.5'>
            <DonutChartPlaceholder />
          </div>
        </div>

        {/* Table Section */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900'>
              Recent Profit Entries
            </h2>
            <button className='text-sm font-medium text-gray-900 hover:underline'>
              See All
            </button>
          </div>

          {isFetching ? (
            <div className='bg-white rounded-xl shadow-sm p-10 flex items-center justify-center gap-2 text-sm text-gray-400'>
              <Loader className='h-4 w-4 animate-spin' />
              Loading profit entries...
            </div>
          ) : results.length === 0 ? (
            <div className='bg-white rounded-xl shadow-sm p-10 text-center text-sm text-gray-400'>
              No recent profit entries.
            </div>
          ) : (
            <Table
              data={results}
              keyExtractor={(row: ProfitEntry) =>
                `${row.user_name}-${row.date}`
              }
              columns={[
                {
                  header: "User",
                  accessor: (row) => (
                    <div className='flex items-center gap-3'>
                      <div
                        className={`h-8 w-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs ${
                          avatarColors[row.service] ||
                          "bg-pink-200 text-pink-700"
                        }`}
                      >
                        {getInitials(row.user_name)}
                      </div>
                      <div className='flex flex-col'>
                        <span className='font-medium text-gray-900'>
                          {row.user_name}
                        </span>
                        <span className='text-xs text-gray-500'>
                          {formatDate(row.date)}
                        </span>
                      </div>
                    </div>
                  ),
                },
                {
                  header: "Service Category",
                  accessor: (row) => row.service,
                  className: "text-gray-500",
                },
                {
                  header: "Gross Amount",
                  accessor: (row) => formatSAR(row.gross_amount),
                  className: "text-gray-500",
                },
                {
                  header: "Commissions Rate",
                  accessor: (row) => `${row.commission_percentage}%`,
                  className: "text-gray-500",
                },
                {
                  header: "Net Profit",
                  accessor: (row) => formatSAR(row.net_profit),
                  className: "text-gray-900 font-medium",
                },
              ]}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
