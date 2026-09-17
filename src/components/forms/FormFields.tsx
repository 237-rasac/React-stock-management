import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { InputHTMLAttributes, useId } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> extends Omit<
  ControllerProps<T>,
  "name" | "render"
> {
  name: FieldPath<T>;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  /** Forwarded to the underlying <Input> (e.g. type="email" | "tel"). */
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
}

export function FormField<T extends FieldValues>({
  name,
  control,
  label,
  error,
  helperText,
  required,
  rules,
  ...props
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Input
          {...field}
          {...props}
          label={label}
          error={error}
          helperText={helperText}
          required={required}
          onBlur={field.onBlur}
        />
      )}
    />
  );
}

interface SelectFieldProps<T extends FieldValues> extends Omit<
  ControllerProps<T>,
  "name" | "render"
> {
  name: FieldPath<T>;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  className?: string;
}

export function SelectField<T extends FieldValues>({
  name,
  control,
  label,
  error,
  options,
  placeholder,
  rules,
  ...props
}: SelectFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <select
          {...field}
          {...props}
          className={cn(
            "w-full px-3 py-2 rounded-sm border bg-surface dark:bg-[color:var(--dark-input)] text-content dark:text-[color:var(--dark-text-primary)]",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            error
              ? "border-danger-500 focus:ring-danger-500/20"
              : "border-border-strong dark:border-[color:var(--dark-border)]",
            props.className,
          )}
          aria-invalid={error ? "true" : "false"}
          onBlur={field.onBlur}
          aria-label={label}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    />
  );
}

interface CheckboxFieldProps<T extends FieldValues> extends Omit<
  ControllerProps<T>,
  "name" | "render"
> {
  name: FieldPath<T>;
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export function CheckboxField<T extends FieldValues>({
  name,
  control,
  label,
  error,
  helperText,
  rules,
  ...props
}: CheckboxFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-content">
            <input
              type="checkbox"
              checked={Boolean(field.value)}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              className="h-4 w-4 rounded border-border-strong text-primary accent-[color:var(--color-primary-600)]"
              {...props}
            />
            {label}
          </label>
          {error && (
            <p
              className="mt-1 text-sm text-danger-600 dark:text-danger-500"
              role="alert"
            >
              {error}
            </p>
          )}
          {helperText && !error && (
            <p className="mt-1 text-sm text-content-muted">{helperText}</p>
          )}
        </div>
      )}
    />
  );
}

interface CurrencyInputFieldProps<T extends FieldValues> extends Omit<
  ControllerProps<T>,
  "name" | "render"
> {
  name: FieldPath<T>;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  /** Currency code (default EUR). */
  currency?: string;
  className?: string;
}

/** Numeric input for money amounts — stores a number, renders step 0.01. */
export function CurrencyInputField<T extends FieldValues>({
  name,
  control,
  label,
  error,
  helperText,
  required,
  currency = "EUR",
  rules,
  ...props
}: CurrencyInputFieldProps<T>) {
  const fieldId = useId();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div>
          {label && (
            <label
              htmlFor={fieldId}
              className="mb-1.5 block text-sm font-medium text-content-secondary"
            >
              {label}
              {required && <span className="text-danger-500"> *</span>}
            </label>
          )}
          <div className="relative">
            <input
              id={fieldId}
              type="number"
              step="0.01"
              min="0"
              inputMode="decimal"
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value === "" ? undefined : Number(e.target.value),
                )
              }
              onBlur={field.onBlur}
              className={cn(
                "w-full rounded-sm border bg-surface px-3 py-2 pr-12 text-content dark:bg-[color:var(--dark-input)] dark:text-[color:var(--dark-text-primary)]",
                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                error
                  ? "border-danger-500 focus:ring-danger-500/20"
                  : "border-border-strong dark:border-[color:var(--dark-border)]",
                props.className,
              )}
              aria-invalid={error ? "true" : "false"}
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-content-muted">
              {currency === "EUR" ? "€" : currency}
            </span>
          </div>
          {error && (
            <p
              className="mt-1 text-sm text-danger-600 dark:text-danger-500"
              role="alert"
            >
              {error}
            </p>
          )}
          {helperText && !error && (
            <p className="mt-1 text-sm text-content-muted">{helperText}</p>
          )}
        </div>
      )}
    />
  );
}

