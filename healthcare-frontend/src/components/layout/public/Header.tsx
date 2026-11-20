"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  Clock,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  PhoneCall,
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
    { name: "Home", url: "/" },
    { name: "Specialist Directory", url: "/doctors" },
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
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      {/* Clinical Utility Top Bar */}
      <div className="border-b border-slate-800 bg-slate-900 text-slate-200">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <PhoneCall className="size-3.5" />
              Emergency Hotline:{" "}
              <strong className="font-mono font-bold tracking-wider text-white">
                10633
              </strong>
            </span>
            <span className="hidden items-center gap-1.5 text-slate-300 sm:inline-flex">
              <MapPin className="size-3.5 text-slate-400" />
              21 Shyamoli, Mirpur Road, Dhaka-1207
            </span>
            <span className="hidden items-center gap-1.5 text-slate-300 md:inline-flex">
              <Clock className="size-3.5 text-slate-400" />
              24/7 Trauma, ICU &amp; Diagnostics
            </span>
          </div>
          <Link
            href="/apply"
            className="inline-flex items-center gap-1.5 font-medium text-slate-300 transition-colors hover:text-white"
          >
            <Stethoscope className="size-3.5 text-teal-400" />
            Join Medical Panel
          </Link>
        </div>
      </div>

      {/* Main Clinical Navigation Bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <Logo />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
              Bangladesh Specialized Hospital
            </span>
            <span className="text-[11px] font-medium tracking-normal text-slate-500">
              Tertiary Care &bull; Dhaka
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {routes.map((route) => {
            const isActive =
              route.url === "/"
                ? pathname === "/"
                : pathname.startsWith(route.url);
            return (
              <Link
                key={route.url}
                href={route.url}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-100 font-semibold text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
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
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                pathname.startsWith(dashboardRoute[role])
                  ? "bg-slate-100 font-semibold text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <LayoutDashboard className="size-4" />
              Portal
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          {!isLoading && !data && (
            <>
              <Button
                variant="outline"
                size="sm"
                render={<Link href="/login">Portal Login</Link>}
                nativeButton={false}
              >
                Portal Login
              </Button>
              <Button
                size="sm"
                render={<Link href="/doctors">Book Consultation</Link>}
                nativeButton={false}
              >
                Book Consultation
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
          className="md:hidden"
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
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-md md:hidden">
          <nav className="flex flex-col gap-1">
            {routes.map((route) => {
              const isActive =
                route.url === "/"
                  ? pathname === "/"
                  : pathname.startsWith(route.url);
              return (
                <Link
                  key={route.url}
                  href={route.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-slate-100 font-semibold text-slate-900"
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
                Portal Dashboard
              </Link>
            )}
          </nav>

          <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
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
                  className="w-full"
                  render={
                    <Link
                      href="/doctors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Book Consultation
                    </Link>
                  }
                  nativeButton={false}
                >
                  Book Consultation
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
