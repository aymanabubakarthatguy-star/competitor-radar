export interface ReportHighlight {
  label: string;
  value: string;
  detail: string;
}

export interface WeeklyReport {
  id: string;
  weekLabel: string;
  dateRange: string;
  competitorsMonitored: number;
  importantChanges: number;
  biggestChange: {
    competitorName: string;
    description: string;
  };
  pricingChanges: ReportHighlight[];
  newProductsOrServices: ReportHighlight[];
  promotions: ReportHighlight[];
  summary: string;
}
