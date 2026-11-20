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
      <div className="border-b border-slate-800 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:py-10">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <ShieldCheck className="size-3.5" />
            BMDC-Verified Clinical Registry
          </div>
          <h1 className="mt-2.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Specialist Directory
          </h1>
          <p className="mt-1 max-w-2xl text-xs text-slate-300 sm:text-sm">
            Find consultants by clinical specialty, BMDC license, and years of
            practice. View published consultation hours and book appointments
            online.
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
