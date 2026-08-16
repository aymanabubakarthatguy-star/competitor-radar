/**
 * alertService
 * ------------------------------------------------------------------
 * DEMO IMPLEMENTATION. Serves mock alert data so the Alerts page and
 * dashboard widgets have something realistic to render. In production
 * this will read from an `alerts` table populated by the monitoring +
 * AI-analysis pipeline (see monitoringService and aiService).
 * ------------------------------------------------------------------
 */
import type { Alert } from "../types";
import { mockAlerts } from "../data/mockAlerts";

export const alertService = {
  async list(): Promise<Alert[]> {
    return Promise.resolve([...mockAlerts]);
  },

  async markAsRead(_id: string): Promise<void> {
    // Will update the alert's read status in the database.
    return Promise.resolve();
  },
};
