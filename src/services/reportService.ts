import { supabase } from "./authService";
import type { WeeklyReport } from "../types";
import { mockReports } from "../data/mockReports";

export const reportService = {
  async list(): Promise<WeeklyReport[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return mockReports;

      // Fetch user's competitors
      const { data: competitors } = await supabase
        .from("competitors")
        .select("id, name")
        .eq("user_id", user.id);

      // Fetch alerts
      const { data: alerts } = await supabase
        .from("alerts")
        .select("*")
        .order("detected_at", { ascending: false });

      if (!competitors || competitors.length === 0 || !alerts || alerts.length === 0) {
        return mockReports;
      }

      const highPriorityAlerts = alerts.filter((a) => a.importance === "high");
      const pricingAlerts = alerts.filter((a) => a.type === "pricing");
      const productAlerts = alerts.filter((a) => a.type === "product");
      const promoAlerts = alerts.filter((a) => a.type === "promotion");

      const topAlert = highPriorityAlerts[0] || alerts[0];

      const liveReport: WeeklyReport = {
        id: "rep_live_this_week",
        weekLabel: "This Week",
        dateRange: "Current Week Summary",
        competitorsMonitored: competitors.length,
        importantChanges: highPriorityAlerts.length,
        biggestChange: {
          competitorName: topAlert ? (topAlert.competitor_name || "Monitored Competitor") : "None",
          description: topAlert ? (topAlert.summary || topAlert.title || "No significant changes detected.") : "No activity recorded.",
        },
        pricingChanges: pricingAlerts.map((a) => ({
          label: a.competitor_name || "Competitor",
          value: "Updated",
          detail: a.summary || a.title || "Price structure adjusted.",
        })),
        newProductsOrServices: productAlerts.map((a) => ({
          label: a.competitor_name || "Competitor",
          value: "New Item",
          detail: a.summary || a.title || "Product catalog updated.",
        })),
        promotions: promoAlerts.map((a) => ({
          label: a.competitor_name || "Competitor",
          value: "Promo",
          detail: a.summary || a.title || "Active marketing promo.",
        })),
        summary: `During this period, ${competitors.length} competitor(s) were actively tracked. Total alerts logged: ${alerts.length}.`,
      };

      return [liveReport, ...mockReports.slice(1)];
    } catch (err) {
      console.warn("Could not calculate live report, falling back to mock data:", err);
      return mockReports;
    }
  },
};
