import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Star, Truck, Calendar, X, CheckCircle2, MapPin } from "lucide-react";
import type { Driver } from "../data";

interface DriverProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
  onReject: () => void;
  onResubmit: () => void;
  onAccept: () => void;
}

export function DriverProfileModal({
  isOpen,
  onClose,
  driver,
  onReject,
  onResubmit,
  onAccept
}: DriverProfileModalProps) {
  if (!driver) return null;

  // Mock profile data for demonstration based on the design
  const profileDetails = {
    driverId: "DRV-5359",
    email: "sergio.ramasis@example.com",
    phone: "+880 1234 567890",
    dob: "March 15, 1988",
    gender: "Male",
    address: "45 Transport Avenue, Dhaka 1205, Bangladesh",
    vehicleType: "Pickup Truck",
    licensePlate: "DHK-GA-1234",
    makeModel: "Toyota Hilux 2020",
    color: "White",
    capacity: "Up to 5 animals",
    insuranceStatus: "Active",
    trips: [
      { id: "T-001", from: "Gazipur Farm", to: "Gabtoli Market", time: "Today at 2:45 PM", amount: "$120", status: "Completed" },
      { id: "T-045", from: "Farm A", to: "Farm B", time: "Yesterday at 10:30 AM", amount: "$85", status: "Completed" },
      { id: "T-098", from: "Market Center", to: "Rural Area", time: "2 days ago at 4:15 PM", amount: "$95", status: "Completed" },
      { id: "T-112", from: "City Center", to: "Outskirts", time: "3 days ago at 11:00 AM", amount: "$150", status: "Completed" },
    ]
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-4xl p-0"
      hideCloseButton
    >
      <div className="flex flex-col h-full max-h-[85vh]">
        {/* Banner */}
        <div className="bg-[#d08726] text-white p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-1.5 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white text-[#d08726] border-4 border-white flex items-center justify-center text-2xl font-bold">
                {getInitials(driver.name)}
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-1">{driver.name}</h2>
              <p className="text-white/80 text-sm mb-3">Professional Driver • ID: {profileDetails.driverId}</p>

              <div className="flex items-center gap-4 text-sm text-white/90">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-white" />
                  <span>{driver.rating} Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  <span>{driver.totalTrips} Trips</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Member since 2022</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FAFAFA] flex flex-col gap-6 custom-scrollbar">

          {/* Personal Info */}
          <section className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <p className="text-xs text-gray-400 mb-1">Full Name</p>
                <p className="font-medium text-sm text-gray-900">{driver.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Driver ID</p>
                <p className="font-medium text-sm text-gray-900">{profileDetails.driverId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Email</p>
                <p className="font-medium text-sm text-gray-900">{profileDetails.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Phone</p>
                <p className="font-medium text-sm text-gray-900">{profileDetails.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Date of Birth</p>
                <p className="font-medium text-sm text-gray-900">{profileDetails.dob}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Gender</p>
                <p className="font-medium text-sm text-gray-900">{profileDetails.gender}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-gray-400 mb-1">Address</p>
                <p className="font-medium text-sm text-gray-900">{profileDetails.address}</p>
              </div>
            </div>
          </section>

          {/* Vehicle Info */}
          <section className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Vehicle Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <p className="text-xs text-gray-400 mb-1">Vehicle Type</p>
                <p className="font-medium text-sm text-gray-900">{profileDetails.vehicleType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">License Plate</p>
                <p className="font-medium text-sm text-gray-900">{profileDetails.licensePlate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Make & Model</p>
                <p className="font-medium text-sm text-gray-900">{profileDetails.makeModel}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Color</p>
                <p className="font-medium text-sm text-gray-900">{profileDetails.color}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Capacity</p>
                <p className="font-medium text-sm text-gray-900">{profileDetails.capacity}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Insurance Status</p>
                <p className="font-medium text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {profileDetails.insuranceStatus}
                </p>
              </div>
            </div>
          </section>

          {/* Recent Trips */}
          <section className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Recent Trips</h3>
            <div className="flex flex-col gap-3">
              {profileDetails.trips.map((trip, idx) => (
                <div key={idx} className="bg-[#FAF9F6] rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-[#d08726] flex items-center justify-center text-white shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{trip.id}</h4>
                      <p className="text-xs text-gray-500 mt-1 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {trip.from} → {trip.to}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{trip.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{trip.amount}</p>
                    <p className="text-xs text-green-500 font-medium mt-1">{trip.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="bg-white p-6 border-t flex gap-4 shrink-0 justify-center">
          <Button variant="danger" className="w-40" onClick={onReject}>Reject</Button>
          <Button variant="brand" className="w-40" onClick={onResubmit}>Re submit</Button>
          <Button variant="primary" className="w-40" onClick={onAccept}>Accept</Button>
        </div>
      </div>
    </Modal>
  );
}
