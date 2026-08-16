export type MonitoringFrequency = "daily" | "weekly";

export type MonitoringStatus = "active" | "paused" | "pending";

export interface MonitoringScope {
  pricing: boolean;
  products: boolean;
  promotions: boolean;
  websiteContent: boolean;
}

export interface Competitor {
  id: string;
  name: string;
  website: string;
  logoInitials: string;
  status: MonitoringStatus;
  frequency: MonitoringFrequency;
  scope: MonitoringScope;
  lastChecked: string;
  changesDetected: number;
  addedAt: string;
}

export interface CompetitorFormValues {
  name: string;
  website: string;
  frequency: MonitoringFrequency;
  scope: MonitoringScope;
}
