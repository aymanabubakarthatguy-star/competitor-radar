import { useState } from "react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { TextField, SelectField, ToggleRow } from "../../components/ui/FormField";
import { mockUser, mockNotificationPreferences, mockSubscription } from "../../data/mockUser";
import { plans } from "../../data/plans";

export default function SettingsPage() {
  const [prefs, setPrefs] = useState(mockNotificationPreferences);
  const currentPlan = plans.find((p) => p.id === mockSubscription.planId);

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account, notifications, and plan.">
      <div className="flex flex-col gap-6">
        {/* Account information */}
        <Card>
          <h2 className="font-display text-base font-semibold text-ink">Account information</h2>
          <p className="mt-1 text-sm text-ink-soft">Your personal and company details.</p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Full name" defaultValue={mockUser.name} />
            <TextField label="Company" defaultValue={mockUser.company} />
            <TextField label="Email" type="email" defaultValue={mockUser.email} className="sm:col-span-2" />
          </div>

          <div className="mt-5 flex justify-end">
            <Button disabled>Save changes</Button>
          </div>
        </Card>

        {/* Notification preferences */}
        <Card>
          <h2 className="font-display text-base font-semibold text-ink">Notification preferences</h2>
          <p className="mt-1 text-sm text-ink-soft">Choose how and when you want to hear from us.</p>

          <div className="mt-3 divide-y divide-border-soft">
            <ToggleRow
              label="Email alerts"
              description="Get an email when an important change is detected"
              checked={prefs.emailAlerts}
              onChange={(checked) => setPrefs({ ...prefs, emailAlerts: checked })}
            />
            <ToggleRow
              label="Instant alerts"
              description="Notify me as soon as a change is found, not just in the daily digest"
              checked={prefs.instantAlerts}
              onChange={(checked) => setPrefs({ ...prefs, instantAlerts: checked })}
            />
            <ToggleRow
              label="Weekly report"
              description="Send a summary of the week's changes every Monday"
              checked={prefs.weeklyReport}
              onChange={(checked) => setPrefs({ ...prefs, weeklyReport: checked })}
            />
            <ToggleRow
              label="Only important changes"
              description="Skip low-importance alerts like minor copy tweaks"
              checked={prefs.onlyImportantChanges}
              onChange={(checked) => setPrefs({ ...prefs, onlyImportantChanges: checked })}
            />
          </div>
          <p className="mt-3 text-xs text-ink-faint">
            Email delivery isn't connected yet — these preferences are saved locally for this
            preview.
          </p>
        </Card>

        {/* Monitoring preferences */}
        <Card>
          <h2 className="font-display text-base font-semibold text-ink">Monitoring preferences</h2>
          <p className="mt-1 text-sm text-ink-soft">Default settings applied to newly added competitors.</p>

          <div className="mt-5 max-w-xs">
            <SelectField label="Default monitoring frequency" defaultValue="daily">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </SelectField>
          </div>
        </Card>

        {/* Subscription */}
        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-base font-semibold text-ink">Subscription</h2>
              <p className="mt-1 text-sm text-ink-soft">
                You're on the <span className="font-medium text-ink">{currentPlan?.name}</span> plan.
              </p>
            </div>
            <span className="rounded-full bg-signal-tint px-3 py-1 text-xs font-semibold text-signal-dark">
              {mockSubscription.status}
            </span>
          </div>

          <div className="mt-5 rounded-lg bg-surface-subtle p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-soft">Competitors used</span>
              <span className="font-medium text-ink">
                {mockSubscription.competitorsUsed} / {mockSubscription.competitorLimit}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white">
              <div
                className="h-1.5 rounded-full bg-signal"
                style={{
                  width: `${(mockSubscription.competitorsUsed / mockSubscription.competitorLimit) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button variant="secondary" fullWidth disabled>
              Change plan
            </Button>
            <Button variant="secondary" fullWidth disabled>
              Manage billing
            </Button>
          </div>
          <p className="mt-3 text-xs text-ink-faint">
            Billing isn't connected yet — plan changes will be available once Stripe is set up.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
