"use client";

import {
  ArrowRight,
  CalendarCheck2,
  FileCheck2,
  MessageSquare,
  SearchCheck,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    step: "01",
    title: "Select Specialist",
    description:
      "Filter by medical department, BMDC license, doctor name, or use clinical triage to match symptoms to appropriate specialists.",
    icon: SearchCheck,
  },
  {
    step: "02",
    title: "Select Consultation Slot",
    description:
      "Review published clinic hours and transparent consultation fees in BDT, then choose your preferred time slot.",
    icon: CalendarCheck2,
  },
  {
    step: "03",
    title: "Confirm & Consult",
    description:
      "Complete payment with bKash to secure your appointment serial number and consult the specialist at the hospital.",
    icon: FileCheck2,
  },
];

export default function HowItWorksSection() {
  const openChat = () => {
    window.dispatchEvent(new Event("open-healthcare-chat"));
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:py-16 space-y-12">
      {/* 3-step patient journey */}
      <div>
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Clinical Process
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            How Consultations Work
          </h2>
          <p className="text-xs text-slate-600 sm:text-sm">
            Simple 3-step scheduling process for in-hospital specialist
            consultations.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-800">
                    <Icon className="size-5" />
                  </div>
                  <span className="font-mono text-2xl font-bold text-slate-200">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Structured Dual Information Cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Triage Guidance Card */}
        <div className="flex flex-col justify-between rounded-2xl bg-slate-900 p-6 text-white">
          <div className="space-y-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-emerald-400">
              <MessageSquare className="size-3.5" />
              Hospital Department Triage
            </span>
            <h3 className="text-xl font-bold tracking-tight">
              Unsure which clinical department you need?
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Describe acute or chronic symptoms (such as persistent coughing,
              joint swelling, or skin lesions) to identify the appropriate
              clinical discipline at Bangladesh Specialized Hospital.
            </p>
          </div>
          <div className="mt-5">
            <Button
              size="sm"
              variant="secondary"
              onClick={openChat}
              className="bg-white font-medium text-slate-900 hover:bg-slate-100"
            >
              <MessageSquare className="size-3.5 text-slate-700" />
              Open Triage Assistant
            </Button>
          </div>
        </div>

        {/* Doctor Recruitment Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6">
          <div className="space-y-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              <Stethoscope className="size-3.5 text-slate-700" />
              Physician Credentialing
            </span>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              Join Our Medical Specialist Panel
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              Are you a BMDC-registered specialist holding post-graduate degrees
              (FCPS, MD, MS, MRCP)? Submit credentials to join the clinical
              faculty of Bangladesh Specialized Hospital.
            </p>
          </div>
          <div className="mt-5">
            <Button
              size="sm"
              render={
                <Link href="/apply">
                  Apply for Hospital Panel
                  <ArrowRight className="size-3.5" />
                </Link>
              }
              nativeButton={false}
            >
              Apply for Hospital Panel
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
