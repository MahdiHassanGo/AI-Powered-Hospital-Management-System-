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
  "Internal Medicine",
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-3.5">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-white">
                  Bangladesh Specialized Hospital
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  Tertiary Medical Center &bull; Dhaka
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Tertiary clinical healthcare institution delivering
              multi-disciplinary specialist consultations, modern diagnostics,
              and round-the-clock trauma care in Shyamoli, Dhaka.
            </p>
            <div className="inline-flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300">
              <ShieldCheck className="size-4 text-emerald-400" />
              BMDC-Verified Medical Panel
            </div>
          </div>

          {/* Patient Access */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Patient Services
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Hospital Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/doctors"
                  className="transition-colors hover:text-white"
                >
                  Consultant Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="transition-colors hover:text-white"
                >
                  Clinical Mission &amp; Location
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="transition-colors hover:text-white"
                >
                  Specialist Doctor Application
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

          {/* Key Clinical Departments */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-wider text-slate-200 uppercase">
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
            <h3 className="mb-3 text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Hospital Campus &amp; Emergency
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" />
                <span>21 Shyamoli, Mirpur Road, Dhaka-1207, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="size-4 shrink-0 text-emerald-400" />
                <span className="font-medium text-white">
                  Hotline: 10633 (24 Hours)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-slate-400" />
                <span>info@bshospital.com.bd</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 shrink-0 text-slate-400" />
                <span>Emergency, ICU &amp; Diagnostics Open 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-slate-900 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Bangladesh Specialized Hospital.
            All rights reserved.
          </p>
          <p className="font-mono">
            Shyamoli, Dhaka-1207 &bull; Bangladesh Medical &amp; Dental Council
            Registered
          </p>
        </div>
      </div>
    </footer>
  );
}
