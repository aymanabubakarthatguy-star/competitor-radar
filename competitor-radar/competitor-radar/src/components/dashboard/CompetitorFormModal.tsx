import { useState } from "react";
import type { FormEvent } from "react";
import { Modal } from "../ui/Modal";
import { TextField, SelectField, CheckboxRow } from "../ui/FormField";
import { Button } from "../ui/Button";
import type { Competitor, CompetitorFormValues, MonitoringFrequency } from "../../types";

interface CompetitorFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CompetitorFormValues) => Promise<void>;
  initialValues?: Competitor | null;
}

const emptyValues: CompetitorFormValues = {
  name: "",
  website: "",
  frequency: "daily",
  scope: { pricing: true, products: true, promotions: true, websiteContent: true },
};

export function CompetitorFormModal({ open, onClose, onSubmit, initialValues }: CompetitorFormModalProps) {
  const [values, setValues] = useState<CompetitorFormValues>(
    initialValues
      ? {
          name: initialValues.name,
          website: initialValues.website,
          frequency: initialValues.frequency,
          scope: initialValues.scope,
        }
      : emptyValues
  );
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(values);
      setValues(emptyValues);
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  const isEdit = Boolean(initialValues);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit competitor" : "Add competitor"}
      description={
        isEdit
          ? "Update how this competitor is monitored."
          : "Tell us who to watch and how closely."
      }
      width="lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Company name"
            required
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            placeholder="Brightline SaaS"
          />
          <TextField
            label="Website URL"
            required
            type="text"
            value={values.website}
            onChange={(e) => setValues({ ...values, website: e.target.value })}
            placeholder="brightline.com"
          />
        </div>

        <SelectField
          label="Monitoring frequency"
          value={values.frequency}
          onChange={(e) =>
            setValues({ ...values, frequency: e.target.value as MonitoringFrequency })
          }
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </SelectField>

        <div>
          <p className="mb-2 text-sm font-medium text-ink">What to monitor</p>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <CheckboxRow
              label="Pricing"
              description="Plan prices and billing changes"
              checked={values.scope.pricing}
              onChange={(checked) => setValues({ ...values, scope: { ...values.scope, pricing: checked } })}
            />
            <CheckboxRow
              label="Products / services"
              description="New or removed offerings"
              checked={values.scope.products}
              onChange={(checked) => setValues({ ...values, scope: { ...values.scope, products: checked } })}
            />
            <CheckboxRow
              label="Promotions"
              description="Discounts and campaigns"
              checked={values.scope.promotions}
              onChange={(checked) => setValues({ ...values, scope: { ...values.scope, promotions: checked } })}
            />
            <CheckboxRow
              label="Website content"
              description="Key messaging and copy changes"
              checked={values.scope.websiteContent}
              onChange={(checked) =>
                setValues({ ...values, scope: { ...values.scope, websiteContent: checked } })
              }
            />
          </div>
        </div>

        <div className="mt-1 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving…" : isEdit ? "Save changes" : "Add competitor"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
