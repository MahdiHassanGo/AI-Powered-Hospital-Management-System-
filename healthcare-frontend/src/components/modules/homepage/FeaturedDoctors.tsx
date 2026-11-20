"use client";

import { ArrowRight, Stethoscope } from "lucide-react";
import Link from "next/link";
import DoctorCard from "@/components/modules/doctors/doctor-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllPublicDoctors } from "@/hooks";

export default function FeaturedDoctors() {
  const { data, isLoading } = useGetAllPublicDoctors({
    page: 1,
    limit: 6,
    sortBy: "experienceYears",
    sortOrder: "desc",
  });

  const doctors = data?.data ?? [];

  return (
    <section className="border-y border-slate-200 bg-[#F4F6F8]">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:py-20">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
              <Stethoscope className="size-3.5 text-[#0A2647]" />
              <span>
                Medical Faculty &bull; Bangladesh Specialized Hospital
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Senior Consultant Faculty &amp; Specialists
            </h2>
            <p className="max-w-2xl text-xs text-slate-600 sm:text-sm">
              All physicians are certified by the Bangladesh Medical and Dental
              Council (BMDC), holding post-graduate degrees (FCPS, MD, MS, FRCS,
              MRCP) and extensive clinical experience.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-300 bg-white"
            render={
              <Link href="/doctors">
                View Full Specialist Directory
                <ArrowRight className="size-3.5" />
              </Link>
            }
            nativeButton={false}
          >
            View Full Specialist Directory
            <ArrowRight className="size-3.5" />
          </Button>
        </div>

        {isLoading ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="space-y-3 rounded-lg border border-slate-200 bg-white p-5 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="size-12 rounded-md" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-4/5" />
                <Skeleton className="h-9 w-full" />
              </div>
            ))}
          </div>
        ) : doctors.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-xs text-slate-500">
            Consultant directory is loading. Please refresh shortly.
          </div>
        )}
      </div>
    </section>
  );
}
