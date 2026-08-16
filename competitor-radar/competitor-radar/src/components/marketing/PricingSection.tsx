import { useNavigate } from "react-router-dom";
import { plans } from "../../data/plans";
import { Button } from "../ui/Button";

export function PricingSection() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="border-t border-border-soft bg-surface-subtle py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-signal-dark">
            Pricing
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Simple pricing, no surprises.
          </h2>
          <p className="mt-4 text-ink-soft">Start free. Upgrade when you need to watch more competitors.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-[var(--radius-card)] border bg-white p-7 ${
                plan.highlight
                  ? "border-signal shadow-lg shadow-signal/10"
                  : "border-border"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-7 rounded-full bg-signal px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold text-ink">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold text-ink">
                  {plan.currency}{plan.price}
                </span>
                <span className="text-sm text-ink-soft">/month</span>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="#0E7C86" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? "primary" : "secondary"}
                fullWidth
                className="mt-7"
                onClick={() => navigate("/sign-up")}
              >
                {plan.price === 0 ? "Start for free" : `Choose ${plan.name}`}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
