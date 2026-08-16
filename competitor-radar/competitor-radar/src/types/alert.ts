export type AlertType =
  | "price_change"
  | "new_service"
  | "promotion"
  | "product_change"
  | "content_change";

export type AlertImportance = "high" | "medium" | "low";

export interface AlertDetail {
  label: string;
  before?: string;
  after?: string;
}

export interface Alert {
  id: string;
  competitorId: string;
  competitorName: string;
  type: AlertType;
  importance: AlertImportance;
  title: string;
  detectedAt: string;
  summary: string;
  aiInsight: string;
  details: AlertDetail[];
  changePercentage?: number;
  read: boolean;
}
