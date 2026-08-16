import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { RadarSweep } from "../radar/RadarSweep";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-border bg-navy-soft px-3.5 py-1.5 text-xs font-medium text-signal-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-bright animate-ping-soft" />
            Live competitor monitoring
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Know What Your <br className="hidden sm:block" />
            Competitors Are Doing.
          </h1>

          <p className="mt-6 max-w-lg text-lg text-white/65">
            Competitor Radar monitors your competitors' websites and alerts you when
            important things change.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" size="lg" onClick={() => navigate("/sign-up")}>
              Start Monitoring
            </Button>
            <a href="#how-it-works">
              <Button variant="dark" size="lg" fullWidth>
                See How It Works
              </Button>
            </a>
          </div>

          <p className="mt-5 text-xs text-white/40">No credit card required · Free plan available</p>
        </div>

        <div className="relative flex items-center justify-center">
          <RadarSweep size={380} className="hidden sm:block" />
          <RadarSweep size={260} className="sm:hidden" />

          <div className="absolute -bottom-4 left-1/2 w-[min(360px,92%)] -translate-x-1/2 rounded-2xl border border-navy-border bg-navy-soft/95 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:-bottom-10">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-alert" />
              <div>
                <p className="text-sm font-semibold text-white">Price Change Detected</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                  Competitor increased their Pro plan from{" "}
                  <span className="font-mono text-white/85">€29/month</span> to{" "}
                  <span className="font-mono text-white/85">€39/month</span>.
                </p>
                <span className="mt-2 inline-block rounded-full bg-alert/15 px-2.5 py-1 font-mono text-xs font-semibold text-red-300">
                  +34% price increase
                </span>
                <div className="mt-3 rounded-lg bg-white/5 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-signal-bright">
                    AI Insight
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    The competitor appears to be repositioning this plan toward a more
                    premium price point.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
