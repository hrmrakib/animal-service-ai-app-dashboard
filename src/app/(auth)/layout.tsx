import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] bg-gray-50/30">
      {/* Left Panel - Hidden on mobile */}
      <div className="hidden lg:flex w-1/2 relative bg-[#cf8726] overflow-hidden justify-center items-center">
        {/* Background Image with golden tint */}
        <div className="absolute inset-0 z-0 mix-blend-overlay opacity-60">
          <Image
            src="/images/auth-bg.png"
            alt="Veterinary Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand/80 to-transparent z-0 mix-blend-multiply opacity-50" />
        
        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center p-12 text-white">
          <div className="flex flex-col items-center max-w-[420px] text-center">
            <Image
              src="/images/logo.png"
              alt="Rifqa Veterinary"
              width={160}
              height={160}
              className="mb-8 drop-shadow-2xl"
              priority
            />
            <h1 className="text-4xl font-bold mb-6 drop-shadow-md">Rifqa Veterinary</h1>
            <h2 className="text-xl font-medium mb-8 leading-relaxed text-white/95">
              Welcome to Rifqa Veterinary Platform, your comprehensive world of veterinary care.
            </h2>
            <p className="text-sm leading-relaxed text-white/80 font-normal">
              We are delighted to have you join our community, which brings together all animal lovers and owners, from pet owners to livestock and thoroughbred horse breeders. At Rifqa, we understand that every animal, big or small, deserves the best possible care.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        {children}
      </div>
    </div>
  );
}