interface NumberFieldProps<T extends FieldValues> extends Omit<
  ControllerProps<T>,
  "name" | "render"
> {
  name: FieldPath<T>;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  /** Optional suffix rendered at the field's right edge (e.g. '%'). */
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

/** Numeric input bound to a RHF field — stores a number or undefined. */
export function NumberField<T extends FieldValues>({
  name,
  control,
  label,
  error,
  helperText,
  required,
  suffix,
  min,
  max,
  step,
  rules,
  ...props
}: NumberFieldProps<T>) {
  const fieldId = useId();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div>
          {label && (
            <label
              htmlFor={fieldId}
              className="mb-1.5 block text-sm font-medium text-content-secondary"
            >
              {label}
              {required && <span className="text-danger-500"> *</span>}
            </label>
          )}
          <div className="relative">
            <input
              id={fieldId}
              type="number"
              value={(field.value as number | undefined) ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value === "" ? undefined : Number(e.target.value),
                )
              }
              onBlur={field.onBlur}
              min={min}
              max={max}
              step={step}
              className={cn(
                "w-full rounded-sm border bg-surface px-3 py-2 text-content dark:bg-[color:var(--dark-input)] dark:text-[color:var(--dark-text-primary)]",
                suffix && "pr-8",
                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                error
                  ? "border-danger-500 focus:ring-danger-500/20"
                  : "border-border-strong dark:border-[color:var(--dark-border)]",
                props.className,
              )}
              aria-invalid={error ? "true" : "false"}
            />
            {suffix && (
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-content-muted">
                {suffix}
              </span>
            )}
          </div>
          {error && (
            <p
              className="mt-1 text-sm text-danger-600 dark:text-danger-500"
              role="alert"
            >
              {error}
            </p>
          )}
          {helperText && !error && (
            <p className="mt-1 text-sm text-content-muted">{helperText}</p>
          )}
        </div>
      )}
    />
  );
}

interface DateFieldProps<T extends FieldValues> extends Omit<
  ControllerProps<T>,
  "name" | "render"
> {
  name: FieldPath<T>;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

/** Native date picker bound to a RHF field (value: ISO yyyy-MM-dd or undefined). */
export function DateField<T extends FieldValues>({
  name,
  control,
  label,
  error,
  helperText,
  required,
  rules,
  ...props
}: DateFieldProps<T>) {
  const fieldId = useId();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div>
          {label && (
            <label
              htmlFor={fieldId}
              className="mb-1.5 block text-sm font-medium text-content-secondary"
            >
              {label}
              {required && <span className="text-danger-500"> *</span>}
            </label>
          )}
          <input
            id={fieldId}
            type="date"
            value={(field.value as string | undefined) ?? ""}
            onChange={(e) => field.onChange(e.target.value || undefined)}
            onBlur={field.onBlur}
            className={cn(
              "w-full rounded-sm border bg-surface px-3 py-2 text-content dark:bg-[color:var(--dark-input)] dark:text-[color:var(--dark-text-primary)]",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              error
                ? "border-danger-500 focus:ring-danger-500/20"
                : "border-border-strong dark:border-[color:var(--dark-border)]",
              props.className,
            )}
            aria-invalid={error ? "true" : "false"}
          />
          {error && (
            <p
              className="mt-1 text-sm text-danger-600 dark:text-danger-500"
              role="alert"
            >
              {error}
            </p>
          )}
          {helperText && !error && (
            <p className="mt-1 text-sm text-content-muted">{helperText}</p>
          )}
        </div>
      )}
    />
  );
}

interface TextareaFieldProps<T extends FieldValues> extends Omit<
  ControllerProps<T>,
  "name" | "render"
> {
  name: FieldPath<T>;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

export function TextareaField<T extends FieldValues>({
  name,
  control,
  label,
  error,
  rules,
  ...props
}: TextareaFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <textarea
          {...field}
          {...props}
          className={cn(
            "w-full px-3 py-2 rounded-sm border bg-surface dark:bg-[color:var(--dark-input)] text-content dark:text-[color:var(--dark-text-primary)]",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            error
              ? "border-danger-500 focus:ring-danger-500/20"
              : "border-border-strong dark:border-[color:var(--dark-border)]",
            props.className,
          )}
          aria-invalid={error ? "true" : "false"}
          onBlur={field.onBlur}
          aria-label={label}
        />
      )}
    />
  );
}
