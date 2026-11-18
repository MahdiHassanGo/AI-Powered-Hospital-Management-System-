"use client";

import {
  ArrowRight,
  CalendarCheck2,
  MessageSquareHeart,
  SearchCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    step: "01",
    title: "Find Your Specialist",
    description:
      "Search by medical department, doctor name, or describe your symptoms to our AI Medical Assistant for instant specialist matching.",
    icon: SearchCheck,
  },
  {
    step: "02",
    title: "Choose an Available Slot",
    description:
      "Review verified BMDC credentials, experience, and transparent consultation fees in BDT, then pick a convenient appointment time.",
    icon: CalendarCheck2,
  },
  {
    step: "03",
    title: "Confirm & Consult",
    description:
      "Complete secure booking via bKash and receive your appointment serial, meeting link, and digital prescription directly.",
    icon: MessageSquareHeart,
  },
];

export default function HowItWorksSection() {
  const openChat = () => {
    window.dispatchEvent(new Event("open-healthcare-chat"));
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 space-y-16">
      {/* 3-step patient journey */}
      <div>
        <div className="mx-auto max-w-2xl text-center space-y-2">
          <p className="text-xs font-semibold tracking-wider text-primary uppercase">
            Simple Patient Journey
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            How Booking Works at Bangladesh Specialized Hospital
          </h2>
          <p className="text-sm text-slate-600 sm:text-base">
            From symptom discovery to confirmed consultation in three easy
            steps.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-2xl border bg-white p-6 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-100">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Dual CTA Banner */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-lg">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-300">
              <Sparkles className="size-3.5" />
              RAG-Powered Healthcare AI
            </span>
            <h3 className="text-2xl font-bold tracking-tight">
              Not sure which department matches your symptoms?
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Ask our AI Medical Assistant about skin rashes, chest discomfort,
              migraines, or child health—and get matched immediately to verified
              Bangladesh Specialized Hospital doctors.
            </p>
          </div>
          <div className="mt-6">
            <Button
              size="lg"
              variant="secondary"
              onClick={openChat}
              className="font-semibold"
            >
              <Sparkles className="size-4 text-primary" />
              Launch AI Assistant
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border bg-gradient-to-br from-primary/5 via-white to-sky-50 p-8 shadow-sm">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Stethoscope className="size-3.5" />
              For Medical Professionals
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              Join Our Specialist Medical Panel
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Are you a BMDC-certified specialist looking to serve patients
              online and in-person? Submit your credentials and join Bangladesh
              Specialized Hospital.
            </p>
          </div>
          <div className="mt-6">
            <Button
              size="lg"
              render={
                <Link href="/apply">
                  Apply as a Doctor
                  <ArrowRight className="size-4" />
                </Link>
              }
              nativeButton={false}
            >
              Apply as a Doctor
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
