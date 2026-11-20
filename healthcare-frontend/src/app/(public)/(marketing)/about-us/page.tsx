import {
  Award,
  Building2,
  Clock,
  HeartHandshake,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import ChatWidget from "@/components/modules/chat/chat-widget";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About the Hospital",
  description:
    "Bangladesh Specialized Hospital is a tertiary healthcare center in Shyamoli, Dhaka, with BMDC-verified specialist departments and 24/7 emergency care.",
};

const PILLARS = [
  {
    title: "210+ Verified Specialists",
    description:
      "All medical panel consultants are registered with the Bangladesh Medical and Dental Council (BMDC) across 34 clinical disciplines.",
    icon: Stethoscope,
  },
  {
    title: "24/7 Trauma & Critical Care",
    description:
      "Continuous trauma resuscitation, surgical emergencies, ICU, CCU, NICU, and round-the-clock laboratory diagnostics.",
    icon: Clock,
  },
  {
    title: "Transparent Consultation Billing",
    description:
      "Clear consultation fees in BDT, instant online appointment reservations via bKash, and digital documentation.",
    icon: HeartHandshake,
  },
  {
    title: "Clinical Standards",
    description:
      "Standardized multi-disciplinary clinical pathways and guided symptom triage connecting patients to qualified consultants.",
    icon: Award,
  },
];

export default function AboutUsPage() {
  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="border-b border-[#0f2c4d] bg-[#071c33] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="size-3.5" />
              Bangladesh Specialized Hospital &bull; Shyamoli, Mirpur Road,
              Dhaka
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Tertiary Clinical Excellence &amp; Patient-First Medicine
            </h1>
            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
              Established as Dhaka&apos;s center of clinical excellence,
              Bangladesh Specialized Hospital delivers integrated
              multi-disciplinary care across 34 specialties, 10+ modular
              operation theaters, and round-the-clock emergency trauma support.
            </p>
          </div>
        </div>
      </section>

      {/* Core Clinical Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 shadow-xs"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-800">
                  <Icon className="size-5" />
                </div>
                <h2 className="mt-3 text-base font-semibold text-slate-900">
                  {pillar.title}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Hospital Campus & Contact */}
      <section className="border-t border-slate-200 bg-slate-50/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Hospital Mission
            </p>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Accessible, Evidence-Based Tertiary Healthcare in Dhaka
            </h2>
            <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
              We connect patients across Bangladesh with leading consultants,
              providing transparent consultation scheduling, rapid emergency
              response, and compassionate clinical care.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <Button
                size="sm"
                render={<Link href="/doctors">Consultant Directory</Link>}
                nativeButton={false}
              >
                Consultant Directory
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-white"
                render={<Link href="/apply">Physician Application</Link>}
                nativeButton={false}
              >
                Physician Application
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-800">
                <Building2 className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Hospital Campus &amp; Hotline
                </h3>
                <p className="text-xs text-slate-500">
                  Shyamoli Main Campus &bull; Emergency 24/7
                </p>
              </div>
            </div>
            <div className="space-y-2.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
              <p className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-slate-400" />
                21 Shyamoli, Mirpur Road, Dhaka-1207, Bangladesh
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="size-4 shrink-0 text-emerald-600" />
                <span className="font-semibold text-slate-900">
                  Hotline: 10633 (Emergency &amp; Appointment Desk)
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="size-4 shrink-0 text-slate-400" />
                ICU, CCU, Emergency &amp; Trauma Care Operational 24 Hours
              </p>
            </div>
          </div>
        </div>
      </section>

      <ChatWidget />
    </div>
  );
}
