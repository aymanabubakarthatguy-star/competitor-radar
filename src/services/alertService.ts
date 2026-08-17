import { supabase } from "./authService";
import type { Alert } from "../types";
import { mockAlerts } from "../data/mockAlerts";

export const alertService = {
  async list(): Promise<Alert[]> {
    try {
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .order("detected_at", { ascending: false });

      if (error || !data || data.length === 0) {
        return mockAlerts;
      }

      return data.map((item) => ({
        id: item.id,
        competitorId: item.competitor_id,
        competitorName: item.competitor_name,
        type: item.type,
        importance: item.importance,
        title: item.title ?? item.summary ?? "",
        summary: item.summary ?? item.title ?? "",
        aiInsight: item.ai_insight ?? item.details ?? "",
        detectedAt: item.detected_at,
        read: item.read ?? item.is_read ?? false,
        isRead: item.is_read ?? item.read ?? false,
        details: item.details,
      }));
    } catch (err) {
      console.warn("Could not load alerts from Supabase, returning mock alerts.", err);
      return mockAlerts;
    }
  },

  async markAsRead(id: string): Promise<void> {
    try {
      await supabase
        .from("alerts")
        .update({ read: true, is_read: true })
        .eq("id", id);
    } catch (err) {
      console.warn(`Could not mark alert ${id} as read in Supabase.`, err);
    }
  },
};
