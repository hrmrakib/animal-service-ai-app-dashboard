"use client";
import { useState } from "react";

export default function LanguageToggle() {
  const [lang, setLang] = useState<"AR" | "EN">("EN");

  return (
    <div className="flex items-center p-0.5 rounded-md border border-gray-200 text-xs font-semibold w-fit">
      <button
        onClick={() => setLang("AR")}
        className={`px-2 py-1 rounded transition-colors ${
          lang === "AR" ? "text-brand" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        AR
      </button>
      <button
        onClick={() => setLang("EN")}
        className={`px-2 py-1 rounded transition-colors ${
          lang === "EN" ? "text-brand" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        EN
      </button>
    </div>
  );
}
