import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "dark";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-signal text-white hover:bg-signal-dark shadow-sm shadow-signal/20",
  secondary:
    "bg-white text-ink border border-border hover:border-ink-faint hover:bg-surface-subtle",
  ghost: "bg-transparent text-ink-soft hover:text-ink hover:bg-surface-subtle",
  danger: "bg-alert text-white hover:bg-red-700",
  dark: "bg-navy text-white hover:bg-navy-soft border border-navy-border",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-base px-6 py-3.5 gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-[var(--radius-control)] font-semibold transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
