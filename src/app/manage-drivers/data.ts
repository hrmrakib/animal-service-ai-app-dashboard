export type DriverStatus =
  | "On Trip"
  | "Available"
  | "Offline"
  | "Reject"
  | "Accept";

export interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  profilePic: string | null;
  location: string | null;
  rating: number;
  totalTrips: number; // mapped from total_reviews (no per-driver trip count in this endpoint)
  status: "On Trip" | "Available" | "Offline" | "Reject" | "Accept" | "Pending";
  isVerified: boolean;
  riderStatus: string;
  license: string | null;
  licenseExpiry: string | null;
  licenseType: string | null;
  vehicleType: string | null;
  vehicleYear: number | null;
  yearOfExperience: number;
}
