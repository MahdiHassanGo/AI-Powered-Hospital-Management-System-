import type { Metadata } from "next";
import { Fraunces, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import Providers from "@/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bangladesh Specialized Hospital — Precision in Care",
    template: "%s | Bangladesh Specialized Hospital",
  },
  description:
    "Bangladesh Specialized Hospital is a premier tertiary medical center in Shyamoli, Dhaka, offering 24/7 trauma & emergency care, 210+ BMDC-verified specialist doctors across 34 departments, and online appointment booking.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        fraunces.variable,
        geistMono.variable,
        "font-sans",
      )}
    >
      <Providers>
        <body className="min-h-full flex flex-col bg-[#FFFFFF] text-[#000000]">
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
