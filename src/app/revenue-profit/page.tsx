"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { DonutChartPlaceholder } from "@/components/ui/DonutChartPlaceholder";
import { Table } from "@/components/ui/Table";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Banknote, Users } from "lucide-react";
import { useGetRevenueProfitQuery } from "@/redux/features/revenueProfit/revenueProfitAPI";

const profitEntries = [
  {
    id: 1,
    name: "Olivia Rhye",
    username: "#12345",
    category: "Livestock",
    grossAmount: "SAR 45000",
    rate: "15%",
    netProfit: "SAR 450",
  },
  {
    id: 2,
    name: "Olivia Rhye",
    username: "#12345",
    category: "Product",
    grossAmount: "SAR 45000",
    rate: "15%",
    netProfit: "SAR 450",
  },
  {
    id: 3,
    name: "Olivia Rhye",
    username: "#12345",
    category: "Transport",
    grossAmount: "SAR 45000",
    rate: "15%",
    netProfit: "SAR 450",
  },
  {
    id: 4,
    name: "Olivia Rhye",
    username: "#12345",
    category: "Vet",
    grossAmount: "SAR 45000",
    rate: "15%",
    netProfit: "SAR 450",
  },
];

export default function RevenueProfitPage() {
  const { data } = useGetRevenueProfitQuery(undefined);

  const product_orders_commission = data?.data?.product_orders_commission;
  const transport_commission = data?.data?.transport_commission;
  const veterinary_appointments_commission =
    data?.data?.veterinary_appointments_commission;
  const veterinary_bills_commission = data?.data?.veterinary_bills_commission;
  const auctions_commission = data?.data?.auctions_commission;
  const total_commission = data?.data?.total_commission;

  console.log(product_orders_commission);

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
          <Table
            data={profitEntries}
            keyExtractor={(row) => row.id}
            columns={[
              {
                header: "Source ID",
                accessor: (row) => (
                  <div className='flex items-center gap-3'>
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
                header: "Service Category",
                accessor: "category",
                className: "text-gray-500",
              },
              {
                header: "Gross Amount",
                accessor: "grossAmount",
                className: "text-gray-500",
              },
              {
                header: "Commissions Rate",
                accessor: "rate",
                className: "text-gray-500",
              },
              {
                header: "Net Profit",
                accessor: "netProfit",
                className: "text-gray-500",
              },
            ]}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
