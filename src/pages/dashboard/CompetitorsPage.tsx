import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { CompetitorCard } from "../../components/dashboard/CompetitorCard";
import { CompetitorFormModal } from "../../components/dashboard/CompetitorFormModal";
import { Button } from "../../components/ui/Button";
import { competitorService } from "../../services/competitorService";
import type { Competitor, CompetitorFormValues } from "../../types";

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCompetitor, setEditingCompetitor] = useState<Competitor | null>(null);

  useEffect(() => {
    competitorService.list().then((data) => {
      setCompetitors(data);
      setLoading(false);
    });
  }, []);

  async function handleAdd(values: CompetitorFormValues) {
    const created = await competitorService.add(values);
    setCompetitors((prev) => [created, ...prev]);
  }

  async function handleEdit(values: CompetitorFormValues) {
    if (!editingCompetitor) return;
    const updated = await competitorService.update(editingCompetitor.id, values);
    setCompetitors((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  }

  async function handleRemove(id: string) {
    await competitorService.remove(id);
    setCompetitors((prev) => prev.filter((c) => c.id !== id));
  }

  function openAddModal() {
    setEditingCompetitor(null);
    setModalOpen(true);
  }

  function openEditModal(competitor: Competitor) {
    setEditingCompetitor(competitor);
    setModalOpen(true);
  }

  return (
    <DashboardLayout title="Competitors" subtitle="Every business you're keeping an eye on.">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-ink-soft">
          {competitors.length} competitor{competitors.length === 1 ? "" : "s"}
        </p>
        <Button onClick={openAddModal}>+ Add competitor</Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-56 animate-pulse rounded-[var(--radius-card)] border border-border bg-surface-sunken/60" />
          ))}
        </div>
      ) : competitors.length === 0 ? (
        <div className="rounded-[var(--radius-card)] border border-dashed border-border bg-white p-12 text-center">
          <p className="font-display text-base font-semibold text-ink">No competitors yet</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
            Add a competitor's website to start tracking their pricing, products, and promotions.
          </p>
          <Button className="mt-5" onClick={openAddModal}>
            + Add your first competitor
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {competitors.map((competitor) => (
            <CompetitorCard
              key={competitor.id}
              competitor={competitor}
              onEdit={() => openEditModal(competitor)}
              onRemove={() => handleRemove(competitor.id)}
            />
          ))}
        </div>
      )}

      <CompetitorFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={editingCompetitor ? handleEdit : handleAdd}
        initialValues={editingCompetitor}
      />
    </DashboardLayout>
  );
}
