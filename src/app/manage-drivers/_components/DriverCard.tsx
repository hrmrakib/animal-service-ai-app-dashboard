import React from "react";
import { Star, MapPin, Trash2, Eye, Mail } from "lucide-react";
import clsx from "clsx";
import type { Driver } from "../data";

interface DriverCardProps {
  driver: Driver;
  onDelete: () => void;
  onView: () => void;
  viewMode?: "grid" | "list";
}

export function DriverCard({
  driver,
  onDelete,
  onView,
  viewMode = "grid",
}: DriverCardProps) {
  const getStatusStyles = (status: Driver["status"]) => {
    switch (status) {
      case "On Trip":
        return "bg-blue-50 text-blue-600";
      case "Available":
        return "bg-green-50 text-green-600";
      case "Offline":
        return "bg-gray-100 text-gray-500";
      case "Reject":
        return "bg-red-50 text-red-600";
      case "Accept":
        return "bg-blue-50 text-blue-600";
      case "Pending":
        return "bg-yellow-50 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const Avatar = ({ size }: { size: "sm" | "lg" }) => {
    const dims = size === "sm" ? "w-12 h-12 text-lg" : "w-12 h-12 text-lg";
    return driver.profilePic ? (
      <img
        src={driver.profilePic}
        alt={driver.name}
        className={clsx(dims, "rounded-full object-cover")}
      />
    ) : (
      <div
        className={clsx(
          dims,
          "rounded-full bg-[#d08726] text-white flex items-center justify-center font-bold",
        )}
      >
        {getInitials(driver.name)}
      </div>
    );
  };

  if (viewMode === "list") {
    return (
      <div className='bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center justify-between gap-4 transition-shadow hover:shadow-md'>
        <div className='flex items-center gap-4 w-1/4'>
          <div className='relative shrink-0'>
            <Avatar size='sm' />
            {driver.status !== "Offline" && (
              <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></div>
            )}
          </div>
          <div>
            <h3 className='font-semibold text-gray-900'>{driver.name}</h3>
            <div className='flex items-center text-xs text-gray-500 mt-0.5'>
              <Star className='w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1' />
              <span className='font-medium text-gray-700 mr-1'>
                {driver.rating}
              </span>
              <span>({driver.totalTrips} reviews)</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-1 w-1/4'>
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-gray-500 text-xs w-24'>Experience</span>
            <span className='font-semibold text-gray-900'>
              {driver.yearOfExperience} yr
            </span>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-gray-500 text-xs w-24'>Vehicle</span>
            <span className='font-semibold text-gray-900 truncate'>
              {driver.vehicleType || "N/A"}
            </span>
          </div>
        </div>

        <div className='w-1/4'>
          {driver.location ? (
            <div className='flex items-center text-xs text-gray-500 truncate'>
              <MapPin className='w-3 h-3 text-blue-500 mr-1 shrink-0' />
              <span className='truncate'>{driver.location}</span>
            </div>
          ) : (
            <div className='flex items-center text-xs text-gray-400 truncate'>
              <Mail className='w-3 h-3 mr-1 shrink-0' />
              <span className='truncate'>{driver.email}</span>
            </div>
          )}
        </div>

        <div className='flex items-center gap-4 w-1/4 justify-end'>
          <div
            className={clsx(
              "px-2.5 py-1 rounded-full text-xs font-medium",
              getStatusStyles(driver.status),
            )}
          >
            {driver.status}
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={onDelete}
              className='p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors'
            >
              <Trash2 className='w-4 h-4' />
            </button>

            <button
              onClick={onView}
              className='p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors'
            >
              <Eye className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col gap-4 transition-shadow hover:shadow-md'>
      {/* Header */}
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <Avatar size='lg' />
            {driver.status !== "Offline" && (
              <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></div>
            )}
          </div>
          <div>
            <h3 className='font-semibold text-gray-900'>{driver.name}</h3>
            <div className='flex items-center text-xs text-gray-500 mt-0.5'>
              <Star className='w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1' />
              <span className='font-medium text-gray-700 mr-1'>
                {driver.rating}
              </span>
              <span>({driver.totalTrips} reviews)</span>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "px-2.5 py-1 rounded-full text-xs font-medium",
            getStatusStyles(driver.status),
          )}
        >
          {driver.status}
        </div>
      </div>

      {/* Stats Block */}
      <div className='bg-[#FAF9F6] rounded-lg p-3 flex flex-col gap-2'>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-gray-500 text-xs'>Experience</span>
          <span className='font-bold text-gray-900'>
            {driver.yearOfExperience} yr
          </span>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-gray-500 text-xs'>Vehicle Type</span>
          <span className='font-semibold text-gray-900 truncate'>
            {driver.vehicleType || "N/A"}
          </span>
        </div>
      </div>

      {/* Location / contact */}
      <div className='min-h-12'>
        {driver.location ? (
          <div className='flex flex-col gap-1'>
            <span className='text-xs text-blue-600 font-medium'>Location</span>
            <div className='flex items-center text-xs text-gray-500 truncate'>
              <MapPin className='w-3 h-3 text-blue-500 mr-1 shrink-0' />
              <span className='truncate'>{driver.location}</span>
            </div>
          </div>
        ) : (
          <div className='text-xs text-gray-400 italic flex items-center h-full'>
            No location on file
          </div>
        )}
      </div>

      {/* Actions */}
      <div className='flex items-center justify-between mt-auto pt-4 border-t border-gray-50'>
        <button
          onClick={onDelete}
          className='flex-1 flex justify-center items-center py-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors'
        >
          <Trash2 className='w-4 h-4' />
        </button>
        <div className='w-px h-6 bg-gray-200'></div>
        <button
          onClick={onView}
          className='flex-1 flex justify-center items-center py-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors'
        >
          <Eye className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
}
