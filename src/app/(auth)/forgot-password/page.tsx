/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from "next/link";
import AuthFormCard from "@/components/auth/AuthFormCard";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/features/auth/authAPI";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const result = await forgotPasswordMutation({
        email: email,
      }).unwrap();

      if (!result?.success) {
        throw new Error(result?.message || "Failed to send code");
      }

      router.push(`/verify-code?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(
        err?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <AuthFormCard
      title='Forgot Password'
      subtitle='No worries, you can recover your password'
      // backHref='/login'
    >
      <form className='space-y-6 w-full flex flex-col' onSubmit={handleSubmit}>
        {error && (
          <div className='text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2'>
            {error}
          </div>
        )}

        <div className='space-y-3'>
          <label className='text-xs font-semibold text-gray-500 mb-20!'>
            Email
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <rect width='20' height='16' x='2' y='4' rx='2' />
                <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
              </svg>
            </div>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full pl-11 pr-4 py-3.5 bg-gray-50/80 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-gray-400 shadow-sm'
              placeholder='Enter email address'
            />
          </div>
          <p className='text-[11px] text-gray-500 pt-1 leading-relaxed'>
            Enter your registered email or phone. You will receive a 6 digit
            code to create new password.
          </p>
        </div>

        <div className='pt-2'>
          <button
            type='submit'
            disabled={isLoading}
            className='w-full bg-brand text-white font-semibold py-3.5 rounded-xl hover:bg-brand-hover transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {isLoading ? "Sending..." : "Send Code"}
          </button>
        </div>

        <div className='text-center mt-6'>
          <p className='text-xs text-gray-400'>
            Remember Password{" "}
            <Link
              href='/login'
              className='text-brand font-medium hover:text-brand-hover transition-colors'
            >
              Back to Login
            </Link>
          </p>
        </div>
      </form>
    </AuthFormCard>
  );
}
