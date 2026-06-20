import Image from "next/image";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";

interface AuthFormCardProps {
  title?: string;
  subtitle?: string;
  backHref?: string;
  children: React.ReactNode;
}

export default function AuthFormCard({ title, subtitle, backHref, children }: AuthFormCardProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 flex flex-col min-h-[100dvh] sm:min-h-0 sm:h-auto border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        {backHref ? (
          <Link href={backHref} className="text-brand hover:text-brand-hover transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
        ) : (
          <div className="w-6 h-6" /> // spacer
        )}
        <LanguageToggle />
      </div>

      <div className="flex flex-col items-center mb-8">
        <Image
          src="/images/logo.png"
          alt="Rifqa Veterinary Logo"
          width={80}
          height={80}
          className="mb-6 drop-shadow-md"
        />
        {title && <h1 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h1>}
        {subtitle && (
          <p className="text-sm text-gray-500 text-center px-4" dangerouslySetInnerHTML={{ __html: subtitle }} />
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
