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
    <section className="border-y bg-slate-50/70">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wider text-primary uppercase">
              Meet Our Consultants
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Senior Specialist Doctors
            </h2>
            <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
              Experienced, BMDC-registered physicians dedicated to delivering
              accurate diagnosis and compassionate treatment.
            </p>
          </div>
          <Button
            variant="outline"
            className="bg-white"
            render={
              <Link href="/doctors">
                View All Doctors
                <ArrowRight className="size-4" />
              </Link>
            }
            nativeButton={false}
          >
            View All Doctors
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="space-y-3 rounded-2xl border bg-white p-5"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="size-13 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
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
          <div className="mt-8 rounded-2xl border bg-white p-10 text-center text-muted-foreground">
            No doctors available at the moment. Please check back shortly.
          </div>
        )}
      </div>
    </section>
  );
}
