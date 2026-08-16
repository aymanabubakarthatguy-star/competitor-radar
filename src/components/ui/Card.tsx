import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export function Card({ children, padded = true, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-border bg-white ${
        padded ? "p-6" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
