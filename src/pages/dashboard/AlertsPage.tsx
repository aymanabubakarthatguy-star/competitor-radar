import { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { AlertCard } from "../../components/dashboard/AlertCard";
import { alertService } from "../../services/alertService";
import type { Alert, AlertType } from "../../types";
import { ALERT_TYPE_LABELS } from "../../utils/constants";

const filterOptions: { label: string; value: AlertType | "all" }[] = [
  { label: "All", value: "all" },
  { label: ALERT_TYPE_LABELS.price_change, value: "price_change" },
  { label: ALERT_TYPE_LABELS.new_service, value: "new_service" },
  { label: ALERT_TYPE_LABELS.promotion, value: "promotion" },
  { label: ALERT_TYPE_LABELS.product_change, value: "product_change" },
  { label: ALERT_TYPE_LABELS.content_change, value: "content_change" },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<AlertType | "all">("all");

  useEffect(() => {
    alertService.list().then((data) => {
      setAlerts(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? alerts : alerts.filter((a) => a.type === filter)),
    [alerts, filter]
  );

  return (
    <DashboardLayout title="Alerts" subtitle="Every meaningful change Competitor Radar has detected.">
      <div className="mb-6 flex flex-wrap gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              filter === opt.value
                ? "border-signal bg-signal-tint text-signal-dark"
                : "border-border text-ink-soft hover:bg-surface-subtle"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-[var(--radius-card)] border border-border bg-surface-sunken/60" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-[var(--radius-card)] border border-dashed border-border bg-white p-12 text-center">
          <p className="font-display text-base font-semibold text-ink">No alerts here</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
            Nothing of this type has been detected yet. Try a different filter.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
