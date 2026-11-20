import {
  Activity,
  ArrowRight,
  Bone,
  Brain,
  Building2,
  HeartPulse,
  ShieldPlus,
  Stethoscope,
  Wind,
} from "lucide-react";
import Link from "next/link";

const INSTITUTES = [
  {
    title: "Institute of Cardiac Sciences & CCU",
    dept: "Cardiology",
    scope:
      "Interventional Cath Lab, Coronary Angiogram, Stenting, Pacemakers, Echocardiogram & 24/7 CCU.",
    procedures: [
      "Coronary Angiogram",
      "Primary Angioplasty (PCI)",
      "Echocardiography",
      "24/7 CCU",
    ],
    consultantCount: "18+ Specialists",
    icon: HeartPulse,
  },
  {
    title: "Neurosciences & Comprehensive Stroke Center",
    dept: "Neurology",
    scope:
      "Stroke thrombolysis, Brain trauma, Microsurgical tumor resection, Epilepsy, Migraine & Neuro-ICU.",
    procedures: [
      "Acute Stroke Care",
      "Neurosurgery",
      "Electromyography (EMG)",
      "Neuro-ICU",
    ],
    consultantCount: "14+ Specialists",
    icon: Brain,
  },
  {
    title: "Orthopedics & Joint Replacement Center",
    dept: "Orthopedics",
    scope:
      "Total Knee & Hip Arthroplasty, Arthroscopic ACL surgery, Complex fracture fixation & Spine surgery.",
    procedures: [
      "Total Knee Replacement",
      "Total Hip Arthroplasty",
      "Spine Reconstruction",
      "Trauma Fixation",
    ],
    consultantCount: "16+ Specialists",
    icon: Bone,
  },
  {
    title: "Gastroenterology, Hepatology & Endoscopy",
    dept: "Gastroenterology",
    scope:
      "Therapeutic Upper GI Endoscopy, Colonoscopy, ERCP for bile duct stones, Liver cirrhosis & GI bleeding.",
    procedures: [
      "Diagnostic & Therapeutic Endoscopy",
      "Colonoscopy",
      "ERCP",
      "Liver Clinic",
    ],
    consultantCount: "12+ Specialists",
    icon: Activity,
  },
  {
    title: "Mother & Child Care Institute",
    dept: "Gynecology",
    scope:
      "High-risk obstetric management, Normal & Cesarean deliveries, Level-III Neonatal ICU (NICU) & Pediatrics.",
    procedures: [
      "Maternal-Fetal Medicine",
      "Laparoscopic Hysterectomy",
      "Level-III NICU",
      "Pediatric Surgery",
    ],
    consultantCount: "22+ Specialists",
    icon: ShieldPlus,
  },
  {
    title: "Nephrology, Dialysis & Kidney Health",
    dept: "Nephrology",
    scope:
      "24-Hour Automated Hemodialysis unit, Acute kidney injury management, Glomerulonephritis & Renal biopsy.",
    procedures: [
      "24/7 Hemodialysis",
      "Kidney Biopsy",
      "AV Fistula Care",
      "Hypertension Clinic",
    ],
    consultantCount: "10+ Specialists",
    icon: Building2,
  },
  {
    title: "Pulmonology, Thoracic & Critical Care",
    dept: "Pulmonology",
    scope:
      "30-Bed Critical Care ICU, Mechanical ventilation, Video Bronchoscopy, Chronic Asthma & COPD management.",
    procedures: [
      "Video Bronchoscopy",
      "Invasive Mechanical Ventilation",
      "Thoracic Drainage",
      "Sleep Apnea",
    ],
    consultantCount: "9+ Specialists",
    icon: Wind,
  },
  {
    title: "Internal Medicine & Adult Care",
    dept: "Internal Medicine",
    scope:
      "Complex multi-system diseases, Unexplained fevers, Comprehensive adult diagnostics & Chronic disease care.",
    procedures: [
      "Executive Health Screening",
      "Diabetes Management",
      "Infectious Disease",
      "Geriatric Care",
    ],
    consultantCount: "25+ Specialists",
    icon: Stethoscope,
  },
];

export default function DepartmentsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:py-20">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
        <div className="space-y-1.5">
          <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">
            Clinical Centers of Excellence
          </p>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Specialized Medical Institutes &amp; Clinical Departments
          </h2>
          <p className="max-w-2xl text-xs text-slate-600 sm:text-sm">
            Bangladesh Specialized Hospital comprises 34 specialized departments
            organized under comprehensive clinical institutes with integrated
            chambers, diagnostics, and surgical facilities.
          </p>
        </div>
        <Link
          href="/doctors"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A2647] hover:underline"
        >
          View all 34 departments &rarr;
        </Link>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {INSTITUTES.map((institute) => {
          const Icon = institute.icon;
          return (
            <div
              key={institute.title}
              className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-md bg-[#0A2647]/10 text-[#0A2647]">
                    <Icon className="size-5" />
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-slate-500">
                    {institute.consultantCount}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">
                  {institute.title}
                </h3>

                <p className="text-xs leading-relaxed text-slate-600">
                  {institute.scope}
                </p>

                {/* Key Clinical Procedures */}
                <div className="space-y-1 border-t border-slate-100 pt-3">
                  <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Procedures &amp; Units
                  </p>
                  <ul className="grid grid-cols-2 gap-1 text-[11px] text-slate-700">
                    {institute.procedures.map((proc) => (
                      <li
                        key={proc}
                        className="flex items-center gap-1 truncate"
                      >
                        <span className="size-1 rounded-full bg-slate-400" />
                        <span className="truncate">{proc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-3">
                <Link
                  href={`/doctors?specialization=${encodeURIComponent(institute.dept)}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A2647] hover:underline"
                >
                  View Specialists &amp; Chamber Hours
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
