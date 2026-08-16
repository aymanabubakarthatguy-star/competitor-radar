import type { ReactNode } from "react";

type Tone = "signal" | "alert" | "amber" | "mint" | "neutral";

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  dot?: boolean;
}

const toneClasses: Record<Tone, string> = {
  signal: "bg-signal-tint text-signal-dark",
  alert: "bg-alert-tint text-alert",
  amber: "bg-amber-tint text-amber",
  mint: "bg-mint-tint text-mint",
  neutral: "bg-surface-sunken text-ink-soft",
};

const dotClasses: Record<Tone, string> = {
  signal: "bg-signal",
  alert: "bg-alert",
  amber: "bg-amber",
  mint: "bg-mint",
  neutral: "bg-ink-faint",
};

export function Badge({ tone = "neutral", children, dot }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[tone]}`} />}
      {children}
    </span>
  );
}
