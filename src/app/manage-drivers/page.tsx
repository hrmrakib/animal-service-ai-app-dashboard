"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { DriverCard } from "./_components/DriverCard";
import { CreateDriverModal } from "./_components/CreateDriverModal";
import { DeleteDriverModal } from "./_components/DeleteDriverModal";
import { RejectReasonModal } from "@/components/ui/RejectReasonModal";
import { DriverProfileModal } from "./_components/DriverProfileModal";
import { mockDrivers, Driver } from "./data";
import {
  Banknote,
  Wallet,
  Car,
  Users,
  Truck,
  List,
  Grid2X2,
} from "lucide-react";

export default function ManageDriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Handlers
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate creation
    setIsCreateOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedDriver) {
      setDrivers(drivers.filter((d) => d.id !== selectedDriver.id));
      setIsDeleteOpen(false);
      setSelectedDriver(null);
    }
  };

  const handleRejectSubmit = (reason: string) => {
    // Simulate rejection
    setIsRejectOpen(false);
    setIsProfileOpen(false); // Close profile if opened from there
    setSelectedDriver(null);
  };

  const handleAccept = () => {
    // Simulate accept
    setIsProfileOpen(false);
    setSelectedDriver(null);
  };

  // Stat cards data
  const stats = [
    {
      label: "Total Earnings",
      value: "SAR 725",
      icon: <Banknote className='w-5 h-5 text-blue-500' />,
      bg: "bg-blue-50",
    },
    {
      label: "Today's Earnings",
      value: "SAR 125",
      icon: <Wallet className='w-5 h-5 text-orange-500' />,
      bg: "bg-orange-50",
    },
    {
      label: "Total Drivers",
      value: "56",
      icon: <Car className='w-5 h-5 text-blue-500' />,
      bg: "bg-blue-50",
    },
    {
      label: "Online Drivers",
      value: "12",
      icon: <Users className='w-5 h-5 text-red-500' />,
      bg: "bg-red-50",
    },
    {
      label: "On Active Trips",
      value: "15",
      icon: <Truck className='w-5 h-5 text-green-500' />,
      bg: "bg-green-50",
    },
  ];

  return (
    <DashboardLayout title='Drivers' subtitle='Welcome back, Admin'>
      <div className='flex flex-col gap-6 mt-4'>
        {/* Stat Cards */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className='bg-white rounded-xl p-5 border border-gray-100 flex flex-col gap-3 shadow-sm'
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg}`}
              >
                {stat.icon}
              </div>
              <div>
                <p className='text-xs text-gray-500 font-medium mb-1'>
                  {stat.label}
                </p>
                <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6'>
          {/* Header Controls */}
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <h2 className='text-lg font-bold text-gray-900'>All Drivers</h2>

            <div className='flex items-center gap-3'>
              <div className='flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1'>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-white shadow-sm text-brand" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <Grid2X2 className='w-4 h-4' />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-white shadow-sm text-brand" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <List className='w-4 h-4' />
                </button>
              </div>
            </div>
          </div>

          {/* Grid of Drivers */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                : "flex flex-col gap-4"
            }
          >
            {drivers.map((driver) => (
              <DriverCard
                key={driver.id}
                driver={driver}
                viewMode={viewMode}
                onDelete={() => {
                  setSelectedDriver(driver);
                  setIsDeleteOpen(true);
                }}
                onView={() => {
                  setSelectedDriver(driver);
                  setIsProfileOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateDriverModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateSubmit}
      />

      <DeleteDriverModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedDriver(null);
        }}
        onConfirm={handleDeleteConfirm}
        driver={selectedDriver}
      />

      <DriverProfileModal
        isOpen={isProfileOpen}
        onClose={() => {
          setIsProfileOpen(false);
          setSelectedDriver(null);
        }}
        driver={selectedDriver}
        onReject={() => setIsRejectOpen(true)}
        onResubmit={() => setIsRejectOpen(true)}
        onAccept={handleAccept}
      />

      <RejectReasonModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onSubmit={handleRejectSubmit}
      />
    </DashboardLayout>
  );
}
