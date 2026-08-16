import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Card } from "../../components/ui/Card";
import { reportService } from "../../services/reportService";
import type { WeeklyReport } from "../../types";

export default function ReportsPage() {
  const [reports, setReports] = useState<WeeklyReport[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reportService.list().then((data) => {
      setReports(data);
      setActiveId(data[0]?.id ?? null);
      setLoading(false);
    });
  }, []);

  const activeReport = reports.find((r) => r.id === activeId) ?? null;

  if (loading) {
    return (
      <DashboardLayout title="Reports" subtitle="Your weekly competitor summary.">
        <div className="h-96 animate-pulse rounded-[var(--radius-card)] border border-border bg-surface-sunken/60" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Reports" subtitle="Your weekly competitor summary.">
      <div className="mb-6 flex flex-wrap gap-2">
        {reports.map((r) => (
          <button
            key={r.id}
            onClick={() => setActiveId(r.id)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              activeId === r.id
                ? "border-signal bg-signal-tint text-signal-dark"
                : "border-border text-ink-soft hover:bg-surface-subtle"
            }`}
          >
            {r.weekLabel}
          </button>
        ))}
      </div>

      {activeReport && (
        <div className="flex flex-col gap-6">
          <Card className="bg-navy text-white" padded>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-signal-bright">
                  Weekly competitor report
                </p>
                <h2 className="mt-1.5 font-display text-xl font-semibold">{activeReport.dateRange}</h2>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-white/50">Competitors monitored</p>
                  <p className="mt-1 font-display text-2xl font-semibold">{activeReport.competitorsMonitored}</p>
                </div>
                <div>
                  <p className="text-xs text-white/50">Important changes</p>
                  <p className="mt-1 font-display text-2xl font-semibold">{activeReport.importantChanges}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <p className="text-xs font-semibold uppercase tracking-wide text-signal-dark">Biggest change</p>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              <span className="font-semibold">{activeReport.biggestChange.competitorName}</span> —{" "}
              {activeReport.biggestChange.description}
            </p>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <ReportGroup title="Pricing changes" items={activeReport.pricingChanges} empty="No pricing changes this week." />
            <ReportGroup
              title="New products/services"
              items={activeReport.newProductsOrServices}
              empty="No new products or services this week."
            />
            <ReportGroup title="Promotions" items={activeReport.promotions} empty="No promotions this week." />
          </div>

          <Card>
            <p className="text-xs font-semibold uppercase tracking-wide text-signal-dark">Overall summary</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{activeReport.summary}</p>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}

function ReportGroup({
  title,
  items,
  empty,
}: {
  title: string;
  items: { label: string; value: string; detail: string }[];
  empty: string;
}) {
  return (
    <Card>
      <p className="font-display text-sm font-semibold text-ink">{title}</p>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-ink-faint">{empty}</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-3">
          {items.map((item, i) => (
            <li key={i} className="rounded-lg bg-surface-subtle p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">{item.label}</span>
                <span className="font-mono text-xs font-semibold text-signal-dark">{item.value}</span>
              </div>
              <p className="mt-1 text-xs text-ink-soft">{item.detail}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
