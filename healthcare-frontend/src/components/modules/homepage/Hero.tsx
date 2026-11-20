"use client";

import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  HeartPulse,
  PhoneCall,
  Search,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PRIMARY_DEPARTMENTS = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Gastroenterology",
  "Pediatrics",
  "Gynecology",
  "Nephrology",
  "Internal Medicine",
];

export default function Hero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchTerm.trim()) query.set("searchTerm", searchTerm.trim());
    if (selectedSpecialty) query.set("specialization", selectedSpecialty);
    router.push(`/doctors?${query.toString()}`);
  };

  const openChatAssistant = () => {
    window.dispatchEvent(new Event("open-healthcare-chat"));
  };

  return (
    <section className="relative overflow-hidden bg-[#071c33] text-white">
      {/* Background Clinical Visual Layer with High Contrast Medical Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Image
          src="/login.jpg"
          alt="Bangladesh Specialized Hospital Clinical Faculty"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071c33] via-[#071c33]/90 to-[#071c33]/70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 lg:py-20">
        <div className="max-w-4xl space-y-6">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-200">
            <ShieldCheck className="size-4 text-emerald-400" />
            <span>
              BMDC Verified Specialists &bull; Tertiary Multi-Disciplinary
              Hospital
            </span>
          </div>

          {/* Grand Institutional Serif Headline */}
          <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[3.25rem] lg:leading-[1.12]">
            Excellence in Tertiary Medicine, Advanced Surgery &amp; Critical
            Care
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Bangladesh Specialized Hospital is Dhaka&apos;s leading center of
            clinical excellence. Providing 24-hour emergency trauma
            resuscitation, 10+ modular laminar operation theaters, and direct
            appointment booking with 210+ verified consultants across 34
            specialized departments.
          </p>
        </div>

        {/* Integrated Clinical Action Deck (Patient Booking Console) */}
        <div className="mt-8 rounded-xl border border-slate-700 bg-white p-5 text-slate-900 shadow-2xl lg:p-6">
          <div className="border-b border-slate-200 pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-serif text-base font-bold text-slate-900 sm:text-lg">
                Patient Consultation &amp; Specialist Scheduling Desk
              </span>
              <span className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                <span className="size-2 rounded-full bg-emerald-600" />
                Live Chamber Schedules &bull; Instant bKash Reservation
              </span>
            </div>
          </div>

          {/* Consultation Search Console */}
          <form
            onSubmit={handleSearch}
            className="mt-4 grid gap-3 sm:grid-cols-12 sm:items-center"
          >
            {/* Doctor Name Search */}
            <div className="relative sm:col-span-5">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Doctor name, degree, or condition (e.g. Angiogram, Knee Pain)..."
                className="h-11 rounded-md border-slate-300 pl-9 text-xs sm:text-sm"
              />
            </div>

            {/* Department Selection */}
            <div className="relative sm:col-span-4">
              <Stethoscope className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <select
                aria-label="Filter by department"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="h-11 w-full rounded-md border border-slate-300 bg-white pr-3 pl-9 text-xs sm:text-sm text-slate-800 outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
              >
                <option value="">All 34 Clinical Departments</option>
                {PRIMARY_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Action */}
            <div className="sm:col-span-3">
              <Button
                type="submit"
                className="h-11 w-full rounded-md bg-[#0A2647] font-semibold text-white hover:bg-[#071c33]"
              >
                Find Specialist
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </form>

          {/* Quick Filter Specialty Row */}
          <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3 text-xs">
            <span className="font-semibold text-slate-500">
              Popular Chambers:
            </span>
            {PRIMARY_DEPARTMENTS.slice(0, 6).map((dept) => (
              <Link
                key={dept}
                href={`/doctors?specialization=${encodeURIComponent(dept)}`}
                className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900"
              >
                {dept}
              </Link>
            ))}
            <button
              type="button"
              onClick={openChatAssistant}
              className="ml-auto inline-flex items-center gap-1.5 font-medium text-teal-700 underline underline-offset-2 hover:text-teal-900"
            >
              Unsure which specialty? Triage your symptoms &rarr;
            </button>
          </div>
        </div>

        {/* 4-Column Clinical Services Deck */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-slate-700 bg-slate-900/90 p-4">
            <div className="flex items-center gap-2.5 text-emerald-400">
              <PhoneCall className="size-5" />
              <span className="font-mono text-sm font-bold">
                Hotline: 10633
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold text-white">
              24/7 Trauma &amp; Emergency
            </p>
            <p className="mt-1 text-[11px] text-slate-300">
              Resuscitation bay, cardiac life support ambulance, and on-duty
              emergency physicians.
            </p>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-900/90 p-4">
            <div className="flex items-center gap-2.5 text-sky-400">
              <Stethoscope className="size-5" />
              <span className="font-mono text-sm font-bold">
                210+ Consultants
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold text-white">
              Senior Specialist Faculty
            </p>
            <p className="mt-1 text-[11px] text-slate-300">
              National professors and fellows with verified BMDC credentials
              across 34 disciplines.
            </p>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-900/90 p-4">
            <div className="flex items-center gap-2.5 text-teal-400">
              <HeartPulse className="size-5" />
              <span className="font-mono text-sm font-bold">
                Modern CCU &amp; ICU
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold text-white">
              Critical Care Complex
            </p>
            <p className="mt-1 text-[11px] text-slate-300">
              Advanced mechanical ventilation, 1:1 specialized nursing, and
              round-the-clock intensivists.
            </p>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-900/90 p-4">
            <div className="flex items-center gap-2.5 text-amber-400">
              <CalendarCheck className="size-5" />
              <span className="font-mono text-sm font-bold">Instant bKash</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-white">
              Confirmed Chamber Slots
            </p>
            <p className="mt-1 text-[11px] text-slate-300">
              Pick preferred time slot, receive appointment serial token, and
              avoid hospital queues.
            </p>
          </div>
        </div>

        {/* Horizontal Physical Accreditation Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-400" />
            <span>
              Accredited Multi-Disciplinary Tertiary Hospital in Dhaka
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>21 Shyamoli, Mirpur Road, Dhaka-1207</span>
            <span>&bull;</span>
            <span>License No: BMDC/HOSP/2016</span>
          </div>
        </div>
      </div>
    </section>
  );
}
