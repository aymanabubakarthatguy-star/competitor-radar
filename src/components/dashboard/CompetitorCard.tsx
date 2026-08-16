import type { Competitor } from "../../types";
import { Badge } from "../ui/Badge";
import { formatRelativeTime } from "../../utils/formatters";

interface CompetitorCardProps {
  competitor: Competitor;
  onEdit: () => void;
  onRemove: () => void;
}

const statusTone: Record<Competitor["status"], "mint" | "amber" | "neutral"> = {
  active: "mint",
  pending: "amber",
  paused: "neutral",
};

const scopeLabels: Record<keyof Competitor["scope"], string> = {
  pricing: "Pricing",
  products: "Products",
  promotions: "Promotions",
  websiteContent: "Content",
};

export function CompetitorCard({ competitor, onEdit, onRemove }: CompetitorCardProps) {
  const activeScopes = (Object.keys(competitor.scope) as (keyof Competitor["scope"])[]).filter(
    (key) => competitor.scope[key]
  );

  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-sunken text-sm font-semibold text-ink-soft">
            {competitor.logoInitials}
          </span>
          <div>
            <p className="font-display text-[15px] font-semibold text-ink">{competitor.name}</p>
            <p className="text-xs text-ink-faint">{competitor.website}</p>
          </div>
        </div>
        <Badge tone={statusTone[competitor.status]} dot>
          {competitor.status}
        </Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-surface-subtle p-3.5 text-sm">
        <div>
          <p className="text-xs text-ink-faint">Last checked</p>
          <p className="mt-0.5 font-medium text-ink">{formatRelativeTime(competitor.lastChecked)}</p>
        </div>
        <div>
          <p className="text-xs text-ink-faint">Changes detected</p>
          <p className="mt-0.5 font-medium text-ink">{competitor.changesDetected}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="text-xs text-ink-faint">
          {competitor.frequency === "daily" ? "Checked daily" : "Checked weekly"} ·
        </span>
        {activeScopes.map((scope) => (
          <span key={scope} className="rounded-full bg-signal-tint px-2 py-0.5 text-xs font-medium text-signal-dark">
            {scopeLabels[scope]}
          </span>
        ))}
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 rounded-[var(--radius-control)] border border-border px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-subtle"
        >
          Edit
        </button>
        <button
          onClick={onRemove}
          className="flex-1 rounded-[var(--radius-control)] border border-border px-3 py-2 text-sm font-medium text-alert transition-colors hover:bg-alert-tint"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
