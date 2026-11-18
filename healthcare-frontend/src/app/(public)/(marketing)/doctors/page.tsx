import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import ChatWidget from "@/components/modules/chat/chat-widget";
import PublicDoctorList, {
  PublicDoctorListLoading,
} from "@/components/modules/doctors/doctor-list";

export const metadata: Metadata = {
  title: "Find a Doctor",
  description:
    "Browse 200+ BMDC-verified specialist doctors at Bangladesh Specialized Hospital by department, experience, and consultation fee.",
};

export default function DoctorsPage() {
  return (
    <div className="bg-slate-50/50 pb-16">
      {/* Page Banner */}
      <div className="border-b bg-gradient-to-r from-slate-900 via-slate-900 to-primary/90 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-sky-300">
            <ShieldCheck className="size-3.5" />
            Bangladesh Specialized Hospital Directory
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Our Specialist Doctors
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
            Search verified BMDC-certified consultants across 34+ clinical
            departments, compare consultation fees, and book appointments
            online.
          </p>
        </div>
      </div>

      {/* Main Directory */}
      <section className="mx-auto max-w-7xl px-4 pt-8">
        <Suspense fallback={<PublicDoctorListLoading />}>
          <PublicDoctorList />
        </Suspense>
      </section>

      <ChatWidget />
    </div>
  );
}
