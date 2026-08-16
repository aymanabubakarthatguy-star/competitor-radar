/**
 * stripeService
 * ------------------------------------------------------------------
 * NOT IMPLEMENTED. Placeholder for the future Stripe integration:
 * creating checkout sessions, handling webhooks, and syncing
 * subscription status back into the app.
 * ------------------------------------------------------------------
 */

export const stripeService = {
  async createCheckoutSession(_planId: string): Promise<{ url: string }> {
    throw new Error("stripeService.createCheckoutSession is not implemented yet.");
  },

  async createBillingPortalSession(): Promise<{ url: string }> {
    throw new Error("stripeService.createBillingPortalSession is not implemented yet.");
  },
};
