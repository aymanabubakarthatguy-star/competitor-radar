import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { StatCard } from "../../components/dashboard/StatCard";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { competitorService } from "../../services/competitorService";
import { alertService } from "../../services/alertService";
import type { Alert, Competitor } from "../../types";
import { formatRelativeTime } from "../../utils/formatters";
import { ALERT_TYPE_LABELS } from "../../utils/constants";

export default function DashboardPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([competitorService.list(), alertService.list()]).then(([c, a]) => {
      setCompetitors(c);
      setAlerts(a);
      setLoading(false);
    });
  }, []);

  const importantAlerts = alerts.filter((a) => a.importance === "high").length;
  const lastChecked = competitors
    .map((c) => c.lastChecked)
    .filter(Boolean)
    .sort()
    .reverse()[0];

  return (
    <DashboardLayout title="Dashboard" subtitle="An overview of what's changed across your competitors.">
      {loading ? (
        <LoadingState />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Competitors monitored"
              value={String(competitors.length)}
              hint={`${competitors.filter((c) => c.status === "active").length} active`}
              tone="signal"
              icon={<CompetitorGlyph />}
            />
            <StatCard
              label="Changes detected"
              value={String(alerts.length)}
              hint="All time"
              tone="neutral"
              icon={<ChangeGlyph />}
            />
            <StatCard
              label="Important alerts"
              value={String(importantAlerts)}
              hint="Needs your attention"
              tone="alert"
              icon={<AlertGlyph />}
            />
            <StatCard
              label="Last checked"
              value={lastChecked ? formatRelativeTime(lastChecked) : "—"}
              hint="Most recent check"
              tone="neutral"
              icon={<ClockGlyph />}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card padded={false}>
              <div className="flex items-center justify-between border-b border-border-soft px-6 py-4">
                <h2 className="font-display text-base font-semibold text-ink">Recent activity</h2>
                <Link to="/dashboard/alerts" className="text-sm font-medium text-signal-dark hover:underline">
                  View all
                </Link>
              </div>
              {alerts.length === 0 ? (
                <p className="p-6 text-sm text-ink-soft">No recent activity detected.</p>
              ) : (
                <ul className="divide-y divide-border-soft">
                  {alerts.slice(0, 5).map((alert) => (
                    <li key={alert.id} className="flex items-start gap-3 px-6 py-4">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          alert.importance === "high"
                            ? "bg-alert"
                            : alert.importance === "medium"
                            ? "bg-amber"
                            : "bg-signal"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-ink">{alert.summary}</p>
                        <p className="mt-1 text-xs text-ink-faint">
                          {alert.competitorName} · {ALERT_TYPE_LABELS[alert.type]} ·{" "}
                          {formatRelativeTime(alert.detectedAt)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card padded={false}>
              <div className="flex items-center justify-between border-b border-border-soft px-6 py-4">
                <h2 className="font-display text-base font-semibold text-ink">Competitors</h2>
                <Link to="/dashboard/competitors" className="text-sm font-medium text-signal-dark hover:underline">
                  Manage
                </Link>
              </div>
              {competitors.length === 0 ? (
                <p className="p-6 text-sm text-ink-soft">No competitors tracked yet.</p>
              ) : (
                <ul className="divide-y divide-border-soft">
                  {competitors.slice(0, 5).map((c) => (
                    <li key={c.id} className="flex items-center justify-between gap-3 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-sunken text-xs font-semibold text-ink-soft">
                          {c.logoInitials}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-ink">{c.name}</p>
                          <p className="text-xs text-ink-faint">{c.website}</p>
                        </div>
                      </div>
                      <Badge
                        tone={c.status === "active" ? "mint" : c.status === "pending" ? "amber" : "neutral"}
                        dot
                      >
                        {c.status}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

function LoadingState() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-28 animate-pulse rounded-[var(--radius-card)] border border-border bg-surface-sunken/60" />
      ))}
    </div>
  );
}

function CompetitorGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function ChangeGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path d="M3 12L7 7L10.5 10L15 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function AlertGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path d="M9 2.5C6 2.5 5 5 5 7.5V10L3.5 12.5H14.5L13 10V7.5C13 5 12 2.5 9 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
function ClockGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 5.5V9L11.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
