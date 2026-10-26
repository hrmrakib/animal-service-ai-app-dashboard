export interface UnverifiedSeller {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  is_verified: boolean;
  is_suspended: boolean;
  profile_pic?: string | null;
  created_at?: string;
}

export interface UnverifiedSellersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: UnverifiedSeller[];
}

export interface ApproveSellerResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    is_verified: boolean;
  };
}

export interface RejectSellerPayload {
  reason: string;
}

export interface RejectSellerResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    is_verified: boolean;
    reason: string;
  };
}

export interface ApprovalProduct {
  id: number;
  name: string;
  product_type: string;
  price: string;
  is_approved: boolean;
  is_rejected: boolean;
  user: number;
  images: string[];
  description?: string;
  created_at?: string;
  quantity?: number;
}

export interface ApprovalProductsResponse {
  success: boolean;
  data: ApprovalProduct[];
}

export interface ApproveProductResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    is_approved: boolean;
    is_rejected: boolean;
    price: string;
  };
}

export interface RejectProductPayload {
  reason: string;
}

export interface RejectProductResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    is_approved: boolean;
    is_rejected: boolean;
    reason: string;
  };
}

export interface UnverifiedAuction {
  id: number;
  name: string;
  starting_bid: string;
  is_verified: boolean;
  is_rejected: boolean;
  user: number;
  product_type?: string;
  images?: string[];
  description?: string;
  end_time?: string;
  created_at?: string;
}

export interface UnverifiedAuctionsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: UnverifiedAuction[];
}

export interface ApproveAuctionResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    is_verified: boolean;
    is_rejected: boolean;
  };
}

export interface RejectAuctionPayload {
  reason: string;
}

export interface RejectAuctionResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    is_verified: boolean;
    is_rejected: boolean;
    reason: string;
  };
}
