import baseAPI from "@/redux/api/api";
import {
  UnverifiedSellersResponse,
  ApproveSellerResponse,
  RejectSellerPayload,
  RejectSellerResponse,
  ApprovalProductsResponse,
  ApproveProductResponse,
  RejectProductPayload,
  RejectProductResponse,
  UnverifiedAuctionsResponse,
  ApproveAuctionResponse,
  RejectAuctionPayload,
  RejectAuctionResponse,
} from "./approval.type";

export const approvalAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Seller Profile Approvals
    getUnverifiedSellers: builder.query<
      UnverifiedSellersResponse,
      { role?: string; page?: number; search?: string } | void
    >({
      query: (params) => ({
        url: "/users/unverified/",
        method: "GET",
        params: {
          role: "seller",
          ...(params || {}),
        },
      }),
      providesTags: ["SellerApproval"],
    }),

    acceptSeller: builder.mutation<ApproveSellerResponse, number | string>({
      query: (id) => ({
        url: `/users/verify/${id}/accept/`,
        method: "POST",
      }),
      invalidatesTags: ["SellerApproval", "User"],
    }),

    rejectSeller: builder.mutation<
      RejectSellerResponse,
      { id: number | string; data: RejectSellerPayload }
    >({
      query: ({ id, data }) => ({
        url: `/users/verify/${id}/reject/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SellerApproval", "User"],
    }),

    // 2. Product Approvals
    getApprovalProducts: builder.query<
      ApprovalProductsResponse,
      { page?: number; search?: string } | void
    >({
      query: (params) => ({
        url: "/products/approval-products/",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["ProductApproval"],
    }),

    acceptProduct: builder.mutation<ApproveProductResponse, number | string>({
      query: (id) => ({
        url: `/products/approval-products/${id}/accept/`,
        method: "POST",
      }),
      invalidatesTags: ["ProductApproval", "Product"],
    }),

    rejectProduct: builder.mutation<
      RejectProductResponse,
      { id: number | string; data: RejectProductPayload }
    >({
      query: ({ id, data }) => ({
        url: `/products/approval-products/${id}/reject/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProductApproval", "Product"],
    }),

    // 3. Auction Approvals (Pending & All)
    getUnverifiedAuctions: builder.query<
      UnverifiedAuctionsResponse,
      { page?: number; search?: string } | void
    >({
      query: (params) => ({
        url: "/aucitons/unverified/",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["AuctionApproval"],
    }),

    getAllAuctions: builder.query<
      UnverifiedAuctionsResponse,
      { page?: number; search?: string } | void
    >({
      query: (params) => ({
        url: "/aucitons/verify/",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["AuctionApproval"],
    }),

    acceptAuction: builder.mutation<ApproveAuctionResponse, number | string>({
      query: (id) => ({
        url: `/aucitons/${id}/verify/accept/`,
        method: "POST",
      }),
      invalidatesTags: ["AuctionApproval"],
    }),

    rejectAuction: builder.mutation<
      RejectAuctionResponse,
      { id: number | string; data: RejectAuctionPayload }
    >({
      query: ({ id, data }) => ({
        url: `/aucitons/${id}/verify/reject/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AuctionApproval"],
    }),
  }),
});

export const {
  useGetUnverifiedSellersQuery,
  useAcceptSellerMutation,
  useRejectSellerMutation,
  useGetApprovalProductsQuery,
  useAcceptProductMutation,
  useRejectProductMutation,
  useGetUnverifiedAuctionsQuery,
  useGetAllAuctionsQuery,
  useAcceptAuctionMutation,
  useRejectAuctionMutation,
} = approvalAPI;

export default approvalAPI;
