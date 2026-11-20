"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Clock,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  PhoneCall,
  Search,
  Stethoscope,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const routes = [
    { name: "Hospital Home", url: "/" },
    { name: "Find a Doctor", url: "/doctors" },
    { name: "Clinical Specialties", url: "/doctors?specialization=" },
    { name: "About Hospital", url: "/about-us" },
  ];

  const dashboardRoute: Record<UserRole, string> = {
    SUPER_ADMIN: "/admin",
    ADMIN: "/admin",
    DOCTOR: "/doctor",
    PATIENT: "/dashboard",
  };

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const role: UserRole | undefined = data?.data?.role;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Signed out",
          description: "You have signed out of your portal session.",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
        setMobileMenuOpen(false);
      },
      onError: () => {
        toast.add({
          title: "Sign out failed",
          description: "Could not end session. Please try again.",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white shadow-xs">
      {/* Top Clinical & Emergency Desk Bar */}
      <div className="border-b border-[#0f2c4d] bg-[#071c33] text-slate-200">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <PhoneCall className="size-3.5" />
              24/7 Emergency &amp; Ambulance Hotline:{" "}
              <a
                href="tel:10633"
                className="font-mono text-sm font-bold tracking-wider text-white underline underline-offset-2"
              >
                10633
              </a>
            </span>
            <span className="hidden items-center gap-1.5 text-slate-300 sm:inline-flex">
              <MapPin className="size-3.5 text-slate-400" />
              21 Shyamoli, Mirpur Road, Dhaka-1207
            </span>
            <span className="hidden items-center gap-1.5 text-slate-300 md:inline-flex">
              <Clock className="size-3.5 text-slate-400" />
              Level-1 Trauma, CCU &amp; Diagnostics Open 24 Hours
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-1 text-slate-300 transition-colors hover:text-white"
            >
              <Stethoscope className="size-3.5 text-teal-400" />
              Join Medical Panel
            </Link>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-[11px] text-slate-400">
              BMDC Registered
            </span>
          </div>
        </div>
      </div>

      {/* Main Hospital Navigation Header */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex items-center gap-3.5 transition-opacity hover:opacity-95"
        >
          <Logo />
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-tight text-slate-950 sm:text-xl leading-tight">
              Bangladesh Specialized Hospital
            </span>
            <span className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
              Tertiary Medical Center &bull; Center of Excellence &bull; Dhaka
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {routes.map((route) => {
            const isActive =
              route.url === "/"
                ? pathname === "/"
                : pathname.startsWith(route.url);
            return (
              <Link
                key={route.name}
                href={route.url}
                className={cn(
                  "rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-100 font-semibold text-slate-950"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-950",
                )}
              >
                {route.name}
              </Link>
            );
          })}

          {role && (
            <Link
              href={dashboardRoute[role]}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                pathname.startsWith(dashboardRoute[role])
                  ? "bg-slate-100 font-semibold text-slate-950"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-950",
              )}
            >
              <LayoutDashboard className="size-4" />
              Patient Portal
            </Link>
          )}
        </nav>

        {/* Desktop Direct Actions */}
        <div className="hidden items-center gap-2.5 sm:flex">
          <Button
            variant="outline"
            size="sm"
            render={
              <Link href="/doctors" className="flex items-center gap-1.5">
                <Search className="size-3.5" />
                Search Doctors
              </Link>
            }
            nativeButton={false}
          >
            Search Doctors
          </Button>

          {!isLoading && !data && (
            <>
              <Button
                variant="ghost"
                size="sm"
                render={<Link href="/login">Portal Login</Link>}
                nativeButton={false}
              >
                Portal Login
              </Button>
              <Button
                size="sm"
                className="bg-[#0A2647] text-white hover:bg-[#071c33]"
                render={
                  <Link href="/doctors" className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    Book Appointment
                  </Link>
                }
                nativeButton={false}
              >
                Book Appointment
              </Button>
            </>
          )}
          {!isLoading && data && (
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="size-4" />
              Sign Out
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-1">
            {routes.map((route) => {
              const isActive =
                route.url === "/"
                  ? pathname === "/"
                  : pathname.startsWith(route.url);
              return (
                <Link
                  key={route.name}
                  href={route.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-slate-100 font-semibold text-slate-950"
                      : "text-slate-700 hover:bg-slate-50",
                  )}
                >
                  {route.name}
                </Link>
              );
            })}
            {role && (
              <Link
                href={dashboardRoute[role]}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Patient Portal Dashboard
              </Link>
            )}
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
            {!isLoading && !data && (
              <>
                <Button
                  variant="outline"
                  className="w-full"
                  render={
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Portal Login
                    </Link>
                  }
                  nativeButton={false}
                >
                  Portal Login
                </Button>
                <Button
                  className="w-full bg-[#0A2647] text-white hover:bg-[#071c33]"
                  render={
                    <Link
                      href="/doctors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Book Appointment
                    </Link>
                  }
                  nativeButton={false}
                >
                  Book Appointment
                </Button>
              </>
            )}
            {!isLoading && data && (
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full"
              >
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
