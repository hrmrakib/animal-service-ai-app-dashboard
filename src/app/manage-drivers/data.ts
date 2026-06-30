export type DriverStatus = "On Trip" | "Available" | "Offline" | "Reject" | "Accept";

export interface Driver {
  id: string;
  name: string;
  rating: number;
  totalTrips: number;
  todaysEarnings: number;
  tripsCompleted: number;
  currentTrip?: {
    from: string;
    to: string;
  };
  status: DriverStatus;
}

export const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "Sergio Ramasis",
    rating: 4.9,
    totalTrips: 531,
    todaysEarnings: 342.50,
    tripsCompleted: 12,
    currentTrip: { from: "Gazipur Farm", to: "Gabtoli Market" },
    status: "On Trip",
  },
  {
    id: "2",
    name: "John D.",
    rating: 4.9,
    totalTrips: 531,
    todaysEarnings: 289.00,
    tripsCompleted: 8,
    status: "Available",
  },
  {
    id: "3",
    name: "Maria S.",
    rating: 4.9,
    totalTrips: 531,
    todaysEarnings: 456.75,
    tripsCompleted: 15,
    currentTrip: { from: "Farm A", to: "Farm B" },
    status: "Reject",
  },
  {
    id: "4",
    name: "Sarah L.",
    rating: 4.9,
    totalTrips: 531,
    todaysEarnings: 512.40,
    tripsCompleted: 18,
    status: "Available",
  },
  {
    id: "5",
    name: "Ahmed K.",
    rating: 4.8,
    totalTrips: 531,
    todaysEarnings: 198.20,
    tripsCompleted: 6,
    status: "Offline",
  },
  {
    id: "6",
    name: "Sarah L.", // Duplicate for mockup
    rating: 4.9,
    totalTrips: 531,
    todaysEarnings: 512.40,
    tripsCompleted: 18,
    status: "Available",
  },
  {
    id: "7",
    name: "Mike T.",
    rating: 4.9,
    totalTrips: 531,
    todaysEarnings: 387.90,
    tripsCompleted: 11,
    currentTrip: { from: "Market Center", to: "Rural Area" },
    status: "On Trip",
  },
  {
    id: "8",
    name: "Mike T.", // Duplicate for mockup
    rating: 4.9,
    totalTrips: 531,
    todaysEarnings: 387.90,
    tripsCompleted: 11,
    currentTrip: { from: "Market Center", to: "Rural Area" },
    status: "Accept",
  },
];
