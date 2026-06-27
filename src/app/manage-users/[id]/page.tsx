"use client";

import { use } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserHeader } from "@/components/ui/UserHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Table } from "@/components/ui/Table";
import { SearchInput } from "@/components/ui/SearchInput";
import { Pagination } from "@/components/ui/Pagination";
import { ArrowLeft, Banknote, ClipboardList, Clock, CheckCircle2, XCircle, Gavel, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// --- Mock Data ---

type RoleType = "Seller" | "Buyer" | "Vet" | "Transport";

interface MockUser {
  id: string;
  name: string;
  roleId: string;
  email: string;
  phone: string;
  rating: number;
  roleType: RoleType;
}

const USERS: Record<string, MockUser> = {
  "1": { id: "1", name: "Sarah Johnson", roleId: "SLR-7729-BD", email: "sarah.johnson@email.com", phone: "+1 (415) 555-0123", rating: 4.8, roleType: "Seller" },
  "2": { id: "2", name: "Sarah Johnson", roleId: "BYR-7729-BD", email: "sarah.johnson@email.com", phone: "+1 (415) 555-0123", rating: 4.8, roleType: "Buyer" },
  "3": { id: "3", name: "Sarah Johnson", roleId: "VET-7729-BD", email: "sarah.johnson@email.com", phone: "+1 (415) 555-0123", rating: 4.8, roleType: "Vet" },
  "4": { id: "4", name: "Sarah Johnson", roleId: "TRS-7729-BD", email: "sarah.johnson@email.com", phone: "+1 (415) 555-0123", rating: 4.8, roleType: "Transport" },
};

const ORDER_DATA = [
  { id: "#AUC-55291", product: "Persian Cat (Golden)", date: "Oct 02, 2024", amount: "SAR 450", status: "Order Placed", statusColor: "text-gray-600" },
  { id: "#ORD-55292", product: "Persian Cat (Golden)", date: "Oct 02, 2024", amount: "SAR 450", status: "Order Placed", statusColor: "text-gray-600" },
  { id: "#ORD-55293", product: "Persian Cat (Golden)", date: "Oct 02, 2024", amount: "SAR 450", status: "Delivered", statusColor: "text-green-600" },
  { id: "#ORD-55294", product: "Persian Cat (Golden)", date: "Oct 02, 2024", amount: "SAR 450", status: "Confirmed", statusColor: "text-gray-900" },
];

const SERVICE_DATA = [
  { id: "1", userId: "Olivia Rhye", username: "#12345", date: "Oct 02, 2024", time: "10.00 AM", status: "Pending", statusColor: "text-gray-500" },
  { id: "2", userId: "Olivia Rhye", username: "#12345", date: "Oct 02, 2024", time: "10.00 AM", status: "Pending", statusColor: "text-gray-500" },
  { id: "3", userId: "Olivia Rhye", username: "#12345", date: "Oct 02, 2024", time: "10.00 AM", status: "Delivered", statusColor: "text-green-600" },
];

const TRIP_DATA = [
  { id: "#TR-55291", date: "Oct 02, 2024", time: "10.00 AM", amount: "SAR 500", status: "Pending", statusColor: "text-gray-500" },
  { id: "#TR-55292", date: "Oct 02, 2024", time: "10.00 AM", amount: "SAR 500", status: "Completed", statusColor: "text-green-600" },
  { id: "#TR-55293", date: "Oct 02, 2024", time: "10.00 AM", amount: "SAR 500", status: "Pending", statusColor: "text-gray-500" },
];


export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const user = USERS[unwrappedParams.id] || USERS["1"]; // Default to seller if not found
  const [currentPage, setCurrentPage] = useState(1);

  // Helper to render role-specific stat cards
  const renderStatCards = () => {
    switch (user.roleType) {
      case "Seller":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard title="Total Gross Sell" value="SAR 725" icon={<Banknote className="w-5 h-5 text-brand" />} withBorder />
            <StatCard title="Platform Commission" value="SAR 5180" icon={<Users className="w-5 h-5 text-blue-500" />} iconBgColor="bg-blue-50" withBorder />
            <StatCard title="Completed Order" value="264" icon={<CheckCircle2 className="w-5 h-5 text-green-500" />} iconBgColor="bg-green-50" withBorder />
            <StatCard title="Pending Order" value="28" icon={<Clock className="w-5 h-5 text-blue-500" />} iconBgColor="bg-blue-50" withBorder />
            <StatCard title="Canceled Order" value="80" icon={<XCircle className="w-5 h-5 text-red-500" />} iconBgColor="bg-red-50" withBorder />
            <StatCard title="Auctions Completed" value="12" icon={<Gavel className="w-5 h-5 text-red-500" />} iconBgColor="bg-red-50" withBorder />
          </div>
        );
      case "Buyer":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard title="Total Spent" value="SAR 725" icon={<Banknote className="w-5 h-5 text-brand" />} withBorder />
            <StatCard title="Platform Commission" value="SAR 5180" icon={<Users className="w-5 h-5 text-blue-500" />} iconBgColor="bg-blue-50" withBorder />
            <StatCard title="Completed Order" value="264" icon={<CheckCircle2 className="w-5 h-5 text-green-500" />} iconBgColor="bg-green-50" withBorder />
            <StatCard title="Pending Order" value="28" icon={<Clock className="w-5 h-5 text-blue-500" />} iconBgColor="bg-blue-50" withBorder />
            <StatCard title="Canceled Order" value="80" icon={<XCircle className="w-5 h-5 text-red-500" />} iconBgColor="bg-red-50" withBorder />
            <StatCard title="Auctions Completed" value="12" icon={<Gavel className="w-5 h-5 text-red-500" />} iconBgColor="bg-red-50" withBorder />
          </div>
        );
      case "Vet":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard title="Completed Service" value="25" icon={<Banknote className="w-5 h-5 text-brand" />} withBorder />
            <StatCard title="Platform Commission" value="SAR 5180" icon={<Users className="w-5 h-5 text-blue-500" />} iconBgColor="bg-blue-50" withBorder />
          </div>
        );
      case "Transport":
        return (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard title="Total Earning" value="SAR 5180" icon={<Banknote className="w-5 h-5 text-brand" />} withBorder />
            <StatCard title="Platform Fee" value="SAR 5180" icon={<Users className="w-5 h-5 text-blue-500" />} iconBgColor="bg-blue-50" withBorder />
            <StatCard title="Completed Trip" value="25" icon={<CheckCircle2 className="w-5 h-5 text-blue-500" />} iconBgColor="bg-blue-50" withBorder />
            <StatCard title="Canceled Trip" value="12" icon={<XCircle className="w-5 h-5 text-blue-500" />} iconBgColor="bg-blue-50" withBorder />
            <StatCard title="Pending Trip" value="12" icon={<Clock className="w-5 h-5 text-blue-500" />} iconBgColor="bg-blue-50" withBorder />
          </div>
        );
    }
  };

  // Helper to render role-specific table
  const renderTable = () => {
    switch (user.roleType) {
      case "Seller":
      case "Buyer":
        return (
          <Table
            data={ORDER_DATA}
            keyExtractor={(row) => row.id}
            columns={[
              { header: "Order ID", accessor: "id", className: "font-medium text-gray-900" },
              { header: "Product", accessor: "product", className: "text-gray-500" },
              { header: "Date", accessor: "date", className: "text-gray-500" },
              { header: "Amount", accessor: "amount", className: "text-gray-500" },
              { 
                header: "Status", 
                accessor: (row) => <span className={`text-sm ${row.statusColor}`}>{row.status}</span> 
              },
            ]}
          />
        );
      case "Vet":
        return (
          <Table
            data={SERVICE_DATA}
            keyExtractor={(row) => row.id}
            columns={[
              {
                header: "User ID",
                accessor: (row) => (
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-pink-200 overflow-hidden shrink-0 flex items-center justify-center text-pink-700 font-bold text-xs">
                      OR
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{row.userId}</span>
                      <span className="text-xs text-gray-500">{row.username}</span>
                    </div>
                  </div>
                )
              },
              { header: "Date", accessor: "date", className: "text-gray-500" },
              { header: "Time", accessor: "time", className: "text-gray-500" },
              { 
                header: "Status", 
                accessor: (row) => <span className={`text-sm ${row.statusColor}`}>{row.status}</span> 
              },
            ]}
          />
        );
      case "Transport":
        return (
          <Table
            data={TRIP_DATA}
            keyExtractor={(row) => row.id}
            columns={[
              { header: "Trip ID", accessor: "id", className: "font-medium text-gray-900" },
              { header: "Date", accessor: "date", className: "text-gray-500" },
              { header: "Time", accessor: "time", className: "text-gray-500" },
              { header: "Amount", accessor: "amount", className: "text-gray-500" },
              { 
                header: "Status", 
                accessor: (row) => <span className={`text-sm ${row.statusColor}`}>{row.status}</span> 
              },
            ]}
          />
        );
    }
  };

  const getTableTitle = () => {
    switch(user.roleType) {
      case "Seller":
      case "Buyer": return "Recent Order";
      case "Vet":
      case "Transport": return "Recent Service";
    }
  };

  return (
    <DashboardLayout title="">
      <div className="flex flex-col gap-4 -mt-6">
        {/* Top Title Bar Container */}
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 w-full">
          <Link href="/manage-users" className="hover:bg-gray-100 p-1.5 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <span className="text-xl font-semibold text-gray-900">Mr. John</span>
        </div>

        {/* Main Content Container */}
        <div className="flex flex-col gap-8 bg-white rounded-xl shadow-sm p-6 lg:p-8">
          
          {/* User Top Info */}
          <UserHeader 
            name={user.name} 
            roleId={user.roleId} 
            email={user.email} 
            phone={user.phone} 
            rating={user.rating} 
          />

          {/* Dynamic Stat Cards */}
          <div>
            {renderStatCards()}
          </div>

          {/* Divider */}
          <hr className="border-border-subtle" />

          {/* Dynamic Table Section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-900">{getTableTitle()}</h3>
              <SearchInput placeholder={`Search ${getTableTitle().split(' ')[1]}`} />
            </div>

            {renderTable()}

            <Pagination 
              currentPage={currentPage} 
              totalPages={10} 
              onPageChange={setCurrentPage} 
            />
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
