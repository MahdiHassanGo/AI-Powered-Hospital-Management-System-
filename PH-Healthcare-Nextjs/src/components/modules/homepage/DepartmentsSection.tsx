import {
  Activity,
  ArrowRight,
  Baby,
  Bone,
  Brain,
  Ear,
  Eye,
  HeartPulse,
  Pill,
  ShieldPlus,
  Sparkles,
  Stethoscope,
  Wind,
} from "lucide-react";
import Link from "next/link";

const DEPARTMENTS = [
  {
    name: "Cardiology",
    description: "Heart disease, hypertension, angiogram & ECG care",
    icon: HeartPulse,
    color: "text-rose-600 bg-rose-50",
  },
  {
    name: "Dermatology",
    description: "Skin rashes, allergies, acne, eczema & hair care",
    icon: Sparkles,
    color: "text-amber-600 bg-amber-50",
  },
  {
    name: "Neurology",
    description: "Migraine, stroke, epilepsy & nervous system care",
    icon: Brain,
    color: "text-indigo-600 bg-indigo-50",
  },
  {
    name: "Orthopedics",
    description: "Fractures, joint pain, arthritis & spine surgery",
    icon: Bone,
    color: "text-sky-600 bg-sky-50",
  },
  {
    name: "Pediatrics",
    description: "Newborn care, child growth, asthma & vaccination",
    icon: Baby,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    name: "Gynecology",
    description: "Pregnancy care, PCOS, obstetrics & women's health",
    icon: ShieldPlus,
    color: "text-pink-600 bg-pink-50",
  },
  {
    name: "Gastroenterology",
    description: "Ulcers, acidity, IBS, liver & endoscopy",
    icon: Activity,
    color: "text-orange-600 bg-orange-50",
  },
  {
    name: "Ophthalmology",
    description: "Cataract, glaucoma, retina & vision care",
    icon: Eye,
    color: "text-cyan-600 bg-cyan-50",
  },
  {
    name: "ENT",
    description: "Sinusitis, hearing loss, tonsillitis & vertigo",
    icon: Ear,
    color: "text-teal-600 bg-teal-50",
  },
  {
    name: "Pulmonology",
    description: "Asthma, COPD, chronic cough & chest diseases",
    icon: Wind,
    color: "text-blue-600 bg-blue-50",
  },
  {
    name: "Endocrinology",
    description: "Diabetes, thyroid & hormonal care",
    icon: Pill,
    color: "text-violet-600 bg-violet-50",
  },
  {
    name: "Internal Medicine",
    description: "Comprehensive adult medicine & preventive care",
    icon: Stethoscope,
    color: "text-primary bg-primary/10",
  },
];

export default function DepartmentsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wider text-primary uppercase">
            Centers of Excellence
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Browse by Medical Department
          </h2>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            Select a clinical department to view verified consultants,
            consultation fees, and today&apos;s available schedules.
          </p>
        </div>
        <Link
          href="/doctors"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          View all 34+ departments
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DEPARTMENTS.map((dept) => {
          const Icon = dept.icon;
          return (
            <Link
              key={dept.name}
              href={`/doctors?specialization=${encodeURIComponent(dept.name)}`}
              className="group flex items-start gap-3.5 rounded-2xl border bg-white p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md"
            >
              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${dept.color}`}
              >
                <Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                  {dept.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                  {dept.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
