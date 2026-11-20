import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PublicDoctorProfile } from "@/types";

function getDoctorInitials(name: string) {
  const cleaned = name.replace(/^Dr\.?\s+/i, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "DR";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function DoctorCard({
  doctor,
}: {
  doctor: PublicDoctorProfile;
}) {
  const initials = getDoctorInitials(doctor.name);
  const fee =
    doctor.consultationFee != null && Number(doctor.consultationFee) > 0
      ? `৳ ${Number(doctor.consultationFee).toLocaleString()}`
      : "Contact Hospital";

  return (
    <article className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition-colors hover:border-slate-400">
      <div className="space-y-3">
        {/* Header: Clinical Avatar + Doctor Identity */}
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 font-mono text-xs font-bold text-slate-800">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate text-sm font-semibold text-slate-900 group-hover:text-teal-800 transition-colors">
                {doctor.name}
              </h3>
            </div>
            <div className="mt-0.5 inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
              <Stethoscope className="size-3 text-slate-600" />
              <span className="truncate">{doctor.specialization}</span>
            </div>
          </div>
        </div>

        {/* Credentials & Clinical Qualifications */}
        <div className="space-y-1.5 text-xs text-slate-600">
          <p className="flex items-start gap-1.5">
            <GraduationCap className="mt-0.5 size-3.5 shrink-0 text-slate-400" />
            <span className="line-clamp-1">{doctor.qualifications}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <BriefcaseBusiness className="size-3.5 shrink-0 text-slate-400" />
            <span className="font-mono tabular-nums">
              {doctor.experienceYears}{" "}
              {doctor.experienceYears === 1 ? "yr" : "yrs"} clinical experience
            </span>
          </p>
        </div>

        {/* BMDC Verified Indicator */}
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
          <CheckCircle2 className="size-3.5 text-emerald-600" />
          <span>BMDC Verified Practitioner</span>
        </div>
      </div>

      {/* Footer: Tabular Fee & Action */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
        <div>
          <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Consultation Fee
          </p>
          <p className="font-mono text-sm font-bold tabular-nums text-slate-900">
            {fee}
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          render={
            <Link href={`/doctors/${doctor.id}`}>
              View Schedule
              <ArrowRight className="size-3.5" />
            </Link>
          }
          nativeButton={false}
        >
          View Schedule
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </article>
  );
}
