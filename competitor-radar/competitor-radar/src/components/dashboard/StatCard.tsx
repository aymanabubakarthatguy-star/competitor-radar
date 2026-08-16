import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  icon: ReactNode;
  tone?: "signal" | "alert" | "neutral";
}

const toneClasses: Record<string, string> = {
  signal: "bg-signal-tint text-signal-dark",
  alert: "bg-alert-tint text-alert",
  neutral: "bg-surface-sunken text-ink-soft",
};

export function StatCard({ label, value, hint, icon, tone = "neutral" }: StatCardProps) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ink-soft">{label}</p>
        <span className={`flex h-8 w-8 items-center justify-center rounded-full ${toneClasses[tone]}`}>
          {icon}
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-faint">{hint}</p>}
    </div>
  );
}
