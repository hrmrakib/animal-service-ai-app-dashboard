"use client";
import { useState } from "react";
import Link from "next/link";
import AuthFormCard from "@/components/auth/AuthFormCard";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/verify-code");
  };

  return (
    <AuthFormCard title="Forgot Password" subtitle="No worries, you can recover your password" backHref="/login">
      <form className="space-y-6 w-full flex flex-col" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50/80 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-gray-400 shadow-sm"
              placeholder="Enter email address"
            />
          </div>
          <p className="text-[11px] text-gray-500 pt-1 leading-relaxed">
            Enter your registered email or phone. You will receive a 6 digit code to create new password.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-brand text-white font-semibold py-3.5 rounded-xl hover:bg-brand-hover transition-colors shadow-sm"
          >
            Send Code
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">
            Remember Password{" "}
            <Link href="/login" className="text-brand font-medium hover:text-brand-hover transition-colors">
              Back to Login
            </Link>
          </p>
        </div>
      </form>
    </AuthFormCard>
  );
}
