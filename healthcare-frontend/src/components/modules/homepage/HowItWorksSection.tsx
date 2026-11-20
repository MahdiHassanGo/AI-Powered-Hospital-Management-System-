"use client";

import {
  CalendarCheck,
  CreditCard,
  FileText,
  PhoneCall,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PATHWAY_STEPS = [
  {
    step: "01",
    title: "Select Specialist & Specialty",
    description:
      "Search by physician name, degree qualification, or medical condition across our 34 clinical departments. Review credentials and verified fees.",
    icon: Search,
  },
  {
    step: "02",
    title: "Choose Chamber Time Slot",
    description:
      "Select an open morning or evening chamber slot published on the consultant's schedule matching your preferred consultation day.",
    icon: CalendarCheck,
  },
  {
    step: "03",
    title: "Confirm via bKash Payment",
    description:
      "Securely complete BDT consultation fee payment via bKash. Receive an instant digital serial token with your arrival schedule.",
    icon: CreditCard,
  },
  {
    step: "04",
    title: "Consultation at Hospital",
    description:
      "Present your appointment token at Bangladesh Specialized Hospital, 21 Shyamoli. Undergo physical consultation and receive digital prescriptions.",
    icon: FileText,
  },
];

const FACILITIES = [
  {
    title: "Level-1 Trauma & Emergency Care",
    description:
      "Equipped with rapid resuscitation bays, portable imaging, and dedicated round-the-clock emergency surgical teams.",
  },
  {
    title: "10+ Modular Laminar Operation Theaters",
    description:
      "Positive pressure ultra-clean air filtration minimizing surgical site infections for complex cardiac and neuro surgeries.",
  },
  {
    title: "State-of-the-Art Critical Care (ICU/CCU/NICU)",
    description:
      "30-bed critical care unit with dedicated intensivists, invasive hemodynamic monitoring, and 1:1 specialized nurse ratio.",
  },
  {
    title: "24/7 Central Diagnostics & Imaging",
    description:
      "High-field 1.5T MRI, 128-slice dual-source cardiac CT, flat-panel digital Cath Lab, and automated hematology.",
  },
];

export default function HowItWorksSection() {
  const openChat = () => {
    window.dispatchEvent(new Event("open-healthcare-chat"));
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:py-20 space-y-16">
      {/* 4-Step Patient Consultation Pathway */}
      <div>
        <div className="border-b border-slate-200 pb-4">
          <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">
            Clinical Care Protocol
          </p>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            The Patient Consultation Pathway
          </h2>
          <p className="max-w-2xl text-xs text-slate-600 sm:text-sm">
            Structured 4-step protocol designed for timely specialist
            appointments, zero waiting room congestion, and immediate digital
            records.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PATHWAY_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      STEP {step.step}
                    </span>
                    <div className="flex size-8 items-center justify-center rounded-md bg-[#0A2647]/10 text-[#0A2647]">
                      <Icon className="size-4" />
                    </div>
                  </div>
                  <h3 className="font-serif mt-3 text-sm font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hospital Infrastructure & Facilities Grid */}
      <div className="rounded-xl border border-slate-800 bg-[#071c33] p-6 text-white sm:p-10">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
            Institutional Standards
          </span>
          <h2 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
            Advanced Clinical Infrastructure &amp; Medical Facilities
          </h2>
          <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
            Built to international healthcare accreditation standards,
            Bangladesh Specialized Hospital combines cutting-edge surgical
            robotics, imaging, and critical care units under one roof.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACILITIES.map((fac) => (
            <div
              key={fac.title}
              className="rounded-lg border border-slate-700 bg-slate-900/80 p-4"
            >
              <h3 className="font-serif text-sm font-bold text-white">
                {fac.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                {fac.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action Row */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-6">
          <div className="flex items-center gap-3">
            <PhoneCall className="size-5 text-emerald-400" />
            <div>
              <p className="text-xs font-bold text-white">
                Emergency Hotline &bull; Open 24/7
              </p>
              <p className="font-mono text-sm font-bold text-emerald-400">
                10633 &bull; (02) 9131668
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 bg-slate-800 text-white hover:bg-slate-700"
              onClick={openChat}
            >
              Clinical Triage Guidance
            </Button>
            <Button
              size="sm"
              className="bg-white text-slate-950 hover:bg-slate-100 font-semibold"
              render={<Link href="/doctors">Schedule a Consultation</Link>}
              nativeButton={false}
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
