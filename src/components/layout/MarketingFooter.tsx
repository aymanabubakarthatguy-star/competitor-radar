import { Link } from "react-router-dom";
import { RadarMark } from "../radar/RadarMark";
import { APP_NAME } from "../../utils/constants";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border-soft bg-surface-subtle">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2.5">
              <RadarMark size={26} />
              <span className="font-display text-[15px] font-semibold text-ink">{APP_NAME}</span>
            </Link>
            <p className="mt-3 text-sm text-ink-soft">
              Competitor monitoring for small businesses that don't have time to check ten
              websites a week.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Product</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-soft">
                <li><a href="#how-it-works" className="hover:text-ink">How it works</a></li>
                <li><a href="#what-we-monitor" className="hover:text-ink">What we monitor</a></li>
                <li><a href="#pricing" className="hover:text-ink">Pricing</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Account</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-soft">
                <li><Link to="/sign-up" className="hover:text-ink">Sign up</Link></li>
                <li><Link to="/log-in" className="hover:text-ink">Log in</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Support</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-soft">
                <li><a href="#faq" className="hover:text-ink">FAQ</a></li>
                <li><a href="mailto:hello@competitorradar.app" className="hover:text-ink">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</span>
          <span>Built for small businesses who want to stay a step ahead.</span>
        </div>
      </div>
    </footer>
  );
}
