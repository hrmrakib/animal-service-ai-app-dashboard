"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { ApprovalRejectModal } from "@/components/ui/ApprovalRejectModal";
import { ProductDetailModal } from "./_components/ProductDetailModal";
import { AuctionDetailModal } from "./_components/AuctionDetailModal";
import {
  useGetApprovalProductsQuery,
  useAcceptProductMutation,
  useRejectProductMutation,
  useGetUnverifiedAuctionsQuery,
  useAcceptAuctionMutation,
  useRejectAuctionMutation,
} from "@/redux/features/approval/approvalAPI";
import {
  ApprovalProduct,
  UnverifiedAuction,
} from "@/redux/features/approval/approval.type";
import {
  Package,
  Gavel,
  Clock,
  Eye,
  CheckCircle2,
  XCircle,
  Tag,
  DollarSign,
  RefreshCw,
  Layers,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

const PRODUCT_PRESET_REASONS = [
  "Product price is not realistic or violating policies.",
  "Product images are blurry, unclear, or violate guidelines.",
  "Listing information or description is inaccurate or misleading.",
  "Animal health documentation or license required.",
  "Violates platform listing policy.",
];

const AUCTION_PRESET_REASONS = [
  "Auction terms or starting bid invalid.",
  "Starting bid does not reflect realistic market value.",
  "Auction timeframe or bidding rules not compliant.",
  "Missing ownership or animal breed certificates.",
  "Violates auction terms and conditions.",
];

export default function ListingApprovalsPage() {
  const [activeTab, setActiveTab] = useState<"products" | "auctions">("products");
  const [search, setSearch] = useState("");

  // Product Modals State
  const [selectedProduct, setSelectedProduct] = useState<ApprovalProduct | null>(null);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [productToReject, setProductToReject] = useState<ApprovalProduct | null>(null);
  const [isProductRejectOpen, setIsProductRejectOpen] = useState(false);

  // Auction Modals State
  const [selectedAuction, setSelectedAuction] = useState<UnverifiedAuction | null>(null);
  const [isAuctionDetailsOpen, setIsAuctionDetailsOpen] = useState(false);
  const [auctionToReject, setAuctionToReject] = useState<UnverifiedAuction | null>(null);
  const [isAuctionRejectOpen, setIsAuctionRejectOpen] = useState(false);

  // Products RTK Query
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
    isError: isProductsError,
    refetch: refetchProducts,
  } = useGetApprovalProductsQuery();

  const [acceptProduct, { isLoading: isAcceptingProduct }] =
    useAcceptProductMutation();
  const [rejectProduct, { isLoading: isRejectingProduct }] =
    useRejectProductMutation();

  // Auctions RTK Query
  const {
    data: auctionsData,
    isLoading: isAuctionsLoading,
    isFetching: isAuctionsFetching,
    isError: isAuctionsError,
    refetch: refetchAuctions,
  } = useGetUnverifiedAuctionsQuery();

  const [acceptAuction, { isLoading: isAcceptingAuction }] =
    useAcceptAuctionMutation();
  const [rejectAuction, { isLoading: isRejectingAuction }] =
    useRejectAuctionMutation();

  const productsList: ApprovalProduct[] = useMemo(
    () => productsData?.data ?? [],
    [productsData?.data],
  );
  const auctionsList: UnverifiedAuction[] = useMemo(
    () => auctionsData?.results ?? [],
    [auctionsData?.results],
  );

  // Filter products by search query
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return productsList;
    const query = search.toLowerCase();
    return productsList.filter(
      (p) =>
        p.name?.toLowerCase().includes(query) ||
        p.product_type?.toLowerCase().includes(query) ||
        p.price?.toLowerCase().includes(query) ||
        p.id.toString().includes(query) ||
        p.user?.toString().includes(query),
    );
  }, [productsList, search]);

  // Filter auctions by search query
  const filteredAuctions = useMemo(() => {
    if (!search.trim()) return auctionsList;
    const query = search.toLowerCase();
    return auctionsList.filter(
      (a) =>
        a.name?.toLowerCase().includes(query) ||
        a.starting_bid?.toLowerCase().includes(query) ||
        a.id.toString().includes(query) ||
        a.user?.toString().includes(query),
    );
  }, [auctionsList, search]);

  // Product Actions
  const handleApproveProduct = async (product: ApprovalProduct) => {
    try {
      const res = await acceptProduct(product.id).unwrap();
      toast.success(res?.message || `"${product.name}" approved successfully!`);
      if (selectedProduct?.id === product.id) {
        setIsProductDetailsOpen(false);
        setSelectedProduct(null);
      }
      refetchProducts();
    } catch (err: unknown) {
      const msg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to approve product.";
      toast.error(msg);
    }
  };

  const handleRejectProductSubmit = async (reason: string) => {
    if (!productToReject) return;
    try {
      const res = await rejectProduct({
        id: productToReject.id,
        data: { reason },
      }).unwrap();

      toast.success(res?.message || `"${productToReject.name}" rejected.`);
      setIsProductRejectOpen(false);
      setProductToReject(null);
      if (selectedProduct?.id === productToReject.id) {
        setIsProductDetailsOpen(false);
        setSelectedProduct(null);
      }
      refetchProducts();
    } catch (err: unknown) {
      const msg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to reject product.";
      toast.error(msg);
    }
  };

  // Auction Actions
  const handleApproveAuction = async (auction: UnverifiedAuction) => {
    try {
      const res = await acceptAuction(auction.id).unwrap();
      toast.success(res?.message || `"${auction.name}" auction approved!`);
      if (selectedAuction?.id === auction.id) {
        setIsAuctionDetailsOpen(false);
        setSelectedAuction(null);
      }
      refetchAuctions();
    } catch (err: unknown) {
      const msg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to approve auction.";
      toast.error(msg);
    }
  };

  const handleRejectAuctionSubmit = async (reason: string) => {
    if (!auctionToReject) return;
    try {
      const res = await rejectAuction({
        id: auctionToReject.id,
        data: { reason },
      }).unwrap();

      toast.success(res?.message || `"${auctionToReject.name}" auction rejected.`);
      setIsAuctionRejectOpen(false);
      setAuctionToReject(null);
      if (selectedAuction?.id === auctionToReject.id) {
        setIsAuctionDetailsOpen(false);
        setSelectedAuction(null);
      }
      refetchAuctions();
    } catch (err: unknown) {
      const msg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to reject auction.";
      toast.error(msg);
    }
  };

  return (
    <DashboardLayout
      title='Listing Approvals'
      subtitle='Review, approve or reject regular products and live auction listings'
    >
      <div className='flex flex-col gap-6 mt-4'>
        {/* Top Summary Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {/* Pending Products Card */}
          <div
            onClick={() => setActiveTab("products")}
            className={`p-5 rounded-xl border transition-all cursor-pointer bg-white shadow-sm flex items-center justify-between ${
              activeTab === "products"
                ? "border-emerald-500 ring-2 ring-emerald-100"
                : "border-gray-100 hover:border-gray-300"
            }`}
          >
            <div className='flex flex-col'>
              <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
                Pending Products
              </span>
              <span className='text-3xl font-bold text-gray-900'>
                {isProductsLoading ? "..." : productsList.length}
              </span>
              <span className='text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium'>
                <Clock className='w-3.5 h-3.5' /> Standard Listings
              </span>
            </div>
            <div className='w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0'>
              <Package className='w-6 h-6' />
            </div>
          </div>

          {/* Pending Auctions Card */}
          <div
            onClick={() => setActiveTab("auctions")}
            className={`p-5 rounded-xl border transition-all cursor-pointer bg-white shadow-sm flex items-center justify-between ${
              activeTab === "auctions"
                ? "border-purple-500 ring-2 ring-purple-100"
                : "border-gray-100 hover:border-gray-300"
            }`}
          >
            <div className='flex flex-col'>
              <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
                Pending Auctions
              </span>
              <span className='text-3xl font-bold text-gray-900'>
                {isAuctionsLoading ? "..." : auctionsList.length}
              </span>
              <span className='text-xs text-purple-600 mt-1 flex items-center gap-1 font-medium'>
                <Clock className='w-3.5 h-3.5' /> Auction Listings
              </span>
            </div>
            <div className='w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0'>
              <Gavel className='w-6 h-6' />
            </div>
          </div>

          {/* Total Pending Card */}
          <div className='p-5 rounded-xl border border-gray-100 bg-white shadow-sm flex items-center justify-between'>
            <div className='flex flex-col'>
              <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
                Total Awaiting Review
              </span>
              <span className='text-3xl font-bold text-brand'>
                {isProductsLoading || isAuctionsLoading
                  ? "..."
                  : productsList.length + auctionsList.length}
              </span>
              <span className='text-xs text-gray-400 mt-1'>
                Products & Auctions combined
              </span>
            </div>
            <div className='w-12 h-12 rounded-xl bg-brand-light text-brand flex items-center justify-center shrink-0'>
              <Layers className='w-6 h-6' />
            </div>
          </div>
        </div>

        {/* Tab & Filter Bar */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100'>
            {/* Tabs */}
            <div className='flex items-center gap-2 bg-gray-100/70 p-1 rounded-xl'>
              <button
                type='button'
                onClick={() => {
                  setActiveTab("products");
                  setSearch("");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "products"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <Package className='w-4 h-4 text-emerald-600' />
                Products
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === "products"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {productsList.length}
                </span>
              </button>

              <button
                type='button'
                onClick={() => {
                  setActiveTab("auctions");
                  setSearch("");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "auctions"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <Gavel className='w-4 h-4 text-purple-600' />
                Auctions
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === "auctions"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {auctionsList.length}
                </span>
              </button>
            </div>

            {/* Search and Refresh */}
            <div className='flex items-center gap-3 w-full sm:w-auto'>
              <SearchInput
                placeholder={
                  activeTab === "products"
                    ? "Search products by name, type, price..."
                    : "Search auctions by title, bid, user..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type='button'
                onClick={() =>
                  activeTab === "products" ? refetchProducts() : refetchAuctions()
                }
                className='p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-brand hover:border-brand/40 transition-colors'
                title='Refresh list'
              >
                <RefreshCw
                  className={`w-4 h-4 ${
                    isProductsFetching || isAuctionsFetching ? "animate-spin" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* TAB 1: PRODUCTS LIST */}
          {activeTab === "products" && (
            <div>
              {isProductsLoading ? (
                <div className='py-20 flex flex-col items-center justify-center gap-3 text-gray-400'>
                  <div className='w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin' />
                  <p className='text-sm'>Loading pending products...</p>
                </div>
              ) : isProductsError ? (
                <div className='py-16 text-center text-red-500 bg-red-50/50 rounded-xl border border-red-100 flex flex-col items-center gap-2'>
                  <AlertCircle className='w-8 h-8 text-red-500' />
                  <p className='font-semibold text-sm'>
                    Failed to fetch product approval requests.
                  </p>
                  <button
                    onClick={() => refetchProducts()}
                    className='text-xs text-red-700 underline font-medium hover:text-red-900 mt-1'
                  >
                    Click here to retry
                  </button>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className='py-20 text-center text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center gap-3'>
                  <div className='w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600'>
                    <CheckCircle2 className='w-6 h-6' />
                  </div>
                  <p className='text-base font-semibold text-gray-700'>
                    {search ? "No products match your search query." : "No Pending Products"}
                  </p>
                  <p className='text-xs text-gray-400 max-w-sm'>
                    {search
                      ? "Try searching with a different product name or category."
                      : "All submitted products have been reviewed and approved."}
                  </p>
                </div>
              ) : (
                <Table
                  data={filteredProducts}
                  keyExtractor={(row) => row.id}
                  columns={[
                    {
                      header: "Product Item",
                      accessor: (row) => (
                        <div className='flex items-center gap-3'>
                          <div className='w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0 relative'>
                            {row.images && row.images.length > 0 ? (
                              <Image
                                src={row.images[0]}
                                alt={row.name}
                                fill
                                className='object-cover'
                                unoptimized
                              />
                            ) : (
                              <Package className='w-6 h-6 text-gray-400' />
                            )}
                          </div>
                          <div className='flex flex-col'>
                            <span className='font-semibold text-gray-900 text-sm'>
                              {row.name}
                            </span>
                            <span className='text-xs text-gray-400'>
                              Product ID: #{row.id}
                            </span>
                          </div>
                        </div>
                      ),
                    },
                    {
                      header: "Type / Category",
                      accessor: (row) => (
                        <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 capitalize'>
                          <Tag className='w-3 h-3' />
                          {row.product_type}
                        </span>
                      ),
                    },
                    {
                      header: "Price",
                      accessor: (row) => (
                        <span className='font-bold text-gray-900 text-sm'>
                          ${Number(row.price).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      ),
                    },
                    {
                      header: "Seller",
                      accessor: (row) => (
                        <span className='text-xs text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-md'>
                          User #{row.user}
                        </span>
                      ),
                    },
                    {
                      header: "Status",
                      accessor: (row) => (
                        <div className='flex items-center gap-1.5'>
                          <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200'>
                            <Clock className='w-3 h-3' /> Pending Approval
                          </span>
                          {row.is_rejected && (
                            <span className='inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-600 border border-red-200'>
                              Rejected
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
                          <button
                            type='button'
                            onClick={() => {
                              setSelectedProduct(row);
                              setIsProductDetailsOpen(true);
                            }}
                            className='p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-gray-200 hover:border-emerald-300'
                            title='View Product Details'
                          >
                            <Eye className='w-4 h-4' />
                          </button>

                          <Button
                            type='button'
                            variant='danger'
                            size='sm'
                            onClick={() => {
                              setProductToReject(row);
                              setIsProductRejectOpen(true);
                            }}
                            disabled={isAcceptingProduct || isRejectingProduct}
                            className='px-3 py-1 text-xs gap-1 h-8'
                          >
                            <XCircle className='w-3.5 h-3.5' />
                            Reject
                          </Button>

                          <Button
                            type='button'
                            variant='primary'
                            size='sm'
                            onClick={() => handleApproveProduct(row)}
                            disabled={isAcceptingProduct || isRejectingProduct}
                            className='px-3 py-1 text-xs gap-1 h-8 bg-[#00b341] hover:bg-[#009b35]'
                          >
                            <CheckCircle2 className='w-3.5 h-3.5' />
                            Approve
                          </Button>
                        </div>
                      ),
                    },
                  ]}
                />
              )}
            </div>
          )}

          {/* TAB 2: AUCTIONS LIST */}
          {activeTab === "auctions" && (
            <div>
              {isAuctionsLoading ? (
                <div className='py-20 flex flex-col items-center justify-center gap-3 text-gray-400'>
                  <div className='w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin' />
                  <p className='text-sm'>Loading pending auctions...</p>
                </div>
              ) : isAuctionsError ? (
                <div className='py-16 text-center text-red-500 bg-red-50/50 rounded-xl border border-red-100 flex flex-col items-center gap-2'>
                  <AlertCircle className='w-8 h-8 text-red-500' />
                  <p className='font-semibold text-sm'>
                    Failed to fetch auction approval requests.
                  </p>
                  <button
                    onClick={() => refetchAuctions()}
                    className='text-xs text-red-700 underline font-medium hover:text-red-900 mt-1'
                  >
                    Click here to retry
                  </button>
                </div>
              ) : filteredAuctions.length === 0 ? (
                <div className='py-20 text-center text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center gap-3'>
                  <div className='w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600'>
                    <CheckCircle2 className='w-6 h-6' />
                  </div>
                  <p className='text-base font-semibold text-gray-700'>
                    {search ? "No auctions match your search query." : "No Pending Auctions"}
                  </p>
                  <p className='text-xs text-gray-400 max-w-sm'>
                    {search
                      ? "Try searching with a different auction title or owner ID."
                      : "All submitted auctions have been reviewed and approved."}
                  </p>
                </div>
              ) : (
                <Table
                  data={filteredAuctions}
                  keyExtractor={(row) => row.id}
                  columns={[
                    {
                      header: "Auction Listing",
                      accessor: (row) => (
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center font-bold text-sm shrink-0'>
                            <Gavel className='w-5 h-5' />
                          </div>
                          <div className='flex flex-col'>
                            <span className='font-semibold text-gray-900 text-sm'>
                              {row.name}
                            </span>
                            <span className='text-xs text-gray-400'>
                              Auction ID: #{row.id}
                            </span>
                          </div>
                        </div>
                      ),
                    },
                    {
                      header: "Starting Bid",
                      accessor: (row) => (
                        <span className='font-bold text-purple-700 text-sm flex items-center gap-0.5'>
                          <DollarSign className='w-3.5 h-3.5' />
                          {Number(row.starting_bid).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      ),
                    },
                    {
                      header: "Creator / Seller",
                      accessor: (row) => (
                        <span className='text-xs text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-md'>
                          User #{row.user}
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
                          {row.is_rejected && (
                            <span className='inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-600 border border-red-200'>
                              Rejected
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
                          <button
                            type='button'
                            onClick={() => {
                              setSelectedAuction(row);
                              setIsAuctionDetailsOpen(true);
                            }}
                            className='p-1.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-gray-200 hover:border-purple-300'
                            title='View Auction Details'
                          >
                            <Eye className='w-4 h-4' />
                          </button>

                          <Button
                            type='button'
                            variant='danger'
                            size='sm'
                            onClick={() => {
                              setAuctionToReject(row);
                              setIsAuctionRejectOpen(true);
                            }}
                            disabled={isAcceptingAuction || isRejectingAuction}
                            className='px-3 py-1 text-xs gap-1 h-8'
                          >
                            <XCircle className='w-3.5 h-3.5' />
                            Reject
                          </Button>

                          <Button
                            type='button'
                            variant='primary'
                            size='sm'
                            onClick={() => handleApproveAuction(row)}
                            disabled={isAcceptingAuction || isRejectingAuction}
                            className='px-3 py-1 text-xs gap-1 h-8 bg-[#00b341] hover:bg-[#009b35]'
                          >
                            <CheckCircle2 className='w-3.5 h-3.5' />
                            Approve
                          </Button>
                        </div>
                      ),
                    },
                  ]}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={isProductDetailsOpen}
        onClose={() => {
          setIsProductDetailsOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onApprove={handleApproveProduct}
        onReject={(p) => {
          setProductToReject(p);
          setIsProductRejectOpen(true);
        }}
        isApproving={isAcceptingProduct}
      />

      {/* Product Reject Reason Modal */}
      <ApprovalRejectModal
        isOpen={isProductRejectOpen}
        onClose={() => {
          setIsProductRejectOpen(false);
          setProductToReject(null);
        }}
        onSubmit={handleRejectProductSubmit}
        title='Reject Product Listing'
        itemName={productToReject?.name}
        presetReasons={PRODUCT_PRESET_REASONS}
        isSubmitting={isRejectingProduct}
      />

      {/* Auction Detail Modal */}
      <AuctionDetailModal
        isOpen={isAuctionDetailsOpen}
        onClose={() => {
          setIsAuctionDetailsOpen(false);
          setSelectedAuction(null);
        }}
        auction={selectedAuction}
        onApprove={handleApproveAuction}
        onReject={(a) => {
          setAuctionToReject(a);
          setIsAuctionRejectOpen(true);
        }}
        isApproving={isAcceptingAuction}
      />

      {/* Auction Reject Reason Modal */}
      <ApprovalRejectModal
        isOpen={isAuctionRejectOpen}
        onClose={() => {
          setIsAuctionRejectOpen(false);
          setAuctionToReject(null);
        }}
        onSubmit={handleRejectAuctionSubmit}
        title='Reject Auction Listing'
        itemName={auctionToReject?.name}
        presetReasons={AUCTION_PRESET_REASONS}
        isSubmitting={isRejectingAuction}
      />
    </DashboardLayout>
  );
}
