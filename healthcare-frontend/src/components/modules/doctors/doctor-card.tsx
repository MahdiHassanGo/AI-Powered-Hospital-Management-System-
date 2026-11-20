import { ArrowRight, BriefcaseBusiness, GraduationCap } from "lucide-react";
import Link from "next/link";
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
    <article className="group flex flex-col justify-between border-b border-black/10 bg-white py-6 transition-colors hover:border-black sm:border sm:p-6">
      <div className="space-y-4">
        {/* Header: Initials + Name */}
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center border border-black font-serif text-sm font-bold text-black">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-serif truncate text-lg font-bold tracking-tight text-black transition-opacity group-hover:opacity-75">
              {doctor.name}
            </h3>
            <p className="text-xs tracking-[0.1em] uppercase text-black/60">
              {doctor.specialization}
            </p>
          </div>
        </div>

        {/* Credentials */}
        <div className="space-y-1.5 border-t border-black/10 pt-3 text-xs text-black/80">
          <p className="flex items-start gap-2">
            <GraduationCap className="mt-0.5 size-3.5 shrink-0 text-black/40" />
            <span className="line-clamp-2">{doctor.qualifications}</span>
          </p>
          <p className="flex items-center gap-2">
            <BriefcaseBusiness className="size-3.5 shrink-0 text-black/40" />
            <span className="font-mono tabular-nums">
              {doctor.experienceYears}{" "}
              {doctor.experienceYears === 1 ? "year" : "years"} clinical
              practice
            </span>
          </p>
        </div>

        <div className="text-[11px] font-mono tracking-wider text-black/50">
          BMDC Reg: {doctor.licenseNumber || "Verified"}
        </div>
      </div>

      {/* Footer: Fee + Pill Button */}
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-black/10 pt-4">
        <div>
          <p className="text-[10px] tracking-[0.12em] uppercase text-black/40">
            Fee
          </p>
          <p className="font-mono text-sm font-bold tabular-nums text-black">
            {fee}
          </p>
        </div>
        <Link
          href={`/doctors/${doctor.id}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-black px-5 py-2 text-xs font-medium tracking-[0.1em] uppercase text-black transition-colors duration-200 hover:bg-black hover:text-white"
        >
          Book Slot
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </article>
  );
}
