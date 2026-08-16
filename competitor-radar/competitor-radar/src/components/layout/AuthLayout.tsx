import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { RadarMark } from "../radar/RadarMark";
import { APP_NAME } from "../../utils/constants";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2.5">
            <RadarMark size={28} />
            <span className="font-display text-[15px] font-semibold text-ink">{APP_NAME}</span>
          </Link>

          <h1 className="mt-10 font-display text-2xl font-semibold tracking-tight text-ink">
            {title}
          </h1>
          <p className="mt-2 text-sm text-ink-soft">{subtitle}</p>

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-7 text-sm text-ink-soft">{footer}</div>}
        </div>
      </div>

      <div className="relative hidden w-1/2 items-center justify-center bg-navy lg:flex">
        <div className="mx-auto max-w-sm px-10 text-center text-white">
          <div className="flex items-center gap-2.5 rounded-full border border-navy-border bg-navy-soft px-3.5 py-1.5 text-xs font-medium text-signal-bright mx-auto w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-bright" />
            Price change detected
          </div>
          <p className="mt-6 font-display text-xl font-medium leading-snug text-white/90">
            "Competitor increased their Pro plan from €29/month to €39/month."
          </p>
          <p className="mt-4 text-sm text-white/50">
            Alerts like this land in your dashboard the moment something worth knowing changes.
          </p>
        </div>
      </div>
    </div>
  );
}
