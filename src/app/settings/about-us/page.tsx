"use client";

import { useState } from "react";
import { Edit3, FilePlus } from "lucide-react";
import toast from "react-hot-toast";

export default function AboutUsPage() {
  const [content, setContent] = useState(
    "By using our platform, you agree to comply with our terms and policies designed to ensure a safe and reliable experience for all users. We respect your privacy and are committed to protecting your personal information. Any data collected through our platform is used only to improve our services and provide a better user experience. Users are expected to use the platform responsibly and avoid any activities that may harm the system or other users. We reserve the right to update these terms and policies when necessary to maintain service quality and compliance with applicable regulations."
  ); // Pre-filled with same text for now as per design placeholder, but ideally this is "About Us" content
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("About Us updated successfully!");
    }, 1000);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4">
        About Us
      </h2>

      <div className="flex-1 flex flex-col space-y-4">
        <div className="relative flex-1 min-h-[300px] border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-brand focus-within:border-transparent transition-all">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full p-4 resize-none outline-none text-gray-600 text-sm leading-relaxed"
            placeholder="Enter About Us content here..."
          />
          
          <div className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
            <Edit3 className="w-5 h-5" />
          </div>
          
          <div className="absolute bottom-4 right-4">
            <button className="p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700">
              <FilePlus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full md:w-auto md:min-w-[300px] mx-auto block px-4 py-3 bg-[#d08726] hover:bg-[#b8751d] text-white font-medium rounded-xl transition-colors disabled:opacity-70"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
