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
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Spinner />
          <span className="text-sm text-muted-foreground">
            Loading today&apos;s slots…
          </span>
        </div>
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 text-center text-sm text-rose-700">
        Could not load consultation slots. Please try again.
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-slate-50/70 p-8 text-center">
        <Calendar className="mx-auto size-8 text-slate-400" />
        <p className="mt-3 text-sm font-medium text-slate-800">
          No open slots published for today
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Please check back later or call Bangladesh Specialized Hospital
          hotline <strong>10633</strong> for scheduling assistance.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-slate-50/60 p-4 transition-colors hover:border-primary/35 hover:bg-white"
          >
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <Calendar className="size-4 text-primary" />
                <span>{format(schedule.startDateTime, "eeee, PP")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Clock className="size-4 text-slate-400" />
                <span>
                  {format(schedule.startDateTime, "p")} &ndash;{" "}
                  {format(schedule.endDateTime, "p")}
                </span>
              </div>
              {schedule.availableSlots != null && (
                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  <Users className="size-3.5" />
                  {schedule.availableSlots} slots left
                </div>
              )}
            </div>
            <Button
              disabled={bookingPending}
              onClick={() => handleBooking(schedule)}
            >
              {bookingPending ? "Booking..." : "Book Now"}
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
            <DialogTitle>Booking Successful</DialogTitle>
            <DialogDescription>
              Please complete payment within 10 minutes to confirm your
              appointment at Bangladesh Specialized Hospital.
            </DialogDescription>
            <span className="pt-2 text-sm font-medium text-slate-800">
              Date &amp; Time:{" "}
              {confirmation
                ? `${format(confirmation.schedule.startDateTime, "PPP")} at ${format(confirmation.schedule.startDateTime, "p")}`
                : "-"}
            </span>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmation(null)}>
              Pay Later
            </Button>
            <Button
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
