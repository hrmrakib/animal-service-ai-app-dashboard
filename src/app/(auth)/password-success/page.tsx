"use client";
import Link from "next/link";
import AuthFormCard from "@/components/auth/AuthFormCard";

export default function PasswordSuccessPage() {
  return (
    <AuthFormCard backHref="/reset-password">
      <div className="flex flex-col items-center justify-center text-center -mt-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Password Successfully<br />Updated
        </h2>
        
        <p className="text-sm text-gray-500 leading-relaxed mb-10 max-w-[280px]">
          Your password has been changed successfully. You can now login with your new password.
        </p>

        <Link
          href="/login"
          className="w-full block bg-brand text-white font-semibold py-3.5 rounded-xl hover:bg-brand-hover transition-colors shadow-sm"
        >
          Back to Log In
        </Link>
      </div>
    </AuthFormCard>
  );
}
