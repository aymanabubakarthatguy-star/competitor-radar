// DEMO DATA — simulates rows from a future `reports` table, generated on a
// weekly cadence by the report-building service once monitoring is live.
import type { WeeklyReport } from "../types";

export const mockReports: WeeklyReport[] = [
  {
    id: "report_2026_33",
    weekLabel: "Week 33",
    dateRange: "Aug 10 – Aug 16, 2026",
    competitorsMonitored: 5,
    importantChanges: 3,
    biggestChange: {
      competitorName: "Brightline SaaS",
      description: "Raised their Pro plan price by 34%, from €29/month to €39/month.",
    },
    pricingChanges: [
      { label: "Brightline SaaS", value: "+34%", detail: "Pro plan: €29 → €39/month" },
      { label: "Brightline SaaS", value: "-5%", detail: "Annual discount: 20% → 15%" },
    ],
    newProductsOrServices: [
      { label: "Flowmetric", value: "New tier", detail: "Launched \"Flowmetric for Agencies\"" },
    ],
    promotions: [
      { label: "Ledgerly", value: "Limited time", detail: "3 months free on annual plans" },
    ],
    summary:
      "This was an active week. Brightline made the most significant move, raising Pro pricing and trimming their annual discount — a sign they may be shifting toward premium positioning. Flowmetric expanded into the agency segment, while Ledgerly leaned on a short-term promotion to drive annual sign-ups.",
  },
  {
    id: "report_2026_32",
    weekLabel: "Week 32",
    dateRange: "Aug 3 – Aug 9, 2026",
    competitorsMonitored: 5,
    importantChanges: 1,
    biggestChange: {
      competitorName: "Flowmetric",
      description: "Rewrote homepage messaging to emphasize automation over collaboration.",
    },
    pricingChanges: [],
    newProductsOrServices: [],
    promotions: [],
    summary:
      "A quieter week overall. Flowmetric's homepage refresh was the only notable move, suggesting a possible shift in brand positioning toward automation-led messaging.",
  },
];
