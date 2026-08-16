# Competitor Radar

A competitor-monitoring SaaS for small businesses. This is the **frontend stage** of the
project — a polished, fully-clickable UI running on realistic demo data, structured so a
real backend can be dropped in without restructuring the app.

## Run it locally

```bash
cd competitor-radar
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

To check for type errors:
```bash
npm run build
```
(`build` runs `tsc -b` then `vite build` — it will fail loudly on any TypeScript error.)

## Deploying to Netlify

This project is ready for Netlify out of the box:
- Build command: `npm run build`
- Publish directory: `dist`
- `netlify.toml` is already included with an SPA redirect rule (so routes like
  `/dashboard/alerts` work on refresh).

## Folder structure

```
src/
  components/
    layout/       Header, footer, sidebar, dashboard/auth/marketing layout shells
    marketing/     Landing-page sections (Hero, HowItWorks, Pricing, FAQ, etc.)
    dashboard/     Dashboard-specific pieces (AlertCard, CompetitorCard, StatCard, modals)
    ui/            Generic reusable primitives (Button, Card, Modal, Badge, form fields)
    radar/          The brand's signature radar-sweep visual components
  pages/
    LandingPage.tsx
    auth/           SignUpPage, LogInPage, ForgotPasswordPage
    dashboard/      DashboardPage, CompetitorsPage, AlertsPage, ReportsPage, SettingsPage
  services/         One file per future backend integration (see below)
  types/            TypeScript interfaces: User, Competitor, Alert, Report, Subscription
  data/             Mock/demo data, clearly labeled, shaped like future DB rows
  utils/            Formatters and shared constants
```

Business logic is kept out of components: pages call into `services/`, which currently
read/write mock data but have the exact function signatures the real implementation will use.

## What's real vs. demo right now

**Real:** navigation and routing, all UI states (loading, empty states), the "Add/Edit
competitor" flow (in-memory), form validation, responsive layout, the alert/report/dashboard
data rendering.

**Demo/mock, clearly labeled in code comments:**
- All competitor, alert, and report data (`src/data/*`)
- Auth forms — submitting shows an explicit "not connected yet" message rather than
  pretending to log you in. Use **"Preview the dashboard"** on the Log In page to explore
  the app without an account.
- Settings changes are held in local component state only, not persisted.
- Pricing plan buttons don't charge anything — no Stripe integration yet.

## What remains before this is a real, functioning SaaS

1. **Authentication** — connect a real provider (e.g. Supabase Auth) in `authService.ts`;
   add session handling and route protection for `/dashboard/*`.
2. **Database** — provision tables for competitors, alerts, reports, subscriptions, and
   notification preferences; replace the mock arrays in `services/*` with real queries.
3. **Website monitoring engine** — a scheduled job (e.g. Supabase Edge Function + cron) that
   fetches each competitor's page, diffs it against the last snapshot, and stores raw
   changes. Wire this into `monitoringService.ts`.
4. **AI change analysis** — call an AI API (e.g. the Anthropic API) to turn a raw detected
   change into the plain-language "AI Insight" text. Wire into `aiService.ts`.
5. **Email notifications** — connect an email provider (e.g. Resend/Postmark) for instant
   alerts and the weekly report digest. Wire into `emailService.ts`.
6. **Billing** — connect Stripe Checkout + a customer portal, and handle webhooks to keep
   subscriptions in sync. Wire into `stripeService.ts`.
7. **Plan limits** — enforce competitor-count limits per plan server-side once billing exists.

Each of these has a dedicated, already-typed service file waiting for its real
implementation — nothing else in the app should need to change shape when you wire them up.
