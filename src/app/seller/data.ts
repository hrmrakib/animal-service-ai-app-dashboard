export interface Seller {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  profilePic: string | null;
  location: string | null;
  deliveryAddress: string | null;
  isActive: boolean;
  isVerified: boolean;
  businessName: string | null;
  businessLocation: string | null;
  rating: number;
  totalReviews: number;
  status: "Verified" | "Pending" | "Suspended";
}
