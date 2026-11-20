import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import Providers from "@/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-serif",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bangladesh Specialized Hospital — Center of Medical Excellence",
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
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        merriweather.variable,
        "font-sans",
      )}
    >
      <Providers>
        <body className="min-h-full flex flex-col bg-[#FAFBFB] text-slate-900">
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
