import { useState } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardTopbar } from "./DashboardTopbar";

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function DashboardLayout({ title, subtitle, children }: DashboardLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface-subtle">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileNavOpen(false)} />
          <div className="relative">
            <Sidebar onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardTopbar title={title} subtitle={subtitle} onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
