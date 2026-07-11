"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfileInfoPage() {
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  return (
    <div className='w-full max-w-2xl'>
      <h2 className='text-lg font-semibold text-gray-900 mb-6 border-b pb-4'>
        Profile Information
      </h2>

      <div className='space-y-6'>
        {/* Profile Picture */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Profile Picture
          </label>
          <div className='flex flex-col items-center justify-center p-6 border rounded-xl border-gray-200'>
            <div className='relative w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-4 border-pink-100'>
              <Image
                src='/images/logo.png' // Fallback placeholder
                alt='Profile'
                fill
                className='object-cover'
                onError={(e) => {
                  // Fallback if image not found
                  (e.target as HTMLImageElement).src =
                    "https://ui-avatars.com/api/?name=User&background=f472b6&color=fff";
                }}
              />
            </div>
            <button className='flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors'>
              <Upload className='w-4 h-4' />
              <span>Upload Image</span>
            </button>
          </div>
        </div>

        {/* Name Input */}
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Mr. John'
            className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all'
          />
        </div>

        {/* Save Button */}
        <div className='pt-4'>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className='w-full px-4 py-3 bg-[#d08726] hover:bg-[#b8751d] text-white font-medium rounded-xl transition-colors disabled:opacity-70'
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
