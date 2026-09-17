import { useTranslation } from "react-i18next";
import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField } from "@/components/forms/FormFields";

interface CustomerFormFieldsProps<T extends FieldValues> {
  control: Control<T>;
  /** i18n label key prefix (default "fields"). */
  labelPrefix?: string;
}

/**
 * The customer form body (P4.1) — shared by the Customers list dialog and the
 * details-page edit dialog so both stay in sync with the schema.
 * Mirrors `ClientRequestDTO`: nom + prenom required, address/contact optional.
 */
export function CustomerFormFields<T extends FieldValues>({
  control,
  labelPrefix = "fields",
}: CustomerFormFieldsProps<T>) {
  const { t } = useTranslation("customers");
  // Dynamic key → t() returns a union; labels are always strings in our JSONs.
  const label = (key: string): string => t(`${labelPrefix}.${key}`) as string;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          name={"firstName" as Path<T>}
          control={control}
          label={label("firstName")}
          required
        />
        <FormField
          name={"lastName" as Path<T>}
          control={control}
          label={label("lastName")}
          required
        />
      </div>
      <FormField
        name={"addressLine1" as Path<T>}
        control={control}
        label={label("addressLine1")}
      />
      <FormField
        name={"addressLine2" as Path<T>}
        control={control}
        label={label("addressLine2")}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          name={"postalCode" as Path<T>}
          control={control}
          label={label("postalCode")}
        />
        <FormField
          name={"city" as Path<T>}
          control={control}
          label={label("city")}
        />
      </div>
      <FormField
        name={"country" as Path<T>}
        control={control}
        label={label("country")}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          name={"email" as Path<T>}
          control={control}
          label={label("email")}
          type="email"
        />
        <FormField
          name={"phone" as Path<T>}
          control={control}
          label={label("phone")}
          type="tel"
        />
      </div>
      <FormField
        name={"photo" as Path<T>}
        control={control}
        label={label("photo")}
        helperText="https://…"
      />
    </>
  );
}
