"use client";

import {
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  CreditCard,
  MessageSquare,
  PhoneCall,
  Search,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const POPULAR_SPECIALTIES = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Gynecology",
];

export default function Hero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) {
      router.push(`/doctors?searchTerm=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/doctors");
    }
  };

  const openChatAssistant = () => {
    window.dispatchEvent(new Event("open-healthcare-chat"));
  };

  return (
    <section className="border-b border-slate-200 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Left Column: Clinical Title, Search & Directory Discovery */}
          <div className="space-y-5 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-xs">
              <ShieldCheck className="size-4 text-emerald-600" />
              <span>
                Bangladesh Medical &amp; Dental Council Verified Panel
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Specialized clinical care, coordinated for you.
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Consult with 200+ BMDC-registered physicians across 34 medical
              departments at Bangladesh Specialized Hospital, Shyamoli. Search
              verified schedules, check consultation fees, or triage symptoms
              with our clinical assistant.
            </p>

            {/* Structured Search Box */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col gap-2 rounded-xl border border-slate-300 bg-white p-2 shadow-xs sm:flex-row sm:items-center"
            >
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Doctor name, qualification, or department (e.g. Cardiology)..."
                  className="h-10 border-0 bg-transparent pl-9 text-sm shadow-none focus-visible:ring-0"
                />
              </div>
              <Button
                type="submit"
                size="default"
                className="h-10 px-5 font-medium"
              >
                Search Directory
                <ArrowRight className="size-4" />
              </Button>
            </form>

            {/* Quick Specialty Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-medium text-slate-500">
                Specialties:
              </span>
              {POPULAR_SPECIALTIES.map((specialty) => (
                <Link
                  key={specialty}
                  href={`/doctors?specialization=${encodeURIComponent(specialty)}`}
                  className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
                >
                  {specialty}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                render={<Link href="/doctors">View Specialist Directory</Link>}
                nativeButton={false}
              >
                View Specialist Directory
              </Button>
              <Button
                variant="outline"
                className="bg-white"
                onClick={openChatAssistant}
              >
                <MessageSquare className="size-4 text-slate-600" />
                Symptom Triage Assistant
              </Button>
            </div>
          </div>

          {/* Right Column: Hospital Facility & Verification Badge Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              {/* Emergency Department Notice */}
              <div className="flex items-center justify-between rounded-xl bg-slate-900 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    <PhoneCall className="size-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-300">
                      Emergency &amp; Trauma Care (24 Hours)
                    </p>
                    <p className="font-mono text-base font-bold tracking-wide">
                      Hotline: 10633
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-300">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  Open Now
                </span>
              </div>

              {/* 2x2 Clean Clinical Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <Stethoscope className="size-4 text-slate-600" />
                  <p className="mt-2 font-mono text-xl font-bold tabular-nums text-slate-900">
                    210+
                  </p>
                  <p className="text-xs text-slate-600">BMDC Specialists</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <Building2 className="size-4 text-slate-600" />
                  <p className="mt-2 font-mono text-xl font-bold tabular-nums text-slate-900">
                    34
                  </p>
                  <p className="text-xs text-slate-600">Clinical Departments</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <CalendarCheck className="size-4 text-slate-600" />
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    Live Slots
                  </p>
                  <p className="text-xs text-slate-600">Same-day scheduling</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <CreditCard className="size-4 text-slate-600" />
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    bKash Direct
                  </p>
                  <p className="text-xs text-slate-600">Instant confirmation</p>
                </div>
              </div>

              {/* Clinical Triage Callout */}
              <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                <div className="flex items-start gap-2.5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-white">
                    <MessageSquare className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      Unsure which specialist to book?
                    </p>
                    <p className="text-xs text-slate-600">
                      Describe symptoms for hospital department recommendations.
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={openChatAssistant}
                  className="bg-white"
                >
                  Triage
                </Button>
              </div>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <CheckCircle2 className="size-3.5 text-emerald-600" />
                <span>Accredited Tertiary Hospital &bull; Shyamoli, Dhaka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
