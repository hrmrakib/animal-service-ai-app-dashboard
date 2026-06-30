"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { RejectReasonModal } from "@/components/ui/RejectReasonModal";
import { VetCard } from "./_components/VetCard";
import { CreateVetModal } from "./_components/CreateVetModal";
import { DeleteVetModal } from "./_components/DeleteVetModal";
import { VetProfileModal } from "./_components/VetProfileModal";
import { mockVets, Vet } from "./data";
import { 
  Users,
  Stethoscope,
  CalendarCheck,
  Star
} from "lucide-react";

export default function ManageVeterinaryPage() {
  const [vets, setVets] = useState<Vet[]>(mockVets);
  
  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  const [selectedVet, setSelectedVet] = useState<Vet | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Handlers
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreateOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedVet) {
      setVets(vets.filter(v => v.id !== selectedVet.id));
      setIsDeleteOpen(false);
      setSelectedVet(null);
    }
  };

  const handleRejectSubmit = (reason: string) => {
    setIsRejectOpen(false);
    setIsProfileOpen(false); 
    setSelectedVet(null);
  };

  const handleAccept = () => {
    setIsProfileOpen(false);
    setSelectedVet(null);
  };

  // Stat cards data
  const stats = [
    { label: "Active Vets", sub: "Currently available", value: "3", icon: <Stethoscope className="w-5 h-5 text-green-500" /> },
    { label: "Total Patients", sub: "Under care", value: "545", icon: <Users className="w-5 h-5 text-blue-500" /> },
    { label: "Total Appointments", sub: "Overall satisfaction", value: "152", icon: <CalendarCheck className="w-5 h-5 text-orange-500" /> },
    { label: "Avg Rating", sub: "Overall satisfaction", value: "4.7", icon: <Star className="w-5 h-5 text-yellow-500" /> },
  ];

  return (
    <DashboardLayout 
      title="Veterinary" 
      subtitle="Welcome back, Admin"
    >
      <div className="flex flex-col gap-6 mt-4">
        
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">Veterinary Management</h2>
          <Button onClick={() => setIsCreateOpen(true)} className="gap-2 bg-green-500 hover:bg-green-600 text-white">
            <span className="text-lg leading-none">+</span> Create Veterinarian
          </Button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-3">
                {stat.icon}
                <span className="text-sm font-semibold text-gray-700">{stat.label}</span>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 leading-none mb-1">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Grid of Vets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {vets.map(vet => (
            <VetCard 
              key={vet.id} 
              vet={vet}
              onDelete={() => {
                setSelectedVet(vet);
                setIsDeleteOpen(true);
              }}
              onEdit={() => {
                setSelectedVet(vet);
                setIsCreateOpen(true); // Open edit modal (reusing create modal for now)
              }}
              onView={() => {
                setSelectedVet(vet);
                setIsProfileOpen(true);
              }}
            />
          ))}
        </div>

      </div>

      {/* Modals */}
      <CreateVetModal 
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateSubmit}
      />
      
      <DeleteVetModal 
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedVet(null);
        }}
        onConfirm={handleDeleteConfirm}
        vet={selectedVet}
      />
      
      <VetProfileModal 
        isOpen={isProfileOpen}
        onClose={() => {
          setIsProfileOpen(false);
          setSelectedVet(null);
        }}
        vet={selectedVet}
        onReject={() => setIsRejectOpen(true)}
        onResubmit={() => setIsRejectOpen(true)}
        onAccept={handleAccept}
      />
      
      {/* Rendering after VetProfileModal so it shows on top */}
      <RejectReasonModal 
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onSubmit={handleRejectSubmit}
      />

    </DashboardLayout>
  );
}
