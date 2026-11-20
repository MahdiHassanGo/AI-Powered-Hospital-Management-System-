import type { Metadata } from "next";
import { Suspense } from "react";
import ChatWidget from "@/components/modules/chat/chat-widget";
import PublicDoctorList, {
  PublicDoctorListLoading,
} from "@/components/modules/doctors/doctor-list";

export const metadata: Metadata = {
  title: "Specialist Consultant Directory",
  description:
    "Consult 200+ BMDC-verified specialist physicians across 34 clinical departments at Bangladesh Specialized Hospital, Dhaka.",
};

export default function DoctorsPage() {
  return (
    <div className="bg-white text-black min-h-screen pb-24">
      {/* Directory Header Banner */}
      <div className="border-b border-black">
        <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-black/60 mb-4">
            BMDC Verified Medical Panel &bull; 210+ Consultants
          </p>
          <h1 className="font-serif text-[clamp(44px,7vw,96px)] font-bold tracking-[-0.02em] leading-none text-black">
            Consultant Directory
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/60">
            Search verified senior physicians across 34 clinical specialties.
            Review credentials, degrees, and published chamber consultation
            slots.
          </p>
        </div>
      </div>

      {/* Main Directory Table / Grid */}
      <section className="mx-auto max-w-[1280px] px-6 pt-12 sm:px-12 lg:px-16">
        <Suspense fallback={<PublicDoctorListLoading />}>
          <PublicDoctorList />
        </Suspense>
      </section>

      <ChatWidget />
    </div>
  );
}
