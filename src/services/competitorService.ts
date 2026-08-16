import { supabase } from "./authService";
import type { Competitor, CompetitorFormValues } from "../types";

export const competitorService = {
  async list(): Promise<Competitor[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("competitors")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      website: row.website,
      logoInitials: row.name
        ? row.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
        : "C",
      status: row.status || "active",
      frequency: row.frequency || "daily",
      scope: row.scope || ["pricing"],
      lastChecked: row.last_checked || new Date().toISOString(),
      changesDetected: row.changes_detected || 0,
      addedAt: row.created_at || new Date().toISOString(),
    }));
  },

  async add(values: CompetitorFormValues): Promise<Competitor> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User must be logged in to add a competitor.");

    const { data, error } = await supabase
      .from("competitors")
      .insert({
        user_id: user.id,
        name: values.name,
        website: values.website,
        frequency: values.frequency,
        scope: values.scope,
        status: "active",
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      website: data.website,
      logoInitials: data.name
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      status: data.status || "active",
      frequency: data.frequency,
      scope: data.scope,
      lastChecked: data.last_checked || new Date().toISOString(),
      changesDetected: 0,
      addedAt: data.created_at || new Date().toISOString(),
    };
  },

  async update(id: string, values: Partial<CompetitorFormValues>): Promise<Competitor> {
    const { data, error } = await supabase
      .from("competitors")
      .update({
        ...(values.name && { name: values.name }),
        ...(values.website && { website: values.website }),
        ...(values.frequency && { frequency: values.frequency }),
        ...(values.scope && { scope: values.scope }),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      website: data.website,
      logoInitials: data.name
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      status: data.status || "active",
      frequency: data.frequency,
      scope: data.scope,
      lastChecked: data.last_checked || new Date().toISOString(),
      changesDetected: data.changes_detected || 0,
      addedAt: data.created_at || new Date().toISOString(),
    };
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase
      .from("competitors")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};
