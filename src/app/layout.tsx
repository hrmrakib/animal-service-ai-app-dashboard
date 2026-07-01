import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/ToastProvider";
import Providers from "@/redux/features/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rifqa Veterinary Platform",
  description: "Comprehensive world of veterinary care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${inter.variable} h-full antialiased`}>
      <body className='h-full m-0 p-0 overflow-hidden'>
        <Providers>
          {children}
          <ToastProvider />
        </Providers>
      </body>
    </html>
  );
}
