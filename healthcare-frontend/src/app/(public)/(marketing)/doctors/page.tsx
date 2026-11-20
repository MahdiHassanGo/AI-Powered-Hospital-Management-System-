import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import ChatWidget from "@/components/modules/chat/chat-widget";
import PublicDoctorList, {
  PublicDoctorListLoading,
} from "@/components/modules/doctors/doctor-list";

export const metadata: Metadata = {
  title: "Specialist Doctors Directory",
  description:
    "Consult 200+ BMDC-verified specialist physicians across 34 clinical departments at Bangladesh Specialized Hospital, Dhaka.",
};

export default function DoctorsPage() {
  return (
    <div className="bg-slate-50/50 pb-16">
      {/* Directory Header Banner */}
      <div className="border-b border-[#0f2c4d] bg-[#071c33] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:py-12">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="size-3.5" />
            BMDC-Verified Clinical Registry &bull; 210+ Consultants
          </div>
          <h1 className="font-serif mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Specialist Consultant Directory
          </h1>
          <p className="mt-1.5 max-w-2xl text-xs text-slate-300 sm:text-sm">
            Search verified senior physicians across 34 clinical specialties at
            Bangladesh Specialized Hospital. Review BMDC credentials, degree
            qualifications, and published consultation chamber slots.
          </p>
        </div>
      </div>

      {/* Main Directory Table / Grid */}
      <section className="mx-auto max-w-7xl px-4 pt-6">
        <Suspense fallback={<PublicDoctorListLoading />}>
          <PublicDoctorList />
        </Suspense>
      </section>

      <ChatWidget />
    </div>
  );
}
