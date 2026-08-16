import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { TextField, SelectField, ToggleRow } from "../../components/ui/FormField";
import { authService, supabase } from "../../services/authService";
import { mockNotificationPreferences, mockSubscription } from "../../data/mockUser";
import { plans } from "../../data/plans";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const [prefs, setPrefs] = useState(mockNotificationPreferences);
  const currentPlan = plans.find((p) => p.id === mockSubscription.planId);

  useEffect(() => {
    async function loadUserData() {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setName(user.name || "");
          setCompany(user.company || "");
          setEmail(user.email || "");
        }
      } catch (err) {
        console.error("Failed to load user profile:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  async function handleSaveAccount(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setNotice(null);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: name,
          company: company,
        },
      });

      if (error) throw error;
      setNotice("Account information updated successfully!");
    } catch (err: any) {
      setNotice(err.message || "Failed to update account information.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account, notifications, and plan.">
      <div className="flex flex-col gap-6">
        {/* Account information */}
        <Card>
          <h2 className="font-display text-base font-semibold text-ink">Account information</h2>
          <p className="mt-1 text-sm text-ink-soft">Your personal and company details.</p>

          {loading ? (
            <div className="mt-5 h-32 animate-pulse rounded bg-surface-subtle" />
          ) : (
            <form onSubmit={handleSaveAccount} className="mt-5 flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  label="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  disabled
                  className="sm:col-span-2 opacity-75"
                />
              </div>

              {notice && (
                <div className="rounded-[var(--radius-control)] border border-amber-tint bg-amber-tint/60 p-3 text-sm text-amber">
                  {notice}
                </div>
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </form>
          )}
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
            Email delivery isn't connected yet — these preferences are saved locally for this preview.
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
