import { Clock, Mail, MapPin, PhoneCall, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";

const DEPARTMENTS = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Gynecology",
  "Gastroenterology",
  "Nephrology",
  "Pulmonology",
  "Internal Medicine",
];

export default function Footer() {
  return (
    <footer className="border-t border-[#0f2c4d] bg-[#071c33] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Hospital Statement */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Logo />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-white leading-tight">
                  Bangladesh Specialized Hospital
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                  Tertiary Medical Center &bull; Dhaka
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              A tertiary multi-disciplinary hospital in Shyamoli, Mirpur Road,
              Dhaka, dedicated to clinical precision, high-tech surgery, 24/7
              emergency trauma resuscitation, and patient-centered care.
            </p>
            <div className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200">
              <ShieldCheck className="size-4 text-emerald-400" />
              BMDC-Certified Medical Specialist Network
            </div>
          </div>

          {/* Patient Services & Sitemaps */}
          <div>
            <h3 className="font-serif mb-4 text-sm font-bold tracking-wide text-white">
              Patient Services
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/doctors"
                  className="transition-colors hover:text-white"
                >
                  Find a Consultant Doctor
                </Link>
              </li>
              <li>
                <Link
                  href="/doctors"
                  className="transition-colors hover:text-white"
                >
                  Book Chamber Appointment
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="transition-colors hover:text-white"
                >
                  Hospital Mission &amp; Infrastructure
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="transition-colors hover:text-white"
                >
                  Consultant Physician Application
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="transition-colors hover:text-white"
                >
                  Patient Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinical Departments */}
          <div>
            <h3 className="font-serif mb-4 text-sm font-bold tracking-wide text-white">
              Clinical Specialties
            </h3>
            <ul className="space-y-2 text-xs">
              {DEPARTMENTS.map((dept) => (
                <li key={dept}>
                  <Link
                    href={`/doctors?specialization=${encodeURIComponent(dept)}`}
                    className="transition-colors hover:text-white"
                  >
                    {dept}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency & Campus Contact */}
          <div>
            <h3 className="font-serif mb-4 text-sm font-bold tracking-wide text-white">
              Emergency &amp; Campus Location
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" />
                <span>21 Shyamoli, Mirpur Road, Dhaka-1207, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="size-4 shrink-0 text-emerald-400" />
                <span className="font-semibold text-white">
                  Emergency Hotline: 10633 (24 Hours)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-slate-400" />
                <span>info@bshospital.com.bd</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-slate-400" />
                <span>Emergency Room, ICU &amp; CCU Open 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Bangladesh Specialized Hospital.
            All rights reserved.
          </p>
          <p className="font-mono text-[11px]">
            Recognized by Bangladesh Medical &amp; Dental Council &bull;
            Shyamoli, Dhaka-1207
          </p>
        </div>
      </div>
    </footer>
  );
}
