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
  title: "About Us",
  description:
    "Learn about Bangladesh Specialized Hospital's mission, clinical departments, and commitment to patient-first healthcare in Bangladesh.",
};

const PILLARS = [
  {
    title: "210+ Verified Specialists",
    description:
      "Every physician on our panel is BMDC-verified and vetted across 34+ medical and surgical specialties.",
    icon: Stethoscope,
  },
  {
    title: "24/7 Emergency & Critical Care",
    description:
      "Round-the-clock trauma, cardiac emergency, ICU, NICU, and diagnostic support ready whenever you need us.",
    icon: Clock,
  },
  {
    title: "Patient-Centered Compassion",
    description:
      "Transparent consultation fees in BDT, digital prescriptions, and guided care from first symptom to recovery.",
    icon: HeartHandshake,
  },
  {
    title: "Modern Clinical Standards",
    description:
      "Combining international medical protocols with AI-assisted specialist triage to connect patients faster.",
    icon: Award,
  },
];

export default function AboutUsPage() {
  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="border-b bg-gradient-to-r from-slate-900 via-slate-900 to-primary/90 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-300">
              <ShieldCheck className="size-4" />
              About Bangladesh Specialized Hospital
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Advancing Specialized Healthcare Across Bangladesh
            </h1>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              Bangladesh Specialized Hospital is a multi-disciplinary tertiary
              care center in Dhaka committed to bringing world-class
              diagnostics, experienced consultants, and seamless digital care to
              every patient.
            </p>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl border bg-slate-50/50 p-6"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission & Location */}
      <section className="border-t bg-slate-50/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-wider text-primary uppercase">
              Our Mission
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Making Specialized Medical Care Accessible, Fast, and Transparent
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Finding the right specialist should never be stressful. By pairing
              leading Bangladeshi consultants with intelligent symptom guidance
              and instant online scheduling, we empower patients and families to
              get the right care at the right time.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                render={<Link href="/doctors">Find a Specialist</Link>}
                nativeButton={false}
              >
                Find a Specialist
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white"
                render={<Link href="/apply">Join Our Medical Panel</Link>}
                nativeButton={false}
              >
                Join Our Medical Panel
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Visit Bangladesh Specialized Hospital
                </h3>
                <p className="text-xs text-slate-500">
                  Dhaka Main Campus &amp; Digital Consultation Hub
                </p>
              </div>
            </div>
            <div className="space-y-3 border-t pt-4 text-sm text-slate-600">
              <p className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-primary" />
                21 Shyamoli, Mirpur Road, Dhaka-1207, Bangladesh
              </p>
              <p className="flex items-center gap-2.5">
                <PhoneCall className="size-4 shrink-0 text-emerald-600" />
                24/7 Emergency &amp; Appointment Hotline: 10633
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-primary" />
                Emergency, Trauma &amp; Diagnostics Open 24 Hours / 7 Days
              </p>
            </div>
          </div>
        </div>
      </section>

      <ChatWidget />
    </div>
  );
}
