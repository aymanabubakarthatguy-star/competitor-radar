/**
 * aiService
 * ------------------------------------------------------------------
 * NOT IMPLEMENTED. Placeholder for the future integration with an AI
 * API (e.g. the Anthropic API) that turns a raw detected change into
 * the plain-language "AI Insight" shown on alerts.
 * ------------------------------------------------------------------
 */

export const aiService = {
  async explainChange(_rawChange: unknown): Promise<string> {
    throw new Error(
      "aiService.explainChange is not implemented yet. Connect an AI API here to generate insights."
    );
  },
};
