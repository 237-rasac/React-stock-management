import { useTranslation } from "react-i18next";
import { Building2, ShieldCheck } from "lucide-react";
import { FormDialog } from "@/components/forms/FormDialog";
import { FormField } from "@/components/forms/FormFields";
import {
  CityField,
  CountryField,
  PhoneField,
} from "@/components/forms/LocationFields";
import {
  CompanyOnboardingSchema,
  EMPTY_ONBOARDING,
  type CompanyOnboardingFormData,
} from "../schemas";
import { useOnboardCompany } from "../hooks";

/**
 * «Onboarder une entreprise cliente» — the platform console's main action.
 *
 * One dialog, two sections, one backend transaction: the company and the
 * first ADMIN account that will manage it. The credentials captured here are
 * immediately usable — the admin can log in and land on their own company
 * dashboard as soon as this dialog closes.
 *
 * Required fields follow the swagger contract exactly (company name + the
 * four admin identity fields). Everything else is optional and only checked
 * for format, so an address or a phone number can always be added later.
 */
interface OnboardCompanyDialogProps {
  open: boolean;
  onClose: () => void;
}

/** Section heading inside the form. */
function SectionHead({
  icon: Icon,
  title,
  hint,
}: {
  icon: typeof Building2;
  title: string;
  hint: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-border pb-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-accent-500/15 text-accent-600 dark:text-accent-400">
        <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-content">{title}</h3>
        <p className="mt-0.5 text-xs text-content-muted">{hint}</p>
      </div>
    </div>
  );
}

export function OnboardCompanyDialog({
  open,
  onClose,
}: OnboardCompanyDialogProps) {
  const { t } = useTranslation("platform");
  const onboard = useOnboardCompany();

  return (
    <FormDialog<CompanyOnboardingFormData>
      open={open}
      onClose={onClose}
      title={t("onboard.title")}
      description={t("onboard.description")}
      schema={CompanyOnboardingSchema}
      defaultValues={EMPTY_ONBOARDING}
      submitLabel={t("onboard.submit")}
      submitVariant="gold"
      className="max-w-2xl"
      onSubmit={(values) => onboard.mutateAsync(values)}
    >
      {({ control }) => (
        <div className="max-h-[min(70vh,640px)] space-y-6 overflow-y-auto pr-1">
          {/* ---------------- Company ---------------- */}
          <section className="space-y-4">
            <SectionHead
              icon={Building2}
              title={t("onboard.companySection")}
              hint={t("onboard.companyHint")}
            />

            <FormField
              name="companyName"
              control={control}
              label={t("fields.companyName")}
              required
            />

            <FormField
              name="addressLine1"
              control={control}
              label={t("fields.addressLine1")}
            />
            <FormField
              name="addressLine2"
              control={control}
              label={t("fields.addressLine2")}
            />

            {/* Country drives BOTH the city list and the phone dial code. */}
            <CountryField
              name="country"
              control={control}
              label={t("fields.country")}
              helperText={t("onboard.countryHint")}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                name="postalCode"
                control={control}
                label={t("fields.postalCode")}
              />
              <CityField
                name="city"
                countryFieldName="country"
                control={control}
                label={t("fields.city")}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                name="companyEmail"
                control={control}
                label={t("fields.companyEmail")}
                type="email"
              />
              <PhoneField
                name="companyPhone"
                countryFieldName="country"
                control={control}
                label={t("fields.companyPhone")}
              />
            </div>
          </section>

          {/* ---------------- First ADMIN ---------------- */}
          <section className="space-y-4">
            <SectionHead
              icon={ShieldCheck}
              title={t("onboard.adminSection")}
              hint={t("onboard.adminHint")}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                name="adminFirstName"
                control={control}
                label={t("fields.adminFirstName")}
                required
              />
              <FormField
                name="adminLastName"
                control={control}
                label={t("fields.adminLastName")}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                name="adminLogin"
                control={control}
                label={t("fields.adminLogin")}
                helperText={t("onboard.loginHint")}
                required
              />
              <FormField
                name="adminPassword"
                control={control}
                label={t("fields.adminPassword")}
                type="password"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                name="adminEmail"
                control={control}
                label={t("fields.adminEmail")}
                type="email"
              />
              <PhoneField
                name="adminPhone"
                countryFieldName="country"
                control={control}
                label={t("fields.adminPhone")}
              />
            </div>
          </section>

          <p className="text-xs text-content-muted">
            {t("onboard.requiredHint")}
          </p>
        </div>
      )}
    </FormDialog>
  );
}
