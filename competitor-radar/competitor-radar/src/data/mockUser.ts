// DEMO DATA — will be replaced by real authenticated user records from Supabase.
import type { NotificationPreferences, Subscription, User } from "../types";

export const mockUser: User = {
  id: "user_demo_001",
  name: "Alexandra Novak",
  email: "alexandra@northloop.co",
  avatarInitials: "AN",
  company: "Northloop Studio",
  createdAt: "2026-03-11T09:00:00Z",
};

export const mockNotificationPreferences: NotificationPreferences = {
  emailAlerts: true,
  weeklyReport: true,
  onlyImportantChanges: false,
  instantAlerts: true,
};

export const mockSubscription: Subscription = {
  planId: "pro",
  status: "active",
  competitorsUsed: 5,
  competitorLimit: 5,
  renewsAt: "2026-09-14T00:00:00Z",
};
