/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthFormCard from "@/components/auth/AuthFormCard";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import GoBack from "@/components/ui/GoBack";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_or_phone: email,
            password: password,
          }),
        },
      );

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result?.message || "Invalid email or password");
      }

      const { access, refresh, user } = result.data;

      // Persist tokens
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // Update redux store
      dispatch(setUser({ user, access, refresh }));

      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormCard title='Log In'>
      <form className='space-y-5 w-full flex flex-col' onSubmit={handleSubmit}>
        <GoBack />
        {error && (
          <div className='text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2'>
            {error}
          </div>
        )}

        <div className='space-y-2'>
          <label className='text-xs font-semibold text-gray-500'>Email</label>
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
        </div>

        <div className='space-y-2'>
          <label className='text-xs font-semibold text-gray-500'>
            Password
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
                <rect width='18' height='11' x='3' y='11' rx='2' ry='2' />
                <path d='M7 11V7a5 5 0 0 1 10 0v4' />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full pl-11 pr-11 py-3.5 bg-gray-50/80 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-gray-400 shadow-sm'
              placeholder='Enter your password'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors'
            >
              {showPassword ? (
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
                  <path d='M9.88 9.88a3 3 0 1 0 4.24 4.24' />
                  <path d='M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68' />
                  <path d='M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61' />
                  <line x1='2' x2='22' y1='2' y2='22' />
                </svg>
              ) : (
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
                  <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
                  <circle cx='12' cy='12' r='3' />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className='flex justify-end pt-1'>
          <Link
            href='/forgot-password'
            className='text-xs font-medium text-red-400 hover:text-red-500 transition-colors'
          >
            Forgot Password?
          </Link>
        </div>

        <div className='pt-2'>
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-[#fdf8f3] text-brand font-semibold py-3.5 rounded-xl hover:bg-amber-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </div>
      </form>
    </AuthFormCard>
  );
}

// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import AuthFormCard from "@/components/auth/AuthFormCard";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <AuthFormCard title="Log In">
//       <form className="space-y-5 w-full flex flex-col" onSubmit={(e) => e.preventDefault()}>
//         <div className="space-y-2">
//           <label className="text-xs font-semibold text-gray-500">Email</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
//             </div>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full pl-11 pr-4 py-3.5 bg-gray-50/80 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-gray-400 shadow-sm"
//               placeholder="Enter email address"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <label className="text-xs font-semibold text-gray-500">Password</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full pl-11 pr-11 py-3.5 bg-gray-50/80 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-gray-400 shadow-sm"
//               placeholder="Enter your password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               {showPassword ? (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
//               )}
//             </button>
//           </div>
//         </div>

//         <div className="flex justify-end pt-1">
//           <Link href="/forgot-password" className="text-xs font-medium text-red-400 hover:text-red-500 transition-colors">
//             Forgot Password?
//           </Link>
//         </div>

//         <div className="pt-2">
//           <button
//             type="submit"
//             className="w-full bg-[#fdf8f3] text-brand font-semibold py-3.5 rounded-xl hover:bg-amber-100 transition-colors"
//           >
//             Log In
//           </button>
//         </div>
//       </form>
//     </AuthFormCard>
//   );
// }
