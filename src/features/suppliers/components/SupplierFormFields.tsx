import { useTranslation } from "react-i18next";
import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField } from "@/components/forms/FormFields";

interface SupplierFormFieldsProps<T extends FieldValues> {
  control: Control<T>;
  /** i18n label key prefix (default "fields"). */
  labelPrefix?: string;
}

/**
 * The supplier form body (P3.4) — shared by the Suppliers list dialog and the
 * details-page edit dialog so both stay in sync with the schema.
 * Mirrors `FournisseurRequestDTO`: name required, address/contact optional.
 */
export function SupplierFormFields<T extends FieldValues>({
  control,
  labelPrefix = "fields",
}: SupplierFormFieldsProps<T>) {
  const { t } = useTranslation("suppliers");
  // Dynamic key → t() returns a union; labels are always strings in our JSONs.
  const label = (key: string): string => t(`${labelPrefix}.${key}`) as string;

  return (
    <>
      <FormField
        name={"name" as Path<T>}
        control={control}
        label={label("name")}
        required
      />
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
    </>
  );
}
