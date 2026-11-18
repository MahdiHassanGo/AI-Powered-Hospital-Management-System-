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
];

export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-white">
                  Bangladesh Specialized Hospital
                </span>
                <span className="text-[11px] font-medium text-sky-400">
                  Center of Medical Excellence
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Delivering compassionate, evidence-based tertiary healthcare with
              BMDC-verified specialists, modern diagnostics, and AI-guided
              patient care across Bangladesh.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
              <ShieldCheck className="size-4" />
              BMDC Verified Specialist Network
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/doctors"
                  className="transition-colors hover:text-white"
                >
                  Find a Doctor
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="transition-colors hover:text-white"
                >
                  Apply as a Doctor
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

          {/* Specialties */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              Key Departments
            </h3>
            <ul className="space-y-2.5 text-sm">
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

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              Contact & Emergency
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sky-400" />
                <span>21 Shyamoli, Mirpur Road, Dhaka-1207, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="size-4 shrink-0 text-emerald-400" />
                <span className="font-medium text-white">
                  Hotline: 10633 (24/7)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-sky-400" />
                <span>info@bshospital.com.bd</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-sky-400" />
                <span>Emergency & ICU Open 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Bangladesh Specialized Hospital.
            All rights reserved.
          </p>
          <p>Trusted Specialized Healthcare &bull; Dhaka, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
