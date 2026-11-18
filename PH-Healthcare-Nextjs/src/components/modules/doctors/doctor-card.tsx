import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
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
      ? `৳${Number(doctor.consultationFee).toLocaleString()}`
      : "Contact Hospital";

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md">
      <div className="space-y-4">
        {/* Top Row: Avatar + Name + Verified */}
        <div className="flex items-start gap-3.5">
          <div className="flex size-13 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-sky-500/15 text-base font-bold text-primary ring-1 ring-primary/15">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate text-base font-semibold text-slate-900 group-hover:text-primary transition-colors">
                {doctor.name}
              </h3>
              <BadgeCheck
                className="size-4 shrink-0 text-emerald-600"
                aria-label="Verified specialist"
              />
            </div>
            <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary">
              <Stethoscope className="size-3" />
              <span className="truncate">{doctor.specialization}</span>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="space-y-2 text-sm text-slate-600">
          <p className="flex items-start gap-2">
            <GraduationCap className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <span className="line-clamp-1">{doctor.qualifications}</span>
          </p>
          <p className="flex items-center gap-2">
            <BriefcaseBusiness className="size-4 shrink-0 text-slate-400" />
            <span>
              {doctor.experienceYears}{" "}
              {doctor.experienceYears === 1 ? "year" : "years"} of clinical
              experience
            </span>
          </p>
        </div>

        {/* Short bio preview */}
        {doctor.bio && (
          <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
            {doctor.bio}
          </p>
        )}
      </div>

      {/* Footer: Fee + CTA */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div>
          <p className="text-[11px] font-medium tracking-wide text-slate-400 uppercase">
            Consultation Fee
          </p>
          <p className="text-base font-bold text-slate-900">{fee}</p>
        </div>
        <Button
          size="sm"
          render={
            <Link href={`/doctors/${doctor.id}`}>
              View Profile
              <ArrowRight className="size-3.5" />
            </Link>
          }
          nativeButton={false}
        >
          View Profile
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </article>
  );
}
