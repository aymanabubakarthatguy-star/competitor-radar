import { mockAlerts } from "../../data/mockAlerts";
import { AlertCard } from "../dashboard/AlertCard";

export function ExampleAlerts() {
  const examples = mockAlerts.slice(0, 4);

  return (
    <section className="border-t border-border-soft bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-signal-dark">
            Example alerts
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            What an alert actually looks like.
          </h2>
          <p className="mt-4 text-ink-soft">
            Every alert comes with the exact change and a plain-language explanation of why it
            might matter.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {examples.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-ink-faint">
          Example alerts shown with demo data for illustration.
        </p>
      </div>
    </section>
  );
}
