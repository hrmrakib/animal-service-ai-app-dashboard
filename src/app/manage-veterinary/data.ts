export interface Vet {
  id: string;
  name: string;
  specialization: string[];
  patients: number;
  experienceYears: number;
  rating: number;
  about: string;
  certifications: string[];
  phone: string;
  clinic: string;
  status: "Active" | "Inactive" | "Pending";
}

export const mockVets: Vet[] = [
  {
    id: "1",
    name: "Dr. Mark Johnson",
    specialization: ["Small Animals", "Large Animals"],
    patients: 111,
    experienceYears: 1.2,
    rating: 4.5,
    about: "A veterinary doctor, commonly known as a vet, is a highly trained medical professional dedicated to the health and well-being of animals. Vets diagnose, treat, and research medical conditions and diseases across a wide range of animals...",
    certifications: ["BVM & AH", "MVSc", "PHD"],
    phone: "4548978945",
    clinic: "Clinic Name",
    status: "Active",
  },
  {
    id: "2",
    name: "Dr. Sarah Williams",
    specialization: ["Small Animals", "Surgery"],
    patients: 245,
    experienceYears: 3.5,
    rating: 4.8,
    about: "Experienced veterinarian specializing in small animal care and surgical procedures. Dedicated to providing compassionate care for pets and their owners.",
    certifications: ["BVM & AH", "MVSc"],
    phone: "4548978946",
    clinic: "Pet Care Center",
    status: "Active",
  },
  {
    id: "3",
    name: "Dr. Ahmad Khan",
    specialization: ["Large Animals", "Livestock"],
    patients: 189,
    experienceYears: 5.0,
    rating: 4.7,
    about: "Specialist in large animal and livestock care with extensive experience in farm animal health management and emergency care.",
    certifications: ["BVM & AH"],
    phone: "4548978947",
    clinic: "Livestock Clinic",
    status: "Active",
  },
  {
    id: "4",
    name: "Dr. Sarah Williams", // Duplicate for mockup
    specialization: ["Small Animals", "Surgery"],
    patients: 245,
    experienceYears: 3.5,
    rating: 4.8,
    about: "Experienced veterinarian specializing in small animal care and surgical procedures. Dedicated to providing compassionate care for pets and their owners.",
    certifications: ["BVM & AH", "MVSc"],
    phone: "4548978946",
    clinic: "Pet Care Center",
    status: "Active",
  },
];
