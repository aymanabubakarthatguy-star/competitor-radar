export type PlanId = "free" | "pro" | "business";

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  currency: string;
  competitorLimit: number;
  monitoringFrequency: "Weekly" | "Daily";
  features: string[];
  highlight?: boolean;
}

export interface Subscription {
  planId: PlanId;
  status: "active" | "trialing" | "canceled";
  competitorsUsed: number;
  competitorLimit: number;
  renewsAt: string;
}
