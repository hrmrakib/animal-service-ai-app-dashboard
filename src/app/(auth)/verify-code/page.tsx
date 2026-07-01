"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthFormCard from "@/components/auth/AuthFormCard";
import OtpInput from "@/components/auth/OtpInput";

export default function VerifyCodePage() {
  const router = useRouter();

  const handleComplete = (otp: string) => {
    console.log("OTP Complete:", otp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/reset-password");
  };

  return (
    <AuthFormCard
      title='Verify Code'
      subtitle="We've sent a verification code to <span class='text-brand font-medium'>john@comp***.com</span>"
      backHref='/forgot-password'
    >
      <form
        className='space-y-6 w-full flex flex-col mt-2'
        onSubmit={handleSubmit}
      >
        <div className='space-y-3'>
          <label className='text-xs font-semibold text-gray-600'>
            Enter OTP
          </label>
          <div className='flex justify-center w-full'>
            <OtpInput onComplete={handleComplete} />
          </div>
          <div className='flex justify-end pt-2'>
            <p className='text-[11px] text-gray-400'>
              Didn&apos;t get the code?{" "}
              <button
                type='button'
                className='text-brand font-medium hover:text-brand-hover transition-colors'
              >
                Resent Code
              </button>
            </p>
          </div>
        </div>

        <div className='pt-2'>
          <button
            type='submit'
            className='w-full bg-brand text-white font-semibold py-3.5 rounded-xl hover:bg-brand-hover transition-colors shadow-sm'
          >
            Verify Code
          </button>
        </div>

        <div className='text-center mt-4'>
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
