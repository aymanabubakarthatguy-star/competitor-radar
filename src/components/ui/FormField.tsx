import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function TextField({ label, hint, id, className = "", ...rest }: TextFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={fieldId}
        className={`rounded-[var(--radius-control)] border border-border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-signal ${className}`}
        {...rest}
      />
      {hint && <span className="text-xs text-ink-faint">{hint}</span>}
    </div>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: ReactNode;
}

export function SelectField({ label, id, children, className = "", ...rest }: SelectFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={fieldId}
        className={`rounded-[var(--radius-control)] border border-border bg-white px-3.5 py-2.5 text-sm text-ink transition-colors focus:border-signal ${className}`}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}

interface CheckboxRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxRow({ label, description, checked, onChange }: CheckboxRowProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-control)] border border-border p-3 transition-colors hover:bg-surface-subtle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-[#0e7c86]"
      />
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        {description && <span className="block text-xs text-ink-soft">{description}</span>}
      </span>
    </label>
  );
}

interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {description && <p className="mt-0.5 text-xs text-ink-soft">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-signal" : "bg-surface-sunken"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
