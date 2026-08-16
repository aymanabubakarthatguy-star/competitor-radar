/**
 * reportService
 * ------------------------------------------------------------------
 * DEMO IMPLEMENTATION. Serves mock weekly reports. In production this
 * will be generated on a schedule (e.g. a weekly cron job / edge
 * function) that aggregates the week's alerts per user.
 * ------------------------------------------------------------------
 */
import type { WeeklyReport } from "../types";
import { mockReports } from "../data/mockReports";

export const reportService = {
  async list(): Promise<WeeklyReport[]> {
    return Promise.resolve([...mockReports]);
  },

  async getLatest(): Promise<WeeklyReport | null> {
    return Promise.resolve(mockReports[0] ?? null);
  },
};
