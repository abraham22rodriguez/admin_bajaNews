"use client";

import { useId, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

const inputClass =
  "w-full px-3.5 py-2.5 rounded-md border-2 bg-[var(--color-paper-raised)] text-[var(--color-ink)] focus:outline-none placeholder:text-[var(--color-ink-soft)]/60";
const inputStyle = { borderColor: "var(--color-input-border)" } as const;

function Wrapper({
  colSpan = 2,
  labelId,
  label,
  hint,
  children,
}: {
  colSpan?: 1 | 2 | 4;
  labelId: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  const colClass = colSpan === 4 ? "col-span-4" : colSpan === 1 ? "col-span-1" : "col-span-4 sm:col-span-2";
  return (
    <div className={colClass}>
      <label htmlFor={labelId} className="block mb-1.5 text-sm font-semibold text-[var(--color-ink)]">
        {label}
        {hint && <span className="ml-1.5 font-normal text-[var(--color-ink-soft)]">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  colSpan?: 1 | 2 | 4;
  hint?: string;
}

export function TextField({ label, colSpan, hint, className, ...props }: TextFieldProps) {
  const id = useId();
  return (
    <Wrapper colSpan={colSpan} labelId={id} label={label} hint={hint}>
      <input id={id} className={`${inputClass} ${className ?? ""}`} style={inputStyle} {...props} />
    </Wrapper>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  colSpan?: 1 | 2 | 4;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function SelectField({ label, colSpan, hint, options, placeholder, className, ...props }: SelectFieldProps) {
  const id = useId();
  return (
    <Wrapper colSpan={colSpan} labelId={id} label={label} hint={hint}>
      <select id={id} className={`${inputClass} ${className ?? ""}`} style={inputStyle} {...props}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  colSpan?: 1 | 2 | 4;
  hint?: string;
}

export function TextAreaField({ label, colSpan, hint, className, ...props }: TextAreaFieldProps) {
  const id = useId();
  return (
    <Wrapper colSpan={colSpan} labelId={id} label={label} hint={hint}>
      <textarea id={id} className={`${inputClass} ${className ?? ""}`} style={inputStyle} {...props} />
    </Wrapper>
  );
}

interface FileFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  colSpan?: 1 | 2 | 4;
  hint?: string;
}

export function FileField({ label, colSpan, hint, className, ...props }: FileFieldProps) {
  const id = useId();
  return (
    <Wrapper colSpan={colSpan} labelId={id} label={label} hint={hint}>
      <input
        id={id}
        type="file"
        className={`${inputClass} file:mr-3 file:rounded file:border-0 file:bg-[var(--color-ink)] file:text-white file:px-3 file:py-1.5 file:text-sm file:font-medium cursor-pointer ${className ?? ""}`}
        style={inputStyle}
        {...props}
      />
    </Wrapper>
  );
}

interface CheckboxFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  colSpan?: 1 | 2 | 4;
  hint?: string;
}

export function CheckboxField({ label, colSpan = 4, hint, className, ...props }: CheckboxFieldProps) {
  const id = useId();
  const colClass = colSpan === 4 ? "col-span-4" : colSpan === 1 ? "col-span-1" : "col-span-4 sm:col-span-2";
  return (
    <div className={colClass}>
      <label htmlFor={id} className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          id={id}
          type="checkbox"
          className={`h-5 w-5 rounded cursor-pointer ${className ?? ""}`}
          style={{ accentColor: "var(--color-cta)" }}
          {...props}
        />
        <span className="text-sm font-semibold text-[var(--color-ink)]">
          {label}
          {hint && <span className="ml-1.5 font-normal text-[var(--color-ink-soft)]">{hint}</span>}
        </span>
      </label>
    </div>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="col-span-4 sm:col-span-1 sm:justify-self-start px-6 py-2.5 rounded-md text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      style={{ background: "var(--color-cta)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-cta-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-cta)")}
    >
      {children}
    </button>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="col-span-4 text-sm font-medium rounded-md px-3.5 py-2.5"
      style={{ color: "var(--color-danger)", background: "var(--color-danger-tint)" }}
    >
      {message}
    </p>
  );
}
