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
    { name: "Doctors", url: "/doctors" },
    { name: "About Us", url: "/about-us" },
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
          title: "Logged out",
          description: "You have been signed out successfully.",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
        setMobileMenuOpen(false);
      },
      onError: () => {
        toast.add({
          title: "Logout failed",
          description: "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/95 backdrop-blur-md">
      {/* Top hospital emergency & utility bar */}
      <div className="bg-slate-900 text-slate-200">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
              <PhoneCall className="size-3.5" />
              24/7 Emergency Hotline: 10633
            </span>
            <span className="hidden items-center gap-1.5 text-slate-300 sm:inline-flex">
              <MapPin className="size-3.5 text-sky-400" />
              21 Shyamoli, Mirpur Road, Dhaka-1207
            </span>
            <span className="hidden items-center gap-1.5 text-slate-300 md:inline-flex">
              <Clock className="size-3.5 text-sky-400" />
              Open 24 Hours
            </span>
          </div>
          <Link
            href="/apply"
            className="inline-flex items-center gap-1 font-medium text-sky-300 transition-colors hover:text-white"
          >
            <Stethoscope className="size-3.5" />
            Join as a Doctor
          </Link>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <Logo />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
              Bangladesh Specialized Hospital
            </span>
            <span className="text-[11px] font-medium tracking-wide text-primary">
              Center of Medical Excellence
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
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
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
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
                "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                pathname.startsWith(dashboardRoute[role])
                  ? "bg-primary/10 text-primary"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          {!isLoading && !data && (
            <>
              <Button
                variant="outline"
                render={<Link href="/login">Login</Link>}
                nativeButton={false}
              >
                Login
              </Button>
              <Button
                render={<Link href="/doctors">Book Appointment</Link>}
                nativeButton={false}
              >
                Book Appointment
              </Button>
            </>
          )}
          {!isLoading && data && (
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="size-4" />
              Logout
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
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

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="border-t bg-white px-4 py-4 shadow-lg md:hidden">
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
                    "rounded-lg px-3 py-2.5 text-sm font-medium",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-slate-700 hover:bg-slate-100",
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
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t pt-4">
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
                      Login
                    </Link>
                  }
                  nativeButton={false}
                >
                  Login
                </Button>
                <Button
                  className="w-full"
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
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
