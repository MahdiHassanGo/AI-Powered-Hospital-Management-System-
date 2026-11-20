"use client";

import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Stethoscope,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DoctorCard from "@/components/modules/doctors/doctor-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllPublicDoctors } from "@/hooks";
import useDebounce from "@/hooks/debounce.hook";
import type { PublicDoctorParams } from "@/types";

const SPECIALIZATIONS = [
  "All Specialties",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Gynecology",
  "Gastroenterology",
  "Psychiatry",
  "ENT",
  "Endocrinology",
  "Nephrology",
  "Pulmonology",
  "Oncology",
  "Urology",
  "Ophthalmology",
  "Rheumatology",
  "Hematology",
  "General Surgery",
  "Neurosurgery",
  "Internal Medicine",
];

type SortOption = "experience_desc" | "fee_asc" | "fee_desc" | "newest";

const SORT_MAP: Record<
  SortOption,
  { sortBy: string; sortOrder: "asc" | "desc"; label: string }
> = {
  experience_desc: {
    sortBy: "experienceYears",
    sortOrder: "desc",
    label: "Experience: High to Low",
  },
  fee_asc: {
    sortBy: "consultationFee",
    sortOrder: "asc",
    label: "Fee: Low to High",
  },
  fee_desc: {
    sortBy: "consultationFee",
    sortOrder: "desc",
    label: "Fee: High to Low",
  },
  newest: {
    sortBy: "createdAt",
    sortOrder: "desc",
    label: "Recently Appointed",
  },
};

export default function PublicDoctorList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("searchTerm") ?? "";
  const initialSpec = searchParams.get("specialization") ?? "";

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [specialization, setSpecialization] = useState(initialSpec);
  const [sortOption, setSortOption] = useState<SortOption>("experience_desc");
  const [page, setPage] = useState(1);

  // Sync URL query params
  useEffect(() => {
    setSearchInput(searchParams.get("searchTerm") ?? "");
    setSpecialization(searchParams.get("specialization") ?? "");
    setPage(1);
  }, [searchParams]);

  const debouncedSearch = useDebounce(searchInput.trim(), 350);

  const { sortBy, sortOrder } = SORT_MAP[sortOption];

  const queryParams: PublicDoctorParams = {
    page,
    limit: 12,
    sortBy,
    sortOrder,
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
    ...(specialization ? { specialization } : {}),
  };

  const { data, isLoading, isFetching, isError } =
    useGetAllPublicDoctors(queryParams);

  const doctors = data?.data ?? [];
  const meta = data?.meta;
  const total = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 1;

  const hasActiveFilters = Boolean(searchInput.trim() || specialization);

  const clearFilters = () => {
    setSearchInput("");
    setSpecialization("");
    setPage(1);
    router.replace("/doctors", { scroll: false });
  };

  return (
    <div className="space-y-5">
      {/* Search & Filter Control Bar */}
      <div className="border border-black/10 bg-white p-5">
        <div className="grid gap-3 md:grid-cols-12">
          {/* Search Input */}
          <div className="relative md:col-span-5">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/40" />
            <Input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setPage(1);
              }}
              placeholder="Search by physician name, degree, or specialty..."
              className="h-10 pl-9 text-xs rounded-none border-black/20 focus-visible:ring-black"
            />
          </div>

          {/* Specialization Select */}
          <div className="relative md:col-span-4">
            <Stethoscope className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/40" />
            <select
              aria-label="Filter by specialization"
              value={specialization}
              onChange={(e) => {
                setSpecialization(e.target.value);
                setPage(1);
              }}
              className="h-10 w-full rounded-none border border-black/20 bg-white pr-3 pl-9 text-xs text-black outline-none focus:border-black"
            >
              {SPECIALIZATIONS.map((spec) => (
                <option
                  key={spec}
                  value={spec === "All Specialties" ? "" : spec}
                >
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Select */}
          <div className="relative md:col-span-3">
            <SlidersHorizontal className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/40" />
            <select
              aria-label="Sort doctors"
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value as SortOption);
                setPage(1);
              }}
              className="h-10 w-full rounded-none border border-black/20 bg-white pr-3 pl-9 text-xs text-black outline-none focus:border-black"
            >
              {Object.entries(SORT_MAP).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-black/10 pt-4">
          {[
            "Cardiology",
            "Dermatology",
            "Neurology",
            "Orthopedics",
            "Pediatrics",
            "Gynecology",
            "Gastroenterology",
            "Internal Medicine",
          ].map((spec) => {
            const active = specialization.toLowerCase() === spec.toLowerCase();
            return (
              <button
                key={spec}
                type="button"
                onClick={() => {
                  setSpecialization(active ? "" : spec);
                  setPage(1);
                }}
                className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors ${
                  active
                    ? "bg-black text-white"
                    : "border border-black/20 text-black hover:border-black"
                }`}
              >
                {spec}
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto inline-flex items-center gap-1 text-xs font-medium tracking-wide uppercase text-black/60 hover:text-black"
            >
              <X className="size-3.5" />
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Directory Count Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <p>
          {isLoading ? (
            "Loading verified directory..."
          ) : (
            <>
              Showing{" "}
              <span className="font-mono font-semibold tabular-nums text-slate-900">
                {doctors.length}
              </span>{" "}
              of{" "}
              <span className="font-mono font-semibold tabular-nums text-slate-900">
                {total}
              </span>{" "}
              verified specialists
              {specialization ? (
                <>
                  {" "}
                  in{" "}
                  <span className="font-semibold text-slate-900">
                    {specialization}
                  </span>
                </>
              ) : null}
            </>
          )}
        </p>
        {isFetching && !isLoading && (
          <span className="text-xs text-teal-700">Updating directory…</span>
        )}
      </div>

      {/* Doctor Grid */}
      {isLoading ? (
        <PublicDoctorListLoading />
      ) : isError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-8 text-center">
          <p className="text-xs font-semibold text-rose-700">
            Could not retrieve specialist directory.
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Please ensure network connectivity and try again, or call hospital
            hotline 10633.
          </p>
        </div>
      ) : doctors.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <Stethoscope className="mx-auto size-8 text-slate-400" />
          <h3 className="mt-3 text-sm font-semibold text-slate-900">
            No matching consultants found
          </h3>
          <p className="mt-1 text-xs text-slate-600">
            Try revising your search term or select &quot;All Specialties&quot;.
          </p>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={clearFilters}
            >
              Reset Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-600">
            Page{" "}
            <span className="font-mono font-semibold tabular-nums text-slate-900">
              {page}
            </span>{" "}
            of{" "}
            <span className="font-mono font-semibold tabular-nums text-slate-900">
              {totalPages}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => {
                setPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => {
                setPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function PublicDoctorListLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}
