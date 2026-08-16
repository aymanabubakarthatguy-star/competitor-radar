const categories = [
  {
    title: "Pricing changes",
    description: "Plan prices, discounts, and billing structure — with the exact before and after.",
    icon: PricingIcon,
    tone: "signal",
  },
  {
    title: "Products & services",
    description: "New offerings, removed features, and changes to what's included in each plan.",
    icon: ProductIcon,
    tone: "mint",
  },
  {
    title: "Promotions",
    description: "Limited-time offers, discount codes, and campaign pushes as they go live.",
    icon: PromoIcon,
    tone: "amber",
  },
  {
    title: "Website content",
    description: "Meaningful copy changes on key pages — headlines, positioning, and messaging shifts.",
    icon: ContentIcon,
    tone: "signal",
  },
] as const;

const toneClasses: Record<string, string> = {
  signal: "bg-signal-tint text-signal-dark",
  mint: "bg-mint-tint text-mint",
  amber: "bg-amber-tint text-amber",
};

export function WhatWeMonitor() {
  return (
    <section id="what-we-monitor" className="border-t border-border-soft bg-surface-subtle py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-signal-dark">
            What we monitor
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            The changes that actually matter.
          </h2>
          <p className="mt-4 text-ink-soft">
            Not every pixel shift is worth an alert. Competitor Radar focuses on the changes
            that could affect your business.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-[var(--radius-card)] border border-border bg-white p-6"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full ${toneClasses[cat.tone]}`}
              >
                <cat.icon />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">{cat.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2.5V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M12.5 5.5C12.5 4.4 11 3.5 9 3.5C7 3.5 5.5 4.4 5.5 5.6C5.5 6.8 7 7.3 9 7.6C11 7.9 12.5 8.6 12.5 9.9C12.5 11.1 11 12 9 12C7 12 5.5 11.1 5.5 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ProductIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L15.5 5.5V12.5L9 16L2.5 12.5V5.5L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2.5 5.5L9 9L15.5 5.5M9 9V16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function PromoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2.5 9.5L9.5 2.5L15.5 8.5L8.5 15.5L2.5 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="10.5" cy="7.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
function ContentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 2.5H11L14.5 6V15.5H4V2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6.5 9H11.5M6.5 11.5H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
