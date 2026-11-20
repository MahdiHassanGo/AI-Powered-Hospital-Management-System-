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
    description: "Heart diseases, hypertension, coronary evaluation & ECG care",
    icon: HeartPulse,
  },
  {
    name: "Dermatology",
    description:
      "Skin conditions, allergies, eczema, psoriasis & clinical care",
    icon: Sparkles,
  },
  {
    name: "Neurology",
    description: "Migraine, stroke, neuropathies & central nervous disorders",
    icon: Brain,
  },
  {
    name: "Orthopedics",
    description: "Joint disorders, trauma surgery, arthritis & spine care",
    icon: Bone,
  },
  {
    name: "Pediatrics",
    description: "Infant growth, adolescent health, vaccinations & pediatrics",
    icon: Baby,
  },
  {
    name: "Gynecology",
    description: "Obstetric care, maternal medicine & gynecological health",
    icon: ShieldPlus,
  },
  {
    name: "Gastroenterology",
    description: "Digestive health, hepatic conditions, endoscopy & colon care",
    icon: Activity,
  },
  {
    name: "Ophthalmology",
    description: "Cataracts, retina disorders, glaucoma & diagnostic vision",
    icon: Eye,
  },
  {
    name: "ENT",
    description: "Ear disorders, sinusitis, laryngology & hearing evaluation",
    icon: Ear,
  },
  {
    name: "Pulmonology",
    description: "Asthma, respiratory infections, COPD & thoracic evaluation",
    icon: Wind,
  },
  {
    name: "Endocrinology",
    description: "Diabetes mellitus, thyroid management & metabolic health",
    icon: Pill,
  },
  {
    name: "Internal Medicine",
    description: "Comprehensive adult medical diagnosis & chronic management",
    icon: Stethoscope,
  },
];

export default function DepartmentsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Clinical Units
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Departments &amp; Specialties
          </h2>
          <p className="max-w-2xl text-xs text-slate-600 sm:text-sm">
            Select a specialty to view consultant profiles, BMDC licenses, and
            current consultation schedules.
          </p>
        </div>
        <Link
          href="/doctors"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-teal-700"
        >
          View all 34 departments
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {DEPARTMENTS.map((dept) => {
          const Icon = dept.icon;
          return (
            <Link
              key={dept.name}
              href={`/doctors?specialization=${encodeURIComponent(dept.name)}`}
              className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition-colors hover:border-slate-400 hover:bg-slate-50/50"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                <Icon className="size-4.5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-slate-900">
                  {dept.name}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
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
