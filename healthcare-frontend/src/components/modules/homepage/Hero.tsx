"use client";

import {
  Activity,
  ArrowRight,
  Award,
  Building2,
  CreditCard,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const QUICK_SPECIALTIES = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
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
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-slate-50 via-white to-sky-50/70">
      {/* Subtle decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 size-[32rem] rounded-full bg-primary/6 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-0 size-[24rem] rounded-full bg-sky-400/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary">
              <ShieldCheck className="size-4" />
              Bangladesh Specialized Hospital &bull; Center of Medical
              Excellence
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
              Specialized Healthcare,{" "}
              <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
                Trusted by Bangladesh
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Access 200+ BMDC-certified specialists across 34+ medical
              departments. Describe your symptoms to our AI Medical Assistant or
              search our verified directory to book your appointment online.
            </p>

            {/* Quick Search Box */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col gap-2.5 rounded-2xl border bg-white p-2 shadow-lg shadow-slate-200/60 sm:flex-row sm:items-center"
            >
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search doctor name, degree, or specialty (e.g. Dermatology)..."
                  className="h-11 border-0 bg-transparent pl-10 text-sm shadow-none focus-visible:ring-0"
                />
              </div>
              <Button type="submit" size="lg" className="h-11 px-6">
                Find Doctor
                <ArrowRight className="size-4" />
              </Button>
            </form>

            {/* Quick Specialty Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-500">
                Popular:
              </span>
              {QUICK_SPECIALTIES.map((specialty) => (
                <Link
                  key={specialty}
                  href={`/doctors?specialization=${encodeURIComponent(specialty)}`}
                  className="rounded-full border bg-white px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                >
                  {specialty}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                size="lg"
                render={<Link href="/doctors">Explore All Specialists</Link>}
                nativeButton={false}
              >
                Explore All Specialists
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white"
                onClick={openChatAssistant}
              >
                <Sparkles className="size-4 text-primary" />
                Ask AI Medical Assistant
              </Button>
            </div>
          </div>

          {/* Right Column: Hospital Highlights Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border bg-white p-6 shadow-xl shadow-slate-200/70">
              {/* Top Emergency Status */}
              <div className="flex items-center justify-between rounded-2xl bg-slate-900 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                    <PhoneCall className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-300">
                      24/7 Emergency &amp; Trauma Care
                    </p>
                    <p className="text-lg font-bold tracking-wide">
                      Hotline: 10633
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-400">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  Open 24/7
                </span>
              </div>

              {/* 2x2 Key Stats */}
              <div className="mt-5 grid grid-cols-2 gap-3.5">
                <div className="rounded-2xl border bg-slate-50/70 p-4">
                  <Stethoscope className="size-5 text-primary" />
                  <p className="mt-2.5 text-2xl font-bold text-slate-900">
                    210+
                  </p>
                  <p className="text-xs text-slate-600">
                    BMDC Verified Specialists
                  </p>
                </div>
                <div className="rounded-2xl border bg-slate-50/70 p-4">
                  <Building2 className="size-5 text-sky-600" />
                  <p className="mt-2.5 text-2xl font-bold text-slate-900">
                    34+
                  </p>
                  <p className="text-xs text-slate-600">Clinical Departments</p>
                </div>
                <div className="rounded-2xl border bg-slate-50/70 p-4">
                  <Activity className="size-5 text-emerald-600" />
                  <p className="mt-2.5 text-2xl font-bold text-slate-900">
                    AI RAG
                  </p>
                  <p className="text-xs text-slate-600">
                    Smart Symptom Guidance
                  </p>
                </div>
                <div className="rounded-2xl border bg-slate-50/70 p-4">
                  <CreditCard className="size-5 text-indigo-600" />
                  <p className="mt-2.5 text-2xl font-bold text-slate-900">
                    Instant
                  </p>
                  <p className="text-xs text-slate-600">bKash Online Booking</p>
                </div>
              </div>

              {/* AI Assistant Quick Prompt Card */}
              <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Unsure which doctor to see?
                    </p>
                    <p className="text-xs text-slate-600">
                      Chat with our AI assistant for instant specialist
                      recommendations.
                    </p>
                  </div>
                </div>
                <Button size="sm" onClick={openChatAssistant}>
                  Chat
                </Button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                <Award className="size-4 text-primary" />
                <span>
                  Accredited Multi-Specialty Tertiary Hospital in Dhaka
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
