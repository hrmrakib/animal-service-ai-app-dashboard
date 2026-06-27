import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { DonutChartPlaceholder } from "@/components/ui/DonutChartPlaceholder";
import { Table } from "@/components/ui/Table";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Banknote, Users } from "lucide-react";

const profitEntries = [
  { id: 1, name: "Olivia Rhye", username: "#12345", category: "Livestock", grossAmount: "SAR 45000", rate: "15%", netProfit: "SAR 450" },
  { id: 2, name: "Olivia Rhye", username: "#12345", category: "Product", grossAmount: "SAR 45000", rate: "15%", netProfit: "SAR 450" },
  { id: 3, name: "Olivia Rhye", username: "#12345", category: "Transport", grossAmount: "SAR 45000", rate: "15%", netProfit: "SAR 450" },
  { id: 4, name: "Olivia Rhye", username: "#12345", category: "Vet", grossAmount: "SAR 45000", rate: "15%", netProfit: "SAR 450" },
];

export default function RevenueProfitPage() {
  return (
    <DashboardLayout title="Revenue & Profit">
      <div className="flex flex-col gap-6">
        
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <StatCard 
            title="Total Revenue" 
            value="SAR 725" 
            icon={<Banknote className="h-6 w-6 text-brand" />} 
          />
          <StatCard 
            title="Total Commission Earned" 
            value="SAR 5180" 
            icon={<Users className="h-6 w-6 text-blue-500" />} 
            iconBgColor="bg-blue-50"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Revenue Analytics (Progress Bars) */}
          <div className="lg:col-span-2 flex flex-col h-full bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-8">Revenue Analytics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 flex-1">
              <ProgressBar 
                label="Livestock Commission" 
                value="$124,500.00" 
                percentage={60} 
                subtext="60 of total commission" 
              />
              <ProgressBar 
                label="Product Commission" 
                value="SAR 42,320" 
                percentage={20} 
                subtext="20 of total commission" 
              />
              <ProgressBar 
                label="Transport Fees" 
                value="SAR 18,455" 
                percentage={10} 
                subtext="10 of total commission" 
              />
              <ProgressBar 
                label="Vet Services" 
                value="SAR 18,455" 
                percentage={10} 
                subtext="10 of total commission" 
              />
            </div>
          </div>

          <div className="min-h-[350px]">
            <DonutChartPlaceholder />
          </div>
        </div>

        {/* Table Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Profit Entries</h2>
            <button className="text-sm font-medium text-gray-900 hover:underline">See All</button>
          </div>
          <Table
            data={profitEntries}
            keyExtractor={(row) => row.id}
            columns={[
              {
                header: "Source ID",
                accessor: (row) => (
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-pink-200 overflow-hidden shrink-0 flex items-center justify-center text-pink-700 font-bold text-xs">
                      OR
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{row.name}</span>
                      <span className="text-xs text-gray-500">{row.username}</span>
                    </div>
                  </div>
                )
              },
              { header: "Service Category", accessor: "category", className: "text-gray-500" },
              { header: "Gross Amount", accessor: "grossAmount", className: "text-gray-500" },
              { header: "Commissions Rate", accessor: "rate", className: "text-gray-500" },
              { header: "Net Profit", accessor: "netProfit", className: "text-gray-500" }
            ]}
          />
        </div>

      </div>
    </DashboardLayout>
  );
}
