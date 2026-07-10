export interface Vet {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  profilePic: string | null;
  location: string | null;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  isActive: boolean;
  clinicName: string | null;
  clinicLocation: string | null;
  specializations: string[];
  certifications: string[];
  professionalBio: string | null;
  yearsExperience: number;
  bookingFee: string;
  vetLicenseDoc: string | null;
  nidDoc: string | null;
  status: "Verified" | "Pending" | "Suspended";
}
