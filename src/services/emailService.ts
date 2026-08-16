/**
 * emailService
 * ------------------------------------------------------------------
 * NOT IMPLEMENTED. Placeholder for the future email-notification
 * integration (e.g. Resend, Postmark, or Supabase's email hooks) that
 * will send alert and weekly-report emails to users.
 * ------------------------------------------------------------------
 */

export const emailService = {
  async sendAlertEmail(_userId: string, _alertId: string): Promise<void> {
    throw new Error("emailService.sendAlertEmail is not implemented yet.");
  },

  async sendWeeklyReportEmail(_userId: string, _reportId: string): Promise<void> {
    throw new Error("emailService.sendWeeklyReportEmail is not implemented yet.");
  },
};
