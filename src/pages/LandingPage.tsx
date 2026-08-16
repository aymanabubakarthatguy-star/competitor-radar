import { MarketingLayout } from "../components/layout/MarketingLayout";
import { Hero } from "../components/marketing/Hero";
import { HowItWorks } from "../components/marketing/HowItWorks";
import { WhatWeMonitor } from "../components/marketing/WhatWeMonitor";
import { ExampleAlerts } from "../components/marketing/ExampleAlerts";
import { PricingSection } from "../components/marketing/PricingSection";
import { FAQ } from "../components/marketing/FAQ";
import { FinalCTA } from "../components/marketing/FinalCTA";

export default function LandingPage() {
  return (
    <MarketingLayout>
      <Hero />
      <HowItWorks />
      <WhatWeMonitor />
      <ExampleAlerts />
      <PricingSection />
      <FAQ />
      <FinalCTA />
    </MarketingLayout>
  );
}
