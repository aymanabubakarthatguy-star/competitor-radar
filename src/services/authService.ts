/**
 * authService
 * ------------------------------------------------------------------
 * NOT FUNCTIONAL YET. This file defines the shape of the auth layer so
 * the Sign Up / Log In / Forgot Password screens have something real to
 * call. Every method currently throws, on purpose — there is no mock
 * "fake login" here, because pretending to authenticate would be
 * misleading. Wire this up to Supabase Auth (or another provider) when
 * the backend work begins.
 * ------------------------------------------------------------------
 */
import type { AuthCredentials, SignUpDetails, User } from "../types";

export const authService = {
  async signUp(_details: SignUpDetails): Promise<User> {
    throw new Error(
      "authService.signUp is not implemented yet. Connect Supabase Auth (or similar) here."
    );
  },

  async logIn(_credentials: AuthCredentials): Promise<User> {
    throw new Error(
      "authService.logIn is not implemented yet. Connect Supabase Auth (or similar) here."
    );
  },

  async requestPasswordReset(_email: string): Promise<void> {
    throw new Error(
      "authService.requestPasswordReset is not implemented yet. Connect a real email/reset provider here."
    );
  },

  async logOut(): Promise<void> {
    throw new Error("authService.logOut is not implemented yet.");
  },

  async getCurrentUser(): Promise<User | null> {
    // Will eventually read the active session from Supabase.
    return null;
  },
};
