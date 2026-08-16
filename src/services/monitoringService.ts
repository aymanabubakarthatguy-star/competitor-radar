/**
 * monitoringService
 * ------------------------------------------------------------------
 * NOT IMPLEMENTED. This is a placeholder for the future website-
 * monitoring engine: periodically fetching a competitor's site,
 * diffing it against the previous snapshot, and producing structured
 * "raw changes" for the AI service to interpret. Likely implemented
 * as a scheduled backend job (e.g. Supabase Edge Function + cron).
 * ------------------------------------------------------------------
 */

export const monitoringService = {
  async checkCompetitor(_competitorId: string): Promise<void> {
    throw new Error(
      "monitoringService.checkCompetitor is not implemented yet. This will fetch and diff the competitor's website."
    );
  },
};
