"use client";

import { format } from "date-fns";
import { Calendar, Clock, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  useBookAppointment,
  useGetMe,
  useGetTodayScheduleByDoctor,
} from "@/hooks";
import type { Schedule } from "@/types";

interface BookingConfirmation {
  schedule: Schedule;
  paymentUrl: string;
}

export default function DoctorBooking({ doctorId }: { doctorId: string }) {
  const router = useRouter();

  const { data: me, isPending: mePending } = useGetMe();
  const { data, isPending, error } = useGetTodayScheduleByDoctor({ doctorId });
  const { mutate: book, isPending: bookingPending } = useBookAppointment();
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null,
  );

  const schedules = data?.data ?? [];

  const handleBooking = (schedule: Schedule) => {
    if (!mePending && !me?.data) {
      router.push("/login");
      return;
    }

    book(
      { scheduleId: schedule.id },
      {
        onSuccess: (res) => {
          setConfirmation({ paymentUrl: res.data.paymentUrl, schedule });
        },
      },
    );
  };

  if (isPending) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Spinner />
          <span className="text-xs text-muted-foreground">
            Checking today&apos;s consultation slots…
          </span>
        </div>
        <Skeleton className="h-14 w-full rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50/50 p-4 text-center text-xs text-rose-700">
        Could not load consultation slots. Please try refreshing.
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-6 text-center">
        <Calendar className="mx-auto size-6 text-slate-400" />
        <p className="mt-2 text-xs font-semibold text-slate-800">
          No open slots published for today
        </p>
        <p className="mt-1 text-xs text-slate-500">
          For next-day appointments or emergency triage, contact Bangladesh
          Specialized Hospital hotline <strong>10633</strong>.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2.5">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-3.5 transition-colors hover:border-slate-300 hover:bg-white"
          >
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                <Calendar className="size-3.5 text-slate-500" />
                <span>{format(schedule.startDateTime, "eeee, PP")}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono tabular-nums text-slate-600">
                <Clock className="size-3.5 text-slate-400" />
                <span>
                  {format(schedule.startDateTime, "p")} &ndash;{" "}
                  {format(schedule.endDateTime, "p")}
                </span>
              </div>
              {schedule.availableSlots != null && (
                <div className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-medium tabular-nums text-emerald-800">
                  <Users className="size-3" />
                  {schedule.availableSlots} slots left
                </div>
              )}
            </div>
            <Button
              size="sm"
              disabled={bookingPending}
              onClick={() => handleBooking(schedule)}
            >
              {bookingPending ? "Reserving..." : "Book Slot"}
            </Button>
          </div>
        ))}
      </div>

      <Dialog
        open={!!confirmation}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmation(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Consultation Slot Reserved</DialogTitle>
            <DialogDescription>
              Complete payment within 10 minutes to confirm your appointment at
              Bangladesh Specialized Hospital.
            </DialogDescription>
            <span className="pt-2 font-mono text-xs font-semibold tabular-nums text-slate-900">
              Schedule:{" "}
              {confirmation
                ? `${format(confirmation.schedule.startDateTime, "PPP")} at ${format(confirmation.schedule.startDateTime, "p")}`
                : "-"}
            </span>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmation(null)}
            >
              Pay Later
            </Button>
            <Button
              size="sm"
              onClick={() => {
                if (confirmation) {
                  window.location.href = confirmation.paymentUrl;
                }
              }}
            >
              Pay Now with bKash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
