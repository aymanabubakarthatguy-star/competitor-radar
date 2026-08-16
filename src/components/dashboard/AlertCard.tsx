import type { Alert } from "../../types";
import { Badge } from "../ui/Badge";
import { ALERT_TYPE_LABELS } from "../../utils/constants";
import { formatRelativeTime, formatPercentage } from "../../utils/formatters";

interface AlertCardProps {
  alert: Alert;
}

const importanceTone: Record<Alert["importance"], "alert" | "amber" | "signal"> = {
  high: "alert",
  medium: "amber",
  low: "signal",
};

const importanceDotColor: Record<Alert["importance"], string> = {
  high: "🔴",
  medium: "🟠",
  low: "🔵",
};

export function AlertCard({ alert }: AlertCardProps) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span aria-hidden="true">{importanceDotColor[alert.importance]}</span>
          <span className="font-display text-[15px] font-semibold text-ink">{alert.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone={importanceTone[alert.importance]}>{ALERT_TYPE_LABELS[alert.type]}</Badge>
          {!alert.read && <Badge tone="neutral">New</Badge>}
        </div>
      </div>

      <p className="mt-2 text-sm text-ink-soft">
        <span className="font-medium text-ink">{alert.competitorName}</span> · {formatRelativeTime(alert.detectedAt)}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-ink">{alert.summary}</p>

      {alert.details.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4 rounded-lg bg-surface-subtle p-3.5">
          {alert.details.map((d, i) => (
            <div key={i} className="text-sm">
              <p className="text-xs font-medium text-ink-faint">{d.label}</p>
              <p className="mt-0.5 font-mono text-sm text-ink">
                {d.before && <span className="text-ink-faint line-through">{d.before}</span>}
                {d.before && d.after && <span className="mx-1.5 text-ink-faint">→</span>}
                {d.after && <span className="font-semibold text-ink">{d.after}</span>}
              </p>
            </div>
          ))}
          {typeof alert.changePercentage === "number" && (
            <div className="text-sm">
              <p className="text-xs font-medium text-ink-faint">Change</p>
              <p
                className={`mt-0.5 font-mono text-sm font-semibold ${
                  alert.changePercentage > 0 ? "text-alert" : "text-mint"
                }`}
              >
                {formatPercentage(alert.changePercentage)}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 rounded-lg border border-signal-tint bg-signal-tint/40 p-3.5">
        <p className="text-xs font-semibold uppercase tracking-wide text-signal-dark">AI Insight</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{alert.aiInsight}</p>
      </div>
    </div>
  );
}
