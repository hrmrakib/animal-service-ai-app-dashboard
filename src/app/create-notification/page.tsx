"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ChevronDown, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateNotificationPage() {
  const router = useRouter();

  // For All Users form state
  const [allTitle, setAllTitle] = useState("");
  const [allBody, setAllBody] = useState("");
  const [allSending, setAllSending] = useState(false);

  // For Specific User form state
  const [specificRole, setSpecificRole] = useState("");
  const [specificUser, setSpecificUser] = useState("");
  const [specificTitle, setSpecificTitle] = useState("");
  const [specificBody, setSpecificBody] = useState("");
  const [specificSending, setSpecificSending] = useState(false);

  // Role dropdown open state
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const roles = ["Admin", "User", "Driver", "Veterinarian"];
  const users = ["John Doe", "Sarah Williams", "Ahmad Khan", "Mark Johnson", "Emily Davis"];

  const handleSendAll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allTitle.trim() || !allBody.trim()) return;
    setAllSending(true);
    setTimeout(() => {
      setAllSending(false);
      setAllTitle("");
      setAllBody("");
    }, 1200);
  };

  const handleSendSpecific = (e: React.FormEvent) => {
    e.preventDefault();
    if (!specificTitle.trim() || !specificBody.trim()) return;
    setSpecificSending(true);
    setTimeout(() => {
      setSpecificSending(false);
      setSpecificRole("");
      setSpecificUser("");
      setSpecificTitle("");
      setSpecificBody("");
    }, 1200);
  };

  return (
    <DashboardLayout title="Create Notification" subtitle="">
      <div className="flex flex-col gap-6 mt-2">

        {/* Header with back arrow */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()} 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Create Notification</h2>
        </div>

        {/* Two-column layout with "Or" divider */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 items-stretch">

          {/* Left Column – For All Users */}
          <div className="flex-1 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-[#d08726] font-bold text-lg mb-6">For All Users</h3>
            <form onSubmit={handleSendAll} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Title</label>
                <input
                  type="text"
                  value={allTitle}
                  onChange={(e) => setAllTitle(e.target.value)}
                  placeholder="Write here"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FAF9F6] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Body Text</label>
                <textarea
                  value={allBody}
                  onChange={(e) => setAllBody(e.target.value)}
                  placeholder="Write here"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FAF9F6] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand resize-none"
                />
              </div>
              <div className="flex justify-center mt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="px-12 py-3 font-semibold"
                  disabled={allSending}
                >
                  {allSending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Now
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Center "Or" divider */}
          <div className="flex items-center justify-center lg:px-8 py-4 lg:py-0">
            <span className="text-gray-400 font-semibold text-lg">Or</span>
          </div>

          {/* Right Column – For Specific User */}
          <div className="flex-1 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-6">For Specific User</h3>
            <form onSubmit={handleSendSpecific} className="flex flex-col gap-5">
              
              {/* Select Role dropdown */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Select Role</label>
                <button
                  type="button"
                  onClick={() => { setRoleDropdownOpen(!roleDropdownOpen); setUserDropdownOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 bg-[#FAF9F6] text-sm text-left focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                >
                  <span className={specificRole ? "text-gray-900" : "text-gray-400"}>
                    {specificRole || "Search here or select from dropdown"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {roleDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                    {roles.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => { setSpecificRole(role); setRoleDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FAF9F6] transition-colors"
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Select User dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => { setUserDropdownOpen(!userDropdownOpen); setRoleDropdownOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 bg-[#FAF9F6] text-sm text-left focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                >
                  <span className={specificUser ? "text-gray-900" : "text-gray-400"}>
                    {specificUser || "Search here or select from dropdown"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                    {users.map((user) => (
                      <button
                        key={user}
                        type="button"
                        onClick={() => { setSpecificUser(user); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FAF9F6] transition-colors"
                      >
                        {user}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Title</label>
                <input
                  type="text"
                  value={specificTitle}
                  onChange={(e) => setSpecificTitle(e.target.value)}
                  placeholder="Write here"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FAF9F6] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Body Text</label>
                <textarea
                  value={specificBody}
                  onChange={(e) => setSpecificBody(e.target.value)}
                  placeholder="Write here"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FAF9F6] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand resize-none"
                />
              </div>

              <div className="flex justify-end mt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="px-12 py-3 font-semibold"
                  disabled={specificSending}
                >
                  {specificSending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Now
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
