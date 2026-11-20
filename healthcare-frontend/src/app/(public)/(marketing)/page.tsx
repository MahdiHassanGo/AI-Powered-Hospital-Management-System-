"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ChatWidget from "@/components/modules/chat/chat-widget";

const SERVICES = [
  { name: "Cardiovascular Surgery", url: "/doctors?specialization=Cardiology" },
  { name: "Neuro & Spine Surgery", url: "/doctors?specialization=Neurology" },
  {
    name: "Total Joint Replacement",
    url: "/doctors?specialization=Orthopedics",
  },
  {
    name: "Therapeutic Endoscopy",
    url: "/doctors?specialization=Gastroenterology",
  },
  { name: "24/7 Level-1 Trauma", url: "/doctors" },
  { name: "Critical Care ICU / CCU", url: "/doctors" },
];

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/doctors?searchTerm=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("/doctors");
    }
  };

  return (
    <div className="bg-white text-black selection:bg-black selection:text-white">
      {/* SECTION 2: HERO */}
      <section className="mx-auto max-w-[1280px] px-6 pt-16 pb-24 sm:px-12 sm:pt-24 sm:pb-32 lg:px-16 lg:pt-28 lg:pb-36">
        <p className="text-xs font-semibold tracking-[0.14em] uppercase text-black/60 mb-6">
          Tertiary Medical Center &bull; Dhaka
        </p>

        {/* Split display headline: line 1 Fraunces italic, line 2 Fraunces regular */}
        <h1 className="font-serif text-[clamp(56px,12vw,180px)] font-normal leading-[0.9] tracking-[-0.02em] text-black">
          <span className="block font-light italic">Precision</span>
          <span className="block font-bold not-italic">in Care.</span>
        </h1>

        {/* Minimal Search & Consultation Quick Bar */}
        <div className="mt-12 max-w-xl">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-3 border-b border-black pb-3"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search senior consultant or clinical specialty…"
              className="w-full bg-transparent text-sm tracking-wide text-black placeholder:text-black/40 outline-none"
            />
            <button
              type="submit"
              className="text-xs font-semibold tracking-[0.12em] uppercase text-black transition-opacity hover:opacity-60"
            >
              Search &rarr;
            </button>
          </form>
        </div>

        {/* Subtle scroll cue and clinical metadata */}
        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-black pt-6">
          <p className="text-xs tracking-[0.12em] uppercase text-black/60">
            210+ BMDC Registered Specialists &bull; 34 Departments &bull;
            Shyamoli, Dhaka
          </p>
          <span className="text-xs tracking-[0.12em] uppercase text-black">
            Scroll &darr;
          </span>
        </div>
      </section>

      {/* SECTION 3: ABOUT */}
      <section className="border-t border-black py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
            {/* About Copy (Cols 1-3) */}
            <div>
              <h2 className="font-serif text-[clamp(36px,5vw,68px)] font-bold leading-[1.05] tracking-[-0.02em] text-black mb-8">
                About Bangladesh Specialized Hospital
              </h2>
              <p className="text-lg leading-relaxed text-black/90 mb-6">
                Founded to redefine tertiary clinical care across Bangladesh,
                our Shyamoli hospital delivers uncompromising surgical
                precision, evidence-based medical diagnostics, and 24-hour
                emergency trauma resuscitation.
              </p>
              <p className="text-base leading-relaxed text-black/60">
                Operating 10+ modular laminar airflow surgical suites and
                staffed by 210+ senior BMDC-certified physicians, we pair
                international medical standards with direct digital scheduling.
              </p>
            </div>

            {/* 4:3 Documentary Photograph Right (Cols 4-6) */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
              <Image
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
                alt="Bangladesh Specialized Hospital Documentary Architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale contrast-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SECTION HEADER */}
      <section className="border-t border-black pt-20 sm:pt-28 lg:pt-36">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-black/60 mb-4">
            Centers of Clinical Excellence
          </p>
          <h2 className="font-serif text-[clamp(48px,8vw,110px)] font-bold leading-none tracking-[-0.02em] text-black">
            Our Work
          </h2>
        </div>
      </section>

      {/* SECTION 5: CASE STUDY 1 */}
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="font-serif text-[clamp(36px,6vw,76px)] font-bold leading-none tracking-[-0.02em] text-black">
              Institute of Cardiac Sciences
            </h3>
            <span className="text-xs tracking-[0.12em] uppercase text-black/60">
              Interventional Cardiology &bull; Open Heart Surgery
            </span>
          </div>

          <div className="relative my-8 aspect-[16/9] w-full overflow-hidden bg-black/5 sm:my-10">
            <Image
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80"
              alt="Cardiac Catheterization Suite"
              fill
              sizes="100vw"
              className="object-cover grayscale contrast-[1.02]"
            />
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16">
            <div>
              <div className="font-serif text-[clamp(80px,14vw,180px)] font-light leading-[0.8] text-black mb-4">
                01
              </div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-black mb-2">
                Background
              </p>
              <p className="text-base text-black/70 max-w-md leading-relaxed">
                Critical emergency presentation of multi-vessel coronary
                occlusions requiring immediate, sub-60-minute door-to-balloon
                primary angioplasty protocols.
              </p>
            </div>
            <div>
              <div className="font-serif text-[clamp(80px,14vw,180px)] font-light leading-[0.8] text-black mb-4">
                02
              </div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-black mb-2">
                Solution
              </p>
              <p className="text-base text-black/70 max-w-md leading-relaxed">
                Deployment of round-the-clock digital catheterization suites and
                intensive CCU hemodynamic monitoring to restore complete
                myocardial perfusion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CASE STUDY 2 */}
      <section className="border-t border-black/10 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="font-serif text-[clamp(36px,6vw,76px)] font-bold leading-none tracking-[-0.02em] text-black">
              Center for Neurosciences &amp; Stroke
            </h3>
            <span className="text-xs tracking-[0.12em] uppercase text-black/60">
              Microsurgery &bull; Comprehensive Stroke Care
            </span>
          </div>

          <div className="relative my-8 aspect-[16/9] w-full overflow-hidden bg-black/5 sm:my-10">
            <Image
              src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1600&q=80"
              alt="Neurosciences & Stroke Unit"
              fill
              sizes="100vw"
              className="object-cover grayscale contrast-[1.02]"
            />
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16">
            <div>
              <div className="font-serif text-[clamp(80px,14vw,180px)] font-light leading-[0.8] text-black mb-4">
                01
              </div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-black mb-2">
                Background
              </p>
              <p className="text-base text-black/70 max-w-md leading-relaxed">
                Acute cerebral ischemia and complex skull-base lesions
                necessitating continuous micro-navigation and
                ultra-high-definition imaging.
              </p>
            </div>
            <div>
              <div className="font-serif text-[clamp(80px,14vw,180px)] font-light leading-[0.8] text-black mb-4">
                02
              </div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-black mb-2">
                Solution
              </p>
              <p className="text-base text-black/70 max-w-md leading-relaxed">
                Integration of 128-slice CT perfusion with specialized neuro-ICU
                protocols to achieve rapid intravenous thrombolysis and
                neurological recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CASE STUDY 3 */}
      <section className="border-t border-black/10 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="font-serif text-[clamp(36px,6vw,76px)] font-bold leading-none tracking-[-0.02em] text-black">
              Modular Surgical &amp; Trauma Complex
            </h3>
            <span className="text-xs tracking-[0.12em] uppercase text-black/60">
              Laminar Flow Theaters &bull; Level-1 Trauma
            </span>
          </div>

          <div className="relative my-8 aspect-[16/9] w-full overflow-hidden bg-black/5 sm:my-10">
            <Image
              src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1600&q=80"
              alt="Modular Surgical Suites"
              fill
              sizes="100vw"
              className="object-cover grayscale contrast-[1.02]"
            />
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16">
            <div>
              <div className="font-serif text-[clamp(80px,14vw,180px)] font-light leading-[0.8] text-black mb-4">
                01
              </div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-black mb-2">
                Background
              </p>
              <p className="text-base text-black/70 max-w-md leading-relaxed">
                High-velocity poly-trauma injuries and complex orthopedic joint
                reconstructions requiring zero-tolerance infection containment.
              </p>
            </div>
            <div>
              <div className="font-serif text-[clamp(80px,14vw,180px)] font-light leading-[0.8] text-black mb-4">
                02
              </div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-black mb-2">
                Solution
              </p>
              <p className="text-base text-black/70 max-w-md leading-relaxed">
                Ultra-clean positive pressure air filtration with dedicated
                orthopedic and thoracic trauma teams providing round-the-clock
                surgical intervention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FEATURE BAND (Full bleed wide 16:9 monochrome photograph) */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
        <Image
          src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=2000&q=80"
          alt="Feature Architectural Perspective"
          fill
          sizes="100vw"
          className="object-cover grayscale contrast-[1.02]"
        />
      </div>

      {/* SECTION 9: WHAT WE DO */}
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
          <h2 className="font-serif text-[clamp(48px,8vw,110px)] font-bold leading-none tracking-[-0.02em] text-black mb-16">
            What we do
          </h2>

          <div className="border-b border-black">
            {SERVICES.map((service) => (
              <Link
                key={service.name}
                href={service.url}
                className="group flex items-center justify-between border-t border-black py-8 transition-transform duration-200 hover:translate-x-3 sm:py-10"
              >
                <span className="font-serif text-[clamp(28px,5vw,68px)] font-normal tracking-[-0.01em] text-black">
                  {service.name}
                </span>
                <span className="text-[clamp(28px,4vw,54px)] font-light text-black transition-transform duration-200 group-hover:translate-x-2">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: CTA (Full-bleed dark section #000000) */}
      <section className="bg-black py-32 text-center text-white sm:py-44 lg:py-52">
        <div className="mx-auto max-w-[1080px] px-6 sm:px-12">
          <h2 className="font-serif text-[clamp(42px,8vw,110px)] font-normal leading-[1.05] tracking-[-0.02em] text-white mb-12">
            Elevating tertiary healthcare and setting the national standard for
            clinical excellence.
          </h2>
          <Link
            href="/doctors"
            className="inline-flex items-center justify-center rounded-full border border-white bg-transparent px-8 py-3.5 text-xs font-medium tracking-[0.12em] uppercase text-white transition-colors duration-200 hover:bg-white hover:text-black"
          >
            Work with us
          </Link>
        </div>
      </section>

      {/* Unobtrusive Triage Widget */}
      <ChatWidget />
    </div>
  );
}
