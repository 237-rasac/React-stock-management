import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DataTable,
  DataTableToolbar,
  createDataTableColumns,
  MonoCell,
} from "@/components/data-table";
import type { Company } from "../types";
import type { CompaniesFormData } from "../schemas";
import { CompaniesSchema } from "../schemas";
import {
  useCompanies,
  useCreateCompany,
  useUpdateCompany,
  useDeleteCompany,
} from "../hooks";
import { FormDialog } from "@/components/forms/FormDialog";
import { ConfirmDialog } from "@/components/forms/ConfirmDialog";
import { FormField } from "@/components/forms/FormFields";
import { Button } from "@/components/ui/Button";
import { hasRole } from "@/lib/permissions";
import { Pencil, Plus, Trash2 } from "lucide-react";

/**
 * CompaniesPage (P3.2) — the pilot pattern on the «entreprises» resource.
 * ADMIN-only module: route is wrapped in RoleRoute and the page re-checks
 * the role (deep-link defense) before rendering anything.
 */
export const CompaniesPage = () => {
  const { t } = useTranslation("companies");

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Company | null>(null);
  const [deleting, setDeleting] = useState<Company | null>(null);

  // Re-check on every render (store is reactive) — guards direct URL access.
  const isAdmin = hasRole("ADMIN");

  const listQuery = useCompanies();
  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();
  const deleteCompany = useDeleteCompany();

  const columns = useMemo(() => {
    const helper = createDataTableColumns<Company>();
    return [
      helper.accessor("name", {
        header: t("fields.name"),
      }),
      helper.accessor("city", {
        header: t("fields.city"),
        cell: (info) => info.getValue() ?? "—",
      }),
      helper.accessor("email", {
        header: t("fields.email"),
        cell: (info) =>
          info.getValue() ? (
            <a
              href={`mailto:${info.getValue()}`}
              className="text-primary hover:underline"
            >
              {info.getValue()}
            </a>
          ) : (
            "—"
          ),
      }),
      helper.accessor("phone", {
        header: t("fields.phone"),
        cell: (info) => <MonoCell value={info.getValue() ?? "—"} />,
      }),
      ...(isAdmin
        ? [
            helper.display({
              id: "actions",
              header: t("actions"),
              cell: (info) => (
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t("editTitle")}
                    onClick={() => {
                      setEditing(info.row.original);
                      setDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t("confirmDelete")}
                    onClick={() => setDeleting(info.row.original)}
                  >
                    <Trash2 className="h-4 w-4 text-danger-600 dark:text-danger-500" />
                  </Button>
                </div>
              ),
            }),
          ]
        : []),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, isAdmin]);

  const handleSubmit = async (values: CompaniesFormData) => {
    if (editing) {
      await updateCompany.mutateAsync({ id: editing.id, data: values });
    } else {
      await createCompany.mutateAsync(values);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    await deleteCompany.mutateAsync(deleting.id);
    setDeleting(null);
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-lg font-medium text-content">
          {t("adminOnly", {
            defaultValue: "Accès réservé aux administrateurs",
          })}
        </h2>
        <p className="mt-1 text-sm text-content-muted">
          {t("adminOnlyHint", {
            defaultValue: "Cette section nécessite le rôle ADMIN.",
          })}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-content">{t("title")}</h1>
        <p className="mt-1 text-sm text-content-muted">{t("subtitle")}</p>
      </div>

      <DataTableToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={t("search")}
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4" />
            {t("createTitle")}
          </Button>
        }
      />

      <DataTable<Company>
        data={listQuery.data ?? []}
        columns={columns}
        isLoading={listQuery.isLoading}
        globalFilter={search}
      />

      {/* Create / edit */}
      <FormDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditing(null);
        }}
        title={editing ? t("editTitle") : t("createTitle")}
        schema={CompaniesSchema}
        defaultValues={
          editing
            ? {
                name: editing.name,
                addressLine1: editing.addressLine1 ?? "",
                addressLine2: editing.addressLine2 ?? "",
                city: editing.city ?? "",
                postalCode: editing.postalCode ?? "",
                country: editing.country ?? "",
                email: editing.email ?? "",
                phone: editing.phone ?? "",
              }
            : { name: "" }
        }
        onSubmit={handleSubmit}
      >
        {({ control }) => (
          <>
            <FormField
              name="name"
              control={control}
              label={t("fields.name")}
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                name="postalCode"
                control={control}
                label={t("fields.postalCode")}
              />
              <FormField
                name="city"
                control={control}
                label={t("fields.city")}
              />
            </div>
            <FormField
              name="country"
              control={control}
              label={t("fields.country")}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                name="email"
                control={control}
                label={t("fields.email")}
                type="email"
              />
              <FormField
                name="phone"
                control={control}
                label={t("fields.phone")}
                type="tel"
              />
            </div>
            <p className="text-xs text-content-muted">
              {t("addressHint", {
                defaultValue:
                  "Seul le nom est obligatoire — les autres champs sont optionnels.",
              })}
            </p>
          </>
        )}
      </FormDialog>

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        entityName={deleting?.name}
        onConfirm={handleDelete}
      />
    </div>
  );
};
