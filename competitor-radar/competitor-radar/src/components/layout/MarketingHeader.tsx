import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RadarMark } from "../radar/RadarMark";
import { Button } from "../ui/Button";
import { APP_NAME } from "../../utils/constants";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "What we monitor", href: "#what-we-monitor" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <RadarMark size={30} />
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
            {APP_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <Button variant="ghost" size="sm" onClick={() => navigate("/log-in")}>
            Log in
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate("/sign-up")}>
            Start Monitoring
          </Button>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {open ? (
              <path d="M4 4L14 14M14 4L4 14" stroke="#0B1120" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path
                d="M2.5 5H15.5M2.5 9H15.5M2.5 13H15.5"
                stroke="#0B1120"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-border-soft bg-white px-5 pb-5 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink-soft hover:bg-surface-subtle hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <Button variant="secondary" onClick={() => navigate("/log-in")}>
              Log in
            </Button>
            <Button variant="primary" onClick={() => navigate("/sign-up")}>
              Start Monitoring
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
