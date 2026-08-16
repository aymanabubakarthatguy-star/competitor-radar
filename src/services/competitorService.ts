/**
 * competitorService
 * ------------------------------------------------------------------
 * DEMO IMPLEMENTATION. Reads and writes an in-memory copy of the mock
 * competitor list so the Competitors page feels real to click around
 * in. Nothing here is persisted or connected to a database yet.
 * Replace the internals of each method with real Supabase calls
 * later — the function signatures are designed to stay the same.
 * ------------------------------------------------------------------
 */
import type { Competitor, CompetitorFormValues } from "../types";
import { mockCompetitors } from "../data/mockCompetitors";

let competitors: Competitor[] = [...mockCompetitors];

function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const competitorService = {
  async list(): Promise<Competitor[]> {
    return delay([...competitors]);
  },

  async add(values: CompetitorFormValues): Promise<Competitor> {
    const newCompetitor: Competitor = {
      id: `comp_${Math.random().toString(36).slice(2, 9)}`,
      name: values.name,
      website: values.website,
      logoInitials: values.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      status: "pending",
      frequency: values.frequency,
      scope: values.scope,
      lastChecked: new Date().toISOString(),
      changesDetected: 0,
      addedAt: new Date().toISOString(),
    };
    competitors = [newCompetitor, ...competitors];
    return delay(newCompetitor);
  },

  async update(id: string, values: Partial<CompetitorFormValues>): Promise<Competitor> {
    competitors = competitors.map((c) => (c.id === id ? { ...c, ...values } : c));
    const updated = competitors.find((c) => c.id === id);
    if (!updated) throw new Error("Competitor not found");
    return delay(updated);
  },

  async remove(id: string): Promise<void> {
    competitors = competitors.filter((c) => c.id !== id);
    return delay(undefined);
  },
};
