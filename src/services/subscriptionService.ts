/**
 * subscriptionService
 * ------------------------------------------------------------------
 * DEMO IMPLEMENTATION. Reads mock plan/subscription data. Billing is
 * NOT connected. When Stripe is added, `upgrade`/`cancel` should call
 * a backend endpoint that talks to the Stripe API and webhooks should
 * update the stored subscription record.
 * ------------------------------------------------------------------
 */
import type { Plan, Subscription } from "../types";
import { plans } from "../data/plans";
import { mockSubscription } from "../data/mockUser";

export const subscriptionService = {
  async getPlans(): Promise<Plan[]> {
    return Promise.resolve(plans);
  },

  async getCurrentSubscription(): Promise<Subscription> {
    return Promise.resolve(mockSubscription);
  },

  async upgrade(_planId: string): Promise<void> {
    throw new Error("subscriptionService.upgrade is not implemented yet. Connect Stripe here.");
  },

  async cancel(): Promise<void> {
    throw new Error("subscriptionService.cancel is not implemented yet. Connect Stripe here.");
  },
};
