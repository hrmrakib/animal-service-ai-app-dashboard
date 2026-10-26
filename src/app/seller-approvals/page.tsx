"use client";

import React, { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { ApprovalRejectModal } from "@/components/ui/ApprovalRejectModal";
import { SellerApprovalModal } from "./_components/SellerApprovalModal";
import {
  useGetUnverifiedSellersQuery,
  useAcceptSellerMutation,
  useRejectSellerMutation,
} from "@/redux/features/approval/approvalAPI";
import { UnverifiedSeller } from "@/redux/features/approval/approval.type";
import {
  UserCheck,
  XCircle,
  Eye,
  Store,
  Clock,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-hot-toast";

const SELLER_PRESET_REASONS = [
  "Trade license document is blurry. Please provide a clear copy.",
  "National ID or Trade license details do not match the account holder.",
  "Incomplete store or business information provided.",
  "Business contact details could not be verified.",
  "Violates merchant terms and conditions.",
];

export default function SellerApprovalsPage() {
  const [search, setSearch] = useState("");
  const [selectedSeller, setSelectedSeller] = useState<UnverifiedSeller | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [sellerToReject, setSellerToReject] = useState<UnverifiedSeller | null>(null);

  // RTK Query hooks
  const { data, isLoading, isFetching, isError, refetch } =
    useGetUnverifiedSellersQuery();

  const [acceptSeller, { isLoading: isAccepting }] = useAcceptSellerMutation();
  const [rejectSeller, { isLoading: isRejecting }] = useRejectSellerMutation();

  const sellersList: UnverifiedSeller[] = useMemo(
    () => data?.results ?? [],
    [data?.results],
  );
  const totalCount = data?.count ?? sellersList.length;

  // Filter sellers client-side by search query
  const filteredSellers = useMemo(() => {
    if (!search.trim()) return sellersList;
    const query = search.toLowerCase();
    return sellersList.filter(
      (s) =>
        s.name?.toLowerCase().includes(query) ||
        s.email?.toLowerCase().includes(query) ||
        (s.phone && s.phone.toLowerCase().includes(query)) ||
        s.id.toString().includes(query),
    );
  }, [sellersList, search]);

  const handleApprove = async (seller: UnverifiedSeller) => {
    try {
      const res = await acceptSeller(seller.id).unwrap();
      toast.success(res?.message || `${seller.name} has been verified successfully!`);
      if (selectedSeller?.id === seller.id) {
        setIsDetailsOpen(false);
        setSelectedSeller(null);
      }
      refetch();
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to approve seller. Please try again.";
      toast.error(errorMsg);
    }
  };

  const handleRejectPrompt = (seller: UnverifiedSeller) => {
    setSellerToReject(seller);
    setIsRejectOpen(true);
  };

  const handleRejectSubmit = async (reason: string) => {
    if (!sellerToReject) return;
    try {
      const res = await rejectSeller({
        id: sellerToReject.id,
        data: { reason },
      }).unwrap();

      toast.success(
        res?.message ||
          `${sellerToReject.name} verification rejected. Notification sent.`,
      );
      setIsRejectOpen(false);
      setSellerToReject(null);
      if (selectedSeller?.id === sellerToReject.id) {
        setIsDetailsOpen(false);
        setSelectedSeller(null);
      }
      refetch();
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to reject seller. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <DashboardLayout
      title='Seller Profile Approvals'
      subtitle='Review, verify or reject new seller onboarding requests'
    >
      <div className='flex flex-col gap-6 mt-4'>
        {/* Top Summary Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div className='bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between'>
            <div className='flex flex-col'>
              <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
                Pending Approvals
              </span>
              <span className='text-3xl font-bold text-gray-900'>
                {isLoading ? "..." : totalCount}
              </span>
              <span className='text-xs text-amber-600 mt-1 flex items-center gap-1 font-medium'>
                <Clock className='w-3.5 h-3.5' /> Awaiting Admin Action
              </span>
            </div>
            <div className='w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0'>
              <ShieldAlert className='w-6 h-6' />
            </div>
          </div>

          <div className='bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between'>
            <div className='flex flex-col'>
              <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
                Role Filter
              </span>
              <span className='text-2xl font-bold text-brand capitalize'>
                Sellers Only
              </span>
              <span className='text-xs text-gray-400 mt-1'>
                GET /users/unverified/?role=seller
              </span>
            </div>
            <div className='w-12 h-12 rounded-xl bg-brand-light text-brand flex items-center justify-center shrink-0'>
              <Store className='w-6 h-6' />
            </div>
          </div>

          <div className='bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between'>
            <div className='flex flex-col'>
              <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
                Verification Action
              </span>
              <span className='text-sm font-semibold text-gray-800'>
                Accept or Reject
              </span>
              <span className='text-xs text-gray-400 mt-1'>
                Sends automated status notice
              </span>
            </div>
            <div className='w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0'>
              <UserCheck className='w-6 h-6' />
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5'>
          {/* Header & Controls */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <div>
              <h2 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
                Unverified Seller Applications
                {isFetching && (
                  <RefreshCw className='w-4 h-4 text-brand animate-spin' />
                )}
              </h2>
              <p className='text-xs text-gray-500 mt-0.5'>
                Click Accept to verify immediately or Reject to return with feedback.
              </p>
            </div>

            <div className='flex items-center gap-3 w-full sm:w-auto'>
              <SearchInput
                placeholder='Search by seller name, email, phone...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type='button'
                onClick={() => refetch()}
                className='p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-brand hover:border-brand/40 transition-colors'
                title='Refresh list'
              >
                <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* Table or States */}
          {isLoading ? (
            <div className='py-20 flex flex-col items-center justify-center gap-3 text-gray-400'>
              <div className='w-8 h-8 border-3 border-brand border-t-transparent rounded-full animate-spin' />
              <p className='text-sm'>Loading unverified sellers...</p>
            </div>
          ) : isError ? (
            <div className='py-16 text-center text-red-500 bg-red-50/50 rounded-xl border border-red-100 flex flex-col items-center gap-2'>
              <XCircle className='w-8 h-8 text-red-500' />
              <p className='font-semibold text-sm'>Failed to fetch seller approval requests.</p>
              <button
                onClick={() => refetch()}
                className='text-xs text-red-700 underline font-medium hover:text-red-900 mt-1'
              >
                Click here to retry
              </button>
            </div>
          ) : filteredSellers.length === 0 ? (
            <div className='py-20 text-center text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center gap-3'>
              <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400'>
                <CheckCircle2 className='w-6 h-6 text-green-500' />
              </div>
              <p className='text-base font-semibold text-gray-700'>
                {search ? "No sellers match your search query." : "All Caught Up!"}
              </p>
              <p className='text-xs text-gray-400 max-w-sm'>
                {search
                  ? "Try resetting your search filter or check another keyword."
                  : "There are currently no pending seller profile approval requests waiting for review."}
              </p>
            </div>
          ) : (
            <Table
              data={filteredSellers}
              keyExtractor={(row) => row.id}
              columns={[
                {
                  header: "Seller Profile",
                  accessor: (row) => (
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-full bg-brand-light text-brand flex items-center justify-center font-bold text-sm shrink-0 border border-brand/20'>
                        {row.name ? row.name.slice(0, 2).toUpperCase() : "S"}
                      </div>
                      <div className='flex flex-col'>
                        <span className='font-semibold text-gray-900 text-sm'>
                          {row.name || "Untitled Seller"}
                        </span>
                        <span className='text-xs text-gray-400'>ID: #{row.id}</span>
                      </div>
                    </div>
                  ),
                },
                {
                  header: "Contact Details",
                  accessor: (row) => (
                    <div className='flex flex-col text-xs gap-0.5'>
                      <span className='text-gray-800 font-medium'>{row.email}</span>
                      <span className='text-gray-500'>{row.phone || "No phone"}</span>
                    </div>
                  ),
                },
                {
                  header: "Role",
                  accessor: (row) => (
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60 uppercase'>
                      {row.role}
                    </span>
                  ),
                },
                {
                  header: "Status",
                  accessor: (row) => (
                    <div className='flex items-center gap-1.5'>
                      <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200'>
                        <Clock className='w-3 h-3' /> Pending Verification
                      </span>
                      {row.is_suspended && (
                        <span className='inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-600 border border-red-200'>
                          Suspended
                        </span>
                      )}
                    </div>
                  ),
                },
                {
                  header: "Actions",
                  className: "text-right",
                  accessor: (row) => (
                    <div className='flex items-center justify-end gap-2'>
                      {/* View details */}
                      <button
                        type='button'
                        onClick={() => {
                          setSelectedSeller(row);
                          setIsDetailsOpen(true);
                        }}
                        className='p-1.5 text-gray-500 hover:text-brand hover:bg-brand-light rounded-lg transition-colors border border-gray-200 hover:border-brand/30'
                        title='View Profile Details'
                      >
                        <Eye className='w-4 h-4' />
                      </button>

                      {/* Reject */}
                      <Button
                        type='button'
                        variant='danger'
                        size='sm'
                        onClick={() => handleRejectPrompt(row)}
                        disabled={isAccepting || isRejecting}
                        className='px-3 py-1 text-xs gap-1 h-8'
                      >
                        <XCircle className='w-3.5 h-3.5' />
                        Reject
                      </Button>

                      {/* Approve */}
                      <Button
                        type='button'
                        variant='primary'
                        size='sm'
                        onClick={() => handleApprove(row)}
                        disabled={isAccepting || isRejecting}
                        className='px-3 py-1 text-xs gap-1 h-8 bg-[#00b341] hover:bg-[#009b35]'
                      >
                        <UserCheck className='w-3.5 h-3.5' />
                        Approve
                      </Button>
                    </div>
                  ),
                },
              ]}
            />
          )}
        </div>
      </div>

      {/* Seller Profile Details Modal */}
      <SellerApprovalModal
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedSeller(null);
        }}
        seller={selectedSeller}
        onApprove={handleApprove}
        onReject={handleRejectPrompt}
        isApproving={isAccepting}
      />

      {/* Rejection Reason Modal */}
      <ApprovalRejectModal
        isOpen={isRejectOpen}
        onClose={() => {
          setIsRejectOpen(false);
          setSellerToReject(null);
        }}
        onSubmit={handleRejectSubmit}
        title='Reject Seller Verification'
        itemName={sellerToReject?.name}
        presetReasons={SELLER_PRESET_REASONS}
        isSubmitting={isRejecting}
      />
    </DashboardLayout>
  );
}
