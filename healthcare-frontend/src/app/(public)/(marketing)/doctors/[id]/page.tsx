import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  GraduationCap,
  ScrollText,
  Stethoscope,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { getAllPublicDoctors, getPublicDoctorProfile } from "@/api";
import ChatWidget from "@/components/modules/chat/chat-widget";
import DoctorBooking from "@/components/modules/doctors/doctor-booking";
import { Button } from "@/components/ui/button";
import type { PublicDoctorProfile } from "@/types";

export async function generateStaticParams() {
  try {
    const limit = 100;
    const first = await getAllPublicDoctors({ page: 1, limit });

    const totalPages = first.meta.totalPages ?? 1;
    const all = [...first.data];

    for (let page = 2; page <= totalPages; page++) {
      const data = await getAllPublicDoctors({ page, limit });
      all.push(...data.data);
    }

    return all.map((doctor) => ({ id: doctor.id }));
  } catch {
    return [];
  }
}

function getInitials(name: string) {
  const cleaned = name.replace(/^Dr\.?\s+/i, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "DR";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let doctor: PublicDoctorProfile | undefined;
  try {
    const data = await getPublicDoctorProfile(id);
    doctor = data.data || undefined;
  } catch {
    doctor = undefined;
  }

  if (!doctor) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-base font-semibold text-slate-900">
          Doctor Profile Not Found
        </p>
        <p className="mt-1 text-xs text-slate-500">
          The requested specialist record could not be loaded from the hospital
          directory.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          render={<Link href="/doctors">Return to Directory</Link>}
          nativeButton={false}
        >
          Return to Directory
        </Button>
      </div>
    );
  }

  const fee =
    doctor.consultationFee != null && Number(doctor.consultationFee) > 0
      ? `৳ ${Number(doctor.consultationFee).toLocaleString()}`
      : "Contact Hospital";

  return (
    <div className="bg-slate-50/50 py-8 lg:py-12">
      <div className="mx-auto max-w-4xl space-y-6 px-4">
        <Button
          variant="ghost"
          size="sm"
          render={<Link href="/doctors" />}
          nativeButton={false}
        >
          <ArrowLeft className="size-4" /> Specialist Directory
        </Button>

        {/* Doctor Clinical Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          {/* Header Banner */}
          <div className="border-b border-slate-800 bg-slate-900 p-6 text-white sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 font-mono text-xl font-bold text-white">
                {getInitials(doctor.name)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {doctor.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-300">
                    <CheckCircle2 className="size-3" />
                    BMDC Verified
                  </span>
                </div>
                <p className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300">
                  <Stethoscope className="size-3.5 text-teal-400" />
                  {doctor.specialization} &bull; Bangladesh Specialized Hospital
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-800/60 px-4 py-2.5 text-left sm:text-right">
                <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Consultation Fee
                </p>
                <p className="font-mono text-xl font-bold tabular-nums text-white">
                  {fee}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Clinical Credentials Grid */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <GraduationCap className="size-3.5 text-slate-600" />
                  Qualifications
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-900">
                  {doctor.qualifications}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <BriefcaseBusiness className="size-3.5 text-slate-600" />
                  Clinical Experience
                </div>
                <p className="mt-1 font-mono text-xs font-semibold tabular-nums text-slate-900">
                  {doctor.experienceYears}{" "}
                  {doctor.experienceYears === 1 ? "year" : "years"} practice
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <ScrollText className="size-3.5 text-slate-600" />
                  BMDC Registration
                </div>
                <p className="mt-1 font-mono text-xs font-semibold tabular-nums text-slate-900">
                  {doctor.licenseNumber}
                </p>
              </div>
            </div>

            {doctor.bio && (
              <div className="space-y-1.5 border-t border-slate-100 pt-5">
                <h2 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Physician Overview
                </h2>
                <p className="text-xs leading-relaxed text-slate-700">
                  {doctor.bio}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Today's Consultation Schedule Booking */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="space-y-0.5">
              <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                <CalendarClock className="size-4.5 text-slate-700" />
                Published Consultation Slots
              </h2>
              <p className="text-xs text-slate-500">
                Select an open consultation slot. Payment is completed securely
                via bKash.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              <Wallet className="size-3.5 text-slate-600" />
              Fee: <span className="font-mono tabular-nums">{fee}</span>
            </div>
          </div>
          <DoctorBooking doctorId={doctor.id} />
        </div>

        <ChatWidget />
      </div>
    </div>
  );
}
