import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["ADMIN", "SUPER_ADMIN"]}>
      {/* biome-ignore lint/a11y/useValidAriaRole: component prop */}
      <DashboardShell role="ADMIN">{children}</DashboardShell>
    </RoleGuard>
  );
}
