"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { Eye, Ban } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
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

const PAGE_SIZE = 8;

function formatRole(role: string) {
  return role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ManageUsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useGetAllUsersQuery(undefined);

  const users: ApiUser[] = data?.data ?? [];

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.role?.toLowerCase().includes(q),
    );
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <DashboardLayout
      title='Manage Users'
      subtitle={`Total registered accounts: ${users.length} users`}
    >
      <div className='flex flex-col gap-4 bg-white rounded-xl shadow-sm p-6 mt-2'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2'>
          <h2 className='text-lg font-semibold text-gray-900'>Recent Users</h2>
          <SearchInput
            placeholder='Search Users'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {isLoading ? (
          <div className='py-12 text-center text-gray-500'>
            Loading users...
          </div>
        ) : isError ? (
          <div className='py-12 text-center text-red-500'>
            Failed to load users.
          </div>
        ) : paginatedUsers.length === 0 ? (
          <div className='py-12 text-center text-gray-500'>No users found.</div>
        ) : (
          <>
            <Table
              data={paginatedUsers}
              keyExtractor={(row) => row.id}
              columns={[
                {
                  header: "Users",
                  accessor: (row) => (
                    <div className='flex items-center gap-3'>
                      <div className='h-8 w-8 rounded-full bg-pink-200 overflow-hidden shrink-0 flex items-center justify-center text-pink-700 font-bold text-xs'>
                        {(row.name || row.email).charAt(0).toUpperCase()}
                      </div>
                      <div className='flex flex-col'>
                        <span className='font-medium text-gray-900'>
                          {row.name || "—"}
                        </span>
                        <span className='text-xs text-gray-500'>#{row.id}</span>
                      </div>
                    </div>
                  ),
                },
                {
                  header: "Gmail",
                  accessor: (row) => row.email,
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
                      <Link
                        href={`/manage-users/${row.id}`}
                        className='text-gray-400 hover:text-gray-600 transition-colors'
                      >
                        <Eye className='h-4 w-4' />
                      </Link>
                      <button className='text-gray-400 hover:text-red-600 transition-colors'>
                        <Ban className='h-4 w-4' />
                      </button>
                    </div>
                  ),
                },
              ]}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
