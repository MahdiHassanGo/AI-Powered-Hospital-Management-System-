import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarClock,
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
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-lg font-semibold text-slate-900">Doctor not found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The specialist profile you are looking for may no longer be available.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          render={<Link href="/doctors">Back to Doctors</Link>}
          nativeButton={false}
        >
          Back to Doctors
        </Button>
      </div>
    );
  }

  const fee =
    doctor.consultationFee != null && Number(doctor.consultationFee) > 0
      ? `৳${Number(doctor.consultationFee).toLocaleString()}`
      : "Contact Hospital";

  return (
    <div className="bg-slate-50/50 py-10">
      <div className="mx-auto max-w-4xl space-y-8 px-4">
        <Button
          variant="ghost"
          size="sm"
          render={<Link href="/doctors" />}
          nativeButton={false}
        >
          <ArrowLeft className="size-4" /> Back to Specialist Directory
        </Button>

        {/* Doctor Profile Card */}
        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="border-b bg-gradient-to-r from-slate-900 via-slate-900 to-primary/90 p-6 text-white sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white ring-1 ring-white/25">
                {getInitials(doctor.name)}
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {doctor.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
                    <BadgeCheck className="size-3.5" />
                    BMDC Verified
                  </span>
                </div>
                <p className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-300">
                  <Stethoscope className="size-4" />
                  {doctor.specialization} &bull; Bangladesh Specialized Hospital
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-left sm:text-right">
                <p className="text-xs text-slate-300">Consultation Fee</p>
                <p className="text-2xl font-bold text-white">{fee}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Credentials Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border bg-slate-50/70 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <GraduationCap className="size-4 text-primary" />
                  Qualifications
                </div>
                <p className="mt-1.5 text-sm font-semibold text-slate-900">
                  {doctor.qualifications}
                </p>
              </div>
              <div className="rounded-2xl border bg-slate-50/70 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <BriefcaseBusiness className="size-4 text-primary" />
                  Experience
                </div>
                <p className="mt-1.5 text-sm font-semibold text-slate-900">
                  {doctor.experienceYears}{" "}
                  {doctor.experienceYears === 1 ? "year" : "years"} clinical
                  practice
                </p>
              </div>
              <div className="rounded-2xl border bg-slate-50/70 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <ScrollText className="size-4 text-primary" />
                  BMDC License
                </div>
                <p className="mt-1.5 text-sm font-semibold text-slate-900">
                  {doctor.licenseNumber}
                </p>
              </div>
            </div>

            {doctor.bio && (
              <div className="space-y-2 border-t pt-6">
                <h2 className="text-base font-semibold text-slate-900">
                  About {doctor.name}
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  {doctor.bio}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Appointment Booking Section */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b pb-4">
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <CalendarClock className="size-5 text-primary" />
                Book Appointment
              </h2>
              <p className="text-sm text-slate-600">
                Select one of today&apos;s available consultation slots. Booking
                redirects securely to bKash payment.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              <Wallet className="size-3.5 text-primary" />
              Fee: {fee}
            </div>
          </div>
          <DoctorBooking doctorId={doctor.id} />
        </div>

        <ChatWidget />
      </div>
    </div>
  );
}
