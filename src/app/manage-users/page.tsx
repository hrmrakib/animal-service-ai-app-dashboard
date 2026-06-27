"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { Eye, Ban } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const mockUsers = [
  { id: "1", name: "Olivia Rhye", username: "#12345", email: "Olivia123@gmail.com", phone: "0175589484", role: "Seller", date: "19 March, 2026", status: "Active" as const },
  { id: "2", name: "Olivia Rhye", username: "#12345", email: "Olivia123@gmail.com", phone: "0175589484", role: "Buyer", date: "19 March, 2026", status: "Suspended" as const },
  { id: "3", name: "Olivia Rhye", username: "#12345", email: "Olivia123@gmail.com", phone: "0175589484", role: "Vet", date: "19 March, 2026", status: "Active" as const },
  { id: "4", name: "Olivia Rhye", username: "#12345", email: "Olivia123@gmail.com", phone: "0175589484", role: "Transport", date: "19 March, 2026", status: "Active" as const },
  { id: "5", name: "Olivia Rhye", username: "#12345", email: "Olivia123@gmail.com", phone: "0175589484", role: "Seller", date: "19 March, 2026", status: "Active" as const },
  { id: "6", name: "Olivia Rhye", username: "#12345", email: "Olivia123@gmail.com", phone: "0175589484", role: "Seller", date: "19 March, 2026", status: "Active" as const },
  { id: "7", name: "Olivia Rhye", username: "#12345", email: "Olivia123@gmail.com", phone: "0175589484", role: "Buyer", date: "19 March, 2026", status: "Active" as const },
  { id: "8", name: "Olivia Rhye", username: "#12345", email: "Olivia123@gmail.com", phone: "0175589484", role: "Buyer", date: "19 March, 2026", status: "Active" as const },
];

export default function ManageUsersPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <DashboardLayout 
      title="Manage Users" 
      subtitle="Total registered accounts: 12,482 users"
    >
      <div className="flex flex-col gap-4 bg-white rounded-xl shadow-sm p-6 mt-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
          <SearchInput placeholder="Search Users" />
        </div>
        
        <Table
          data={mockUsers}
          keyExtractor={(row) => row.id}
          columns={[
            {
              header: "Users",
              accessor: (row) => (
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded border-gray-300 text-brand focus:ring-brand" />
                  <div className="h-8 w-8 rounded-full bg-pink-200 overflow-hidden shrink-0 flex items-center justify-center text-pink-700 font-bold text-xs">
                    {row.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{row.name}</span>
                    <span className="text-xs text-gray-500">{row.username}</span>
                  </div>
                </div>
              )
            },
            { header: "Gmail", accessor: "email", className: "text-gray-500" },
            { header: "Phone", accessor: "phone", className: "text-gray-500" },
            { header: "Role", accessor: "role", className: "text-gray-500" },
            { header: "Joining Date", accessor: "date", className: "text-gray-500" },
            {
              header: "Status",
              accessor: (row) => <Badge status={row.status} />
            },
            {
              header: "Action",
              accessor: (row) => (
                <div className="flex items-center gap-3">
                  <Link href={`/manage-users/${row.id}`} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button className="text-gray-400 hover:text-red-600 transition-colors">
                    <Ban className="h-4 w-4" />
                  </button>
                </div>
              )
            }
          ]}
        />
        
        <Pagination 
          currentPage={currentPage} 
          totalPages={10} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </DashboardLayout>
  );
}
