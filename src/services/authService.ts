import { createClient } from '@supabase/supabase-js';
import type { AuthCredentials, SignUpDetails, User } from "../types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const authService = {
  async signUp(details: SignUpDetails): Promise<User> {
    const { data, error } = await supabase.auth.signUp({
      email: details.email,
      password: details.password,
      options: {
        data: {
          full_name: details.name,
          company: details.company,
        },
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error("No user returned from sign up");

    const initials = details.name
      ? details.name.split(' ').map(n => n[0]).join('').toUpperCase()
      : details.email[0].toUpperCase();

    return {
      id: data.user.id,
      email: data.user.email || details.email,
      name: details.name,
      company: details.company,
      avatarInitials: initials,
      createdAt: new Date().toISOString(),
    };
  },

  async logIn(credentials: AuthCredentials): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;
    if (!data.user) throw new Error("No user returned from login");

    const name = data.user.user_metadata?.full_name || credentials.email;
    const initials = name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();

    return {
      id: data.user.id,
      email: data.user.email || credentials.email,
      name: name,
      company: data.user.user_metadata?.company || '',
      avatarInitials: initials,
      createdAt: data.user.created_at || new Date().toISOString(),
    };
  },

  async requestPasswordReset(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },

  async logOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const name = user.user_metadata?.full_name || user.email || '';
    const initials = name
      ? name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
      : 'U';

    return {
      id: user.id,
      email: user.email || '',
      name: name,
      company: user.user_metadata?.company || '',
      avatarInitials: initials,
      createdAt: user.created_at || new Date().toISOString(),
    };
  },
};
