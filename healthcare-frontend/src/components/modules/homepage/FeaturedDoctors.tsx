"use client";

import { ArrowRight } from "lucide-react";
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
    <section className="border-y border-slate-200 bg-slate-50/60">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Consultant Directory
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Senior Specialist Doctors
            </h2>
            <p className="max-w-2xl text-xs text-slate-600 sm:text-sm">
              BMDC-registered consultants available for hospital and outpatient
              consultations at Bangladesh Specialized Hospital.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-white"
            render={
              <Link href="/doctors">
                Complete Directory
                <ArrowRight className="size-3.5" />
              </Link>
            }
            nativeButton={false}
          >
            Complete Directory
            <ArrowRight className="size-3.5" />
          </Button>
        </div>

        {isLoading ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="size-11 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-4/5" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        ) : doctors.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-xs text-slate-500">
            No doctors available right now. Please refresh shortly.
          </div>
        )}
      </div>
    </section>
  );
}
