import { useState } from "react";

const faqs = [
  {
    q: "How does Competitor Radar detect changes?",
    a: "It periodically checks the pages you've added and compares each new version against the last one it saw, flagging differences that look meaningful — like pricing, plans, or key messaging.",
  },
  {
    q: "Will I get alerted for every tiny change?",
    a: "No. The goal is to surface changes worth knowing about, not every pixel shift. Alerts are focused on pricing, products, promotions, and significant content changes.",
  },
  {
    q: "Can I monitor more than one competitor?",
    a: "Yes. The Free plan covers 1 competitor, Pro covers 5, and Business covers 20. You can add or remove competitors at any time.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Competitor Radar works entirely from your dashboard — just add a competitor's website and it takes care of the rest.",
  },
  {
    q: "Is website monitoring live yet?",
    a: "Competitor Radar is currently in early access. You can explore the full product experience today; live monitoring and email alerts are being rolled out next.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-border-soft bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-signal-dark">FAQ</span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Questions, answered.
          </h2>
        </div>

        <div className="mt-12 divide-y divide-border-soft border-y border-border-soft">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.q}>
                <button
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="font-display text-[15px] font-medium text-ink">{faq.q}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`shrink-0 transition-transform ${open ? "rotate-45" : ""}`}
                  >
                    <path d="M8 3V13M3 8H13" stroke="#4B5567" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                {open && <p className="pb-5 text-sm leading-relaxed text-ink-soft">{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
