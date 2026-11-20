"use client";

import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const routes = [
    { name: "Consultants", url: "/doctors" },
    { name: "About", url: "/about-us" },
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
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 sm:px-12 lg:px-16">
        {/* Studio / Hospital Name Top-Left */}
        <Link
          href="/"
          className="text-xs font-semibold tracking-[0.12em] uppercase text-black transition-opacity hover:opacity-70"
        >
          Bangladesh Specialized Hospital
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {routes.map((route) => {
            const isActive = pathname.startsWith(route.url);
            return (
              <Link
                key={route.name}
                href={route.url}
                className={cn(
                  "text-xs tracking-[0.12em] uppercase transition-colors hover:text-black",
                  isActive ? "font-bold text-black" : "text-black/60",
                )}
              >
                {route.name}
              </Link>
            );
          })}

          {role && (
            <Link
              href={dashboardRoute[role]}
              className="inline-flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase text-black/60 hover:text-black"
            >
              <LayoutDashboard className="size-3.5" />
              Portal
            </Link>
          )}

          {!isLoading && !data && (
            <Link
              href="/login"
              className="text-xs tracking-[0.12em] uppercase text-black/60 hover:text-black"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Work with us pill button */}
        <div className="hidden items-center gap-3 md:flex">
          {!isLoading && !data ? (
            <Link
              href="/doctors"
              className="inline-flex items-center justify-center rounded-full border border-black bg-transparent px-7 py-3 text-xs font-medium tracking-[0.12em] uppercase text-black transition-colors duration-200 hover:bg-black hover:text-white"
            >
              Work with us
            </Link>
          ) : (
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="rounded-full border-black text-xs tracking-[0.12em] uppercase"
            >
              <LogOut className="size-3.5" />
              Sign Out
            </Button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-black"
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </Button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-black/10 bg-white px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {routes.map((route) => (
              <Link
                key={route.name}
                href={route.url}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium tracking-[0.12em] uppercase text-black"
              >
                {route.name}
              </Link>
            ))}
            {role && (
              <Link
                href={dashboardRoute[role]}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium tracking-[0.12em] uppercase text-black"
              >
                Portal Dashboard
              </Link>
            )}
            {!isLoading && !data && (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium tracking-[0.12em] uppercase text-black"
              >
                Portal Login
              </Link>
            )}
            <Link
              href="/doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full border border-black bg-black py-3 text-center text-xs font-medium tracking-[0.12em] uppercase text-white"
            >
              Work with us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
