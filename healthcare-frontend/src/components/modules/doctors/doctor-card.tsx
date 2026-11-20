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
      ? `BDT ৳ ${Number(doctor.consultationFee).toLocaleString()}`
      : "Contact Hospital";

  return (
    <article className="group flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-md">
      <div className="space-y-3.5">
        {/* Header: Clinical Avatar & Identity */}
        <div className="flex items-start gap-3.5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-[#0A2647] font-mono text-sm font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-serif truncate text-base font-bold text-slate-900 group-hover:text-[#0A2647] transition-colors">
              {doctor.name}
            </h3>
            <div className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-slate-700">
              <Stethoscope className="size-3 text-[#0A2647]" />
              <span className="truncate">{doctor.specialization}</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Bangladesh Specialized Hospital
            </p>
          </div>
        </div>

        {/* Credentials & Degrees */}
        <div className="space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-700">
          <p className="flex items-start gap-2">
            <GraduationCap className="mt-0.5 size-3.5 shrink-0 text-slate-400" />
            <span className="line-clamp-2 font-medium">
              {doctor.qualifications}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <BriefcaseBusiness className="size-3.5 shrink-0 text-slate-400" />
            <span className="font-mono tabular-nums">
              {doctor.experienceYears}{" "}
              {doctor.experienceYears === 1 ? "year" : "years"} clinical
              practice
            </span>
          </p>
        </div>

        {/* BMDC Verified Seal Badge */}
        <div className="flex items-center justify-between rounded-md bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700">
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
            <CheckCircle2 className="size-3.5 text-emerald-600" />
            BMDC Verified
          </span>
          <span className="font-mono text-slate-500">
            Reg: {doctor.licenseNumber || "BMDC Registered"}
          </span>
        </div>
      </div>

      {/* Footer: Tabular Fee & Action */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
        <div>
          <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Consultation Fee
          </p>
          <p className="font-mono text-sm font-bold tabular-nums text-slate-900">
            {fee}
          </p>
        </div>
        <Button
          size="sm"
          className="bg-[#0A2647] text-white hover:bg-[#071c33] text-xs font-semibold"
          render={
            <Link href={`/doctors/${doctor.id}`}>
              Book Slot
              <ArrowRight className="size-3.5" />
            </Link>
          }
          nativeButton={false}
        >
          Book Slot
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </article>
  );
}
