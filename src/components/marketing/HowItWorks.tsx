const steps = [
  {
    label: "Add a competitor",
    title: "Point Competitor Radar at their website",
    description:
      "Add a competitor's homepage, pricing page, or any URL you want watched. Choose how often it should be checked.",
  },
  {
    label: "We watch, quietly",
    title: "Your competitor's site is checked automatically",
    description:
      "Competitor Radar checks the page on your schedule and compares it against the last version it saw.",
  },
  {
    label: "Understand what changed",
    title: "Meaningful changes are explained in plain language",
    description:
      "When something worth knowing changes — a price, a new plan, a promotion — you get a plain-language explanation, not a wall of diffs.",
  },
  {
    label: "Stay in the loop",
    title: "Get notified without checking manually",
    description:
      "Review alerts in your dashboard, or get them by email so you're never the last to know.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border-soft bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-signal-dark">
            How it works
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Four steps, then it runs itself.
          </h2>
          <p className="mt-4 text-ink-soft">
            Set it up once. Competitor Radar handles the watching, the comparing, and the
            explaining.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-medium text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-signal-dark">
                {step.label}
              </p>
              <h3 className="mt-2 font-display text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
