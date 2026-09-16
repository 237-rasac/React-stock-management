import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> extends Omit<ControllerProps<T>, 'name' | 'control'> {
  name: FieldPath<T>;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export function FormField<T extends FieldValues>({ name, control, label, error, helperText, required, rules, ...props }: FormFieldProps<T>) {
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

interface SelectFieldProps<T extends FieldValues> extends Omit<ControllerProps<T>, 'name' | 'control'> {
  name: FieldPath<T>;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export function SelectField<T extends FieldValues>({ name, control, label, error, helperText, required, options, placeholder, rules, ...props }: SelectFieldProps<T>) {
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
            'w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            error ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-300 dark:border-gray-600',
            props.className
          )}
          aria-invalid={error ? 'true' : 'false'}
          onBlur={field.onBlur}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      )}
    />
  );
}

interface TextareaFieldProps<T extends FieldValues> extends Omit<ControllerProps<T>, 'name' | 'control'> {
  name: FieldPath<T>;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export function TextareaField<T extends FieldValues>({ name, control, label, error, helperText, required, rules, ...props }: TextareaFieldProps<T>) {
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
            'w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            error ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-300 dark:border-gray-600',
            props.className
          )}
          aria-invalid={error ? 'true' : 'false'}
          onBlur={field.onBlur}
        />
      )}
    />
  );
}