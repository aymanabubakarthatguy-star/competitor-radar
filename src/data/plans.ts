import type { Plan } from "../types";

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    currency: "€",
    competitorLimit: 1,
    monitoringFrequency: "Weekly",
    features: ["1 competitor", "Weekly monitoring", "Basic alerts"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 7,
    currency: "€",
    competitorLimit: 5,
    monitoringFrequency: "Daily",
    features: ["5 competitors", "Daily monitoring", "AI change analysis", "Email alerts"],
    highlight: true,
  },
  {
    id: "business",
    name: "Business",
    price: 15,
    currency: "€",
    competitorLimit: 20,
    monitoringFrequency: "Daily",
    features: [
      "20 competitors",
      "Daily monitoring",
      "AI analysis",
      "Priority alerts",
      "Weekly reports",
    ],
  },
];
