import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  DataTable,
  DataTableToolbar,
  createDataTableColumns,
  DateCell,
} from "@/components/data-table";
import type { StockMovement, StockMovementType } from "../types";
import { useStockMovements, useCreateStockAdjustment } from "../hooks";
import { useArticles } from "@/features/articles/hooks";
import { FormDialog } from "@/components/forms/FormDialog";
import { Button } from "@/components/ui/Button";
import { hasAnyRole } from "@/lib/permissions";
import { Plus, TrendingDown, TrendingUp, Scale } from "lucide-react";

const TYPE_ICON_CLASS = {
  ENTREE: "text-success-600 dark:text-success-500",
  SORTIE: "text-danger-600 dark:text-danger-500",
  AJUSTEMENT: "text-info-600 dark:text-info-500",
} as const;

/** Adjustment form values (validated inline — the schema is a plain object shape). */
type AdjustForm = { articleId: string; quantity: number; reason: string };

const AdjustSchema = {
  safeParse: (v: AdjustForm) =>
    v.articleId !== "" &&
    Number.isInteger(v.quantity) &&
    v.quantity !== 0 &&
    v.reason.trim() !== ""
      ? { success: true as const, data: v }
      : { success: false as const },
};

/**
 * StockMovementsPage (P5.2) — the movements ledger:
 * date, article (links to details), typed movement (Entrée/Sortie/Ajustement),
 * signed quantity, motif + origin, and resulting stock. The type filter is
 * server-side (`?type=`). GESTIONNAIRE+ can post a manual inventory
 * correction (signed quantity + mandatory motif) via POST /mouvements-stock.
 */
export const StockMovementsPage = () => {
  const { t } = useTranslation("stock");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<StockMovementType | "">("");
  const [adjustOpen, setAdjustOpen] = useState(false);

  const canManage = hasAnyRole(["ADMIN", "GESTIONNAIRE"]);

  const movementsQuery = useStockMovements(
    typeFilter ? { type: typeFilter } : undefined,
  );
  const createAdjustment = useCreateStockAdjustment();

  const typeOptions = useMemo(
    () =>
      (["ENTREE", "SORTIE", "AJUSTEMENT"] as const).map((type) => ({
        value: type,
        label: t(`movementType.${type}`),
      })),
    [t],
  );

  const columns = useMemo(() => {
    const helper = createDataTableColumns<StockMovement>();
    return [
      helper.accessor("date", {
        header: t("fields.date"),
        cell: (info) => <DateCell value={info.getValue()} withTime />,
      }),
      helper.accessor("articleDesignation", {
        header: t("fields.article"),
        cell: (info) => (
          <Link
            to={`/catalog/articles/${info.row.original.articleId}`}
            className="text-content hover:text-primary hover:underline"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      helper.accessor("type", {
        header: t("fields.type"),
        cell: (info) => (
          <span
            className={`inline-flex items-center gap-1 text-sm font-medium ${TYPE_ICON_CLASS[info.getValue()]}`}
          >
            {info.getValue() === "ENTREE" && (
              <TrendingDown
                className="h-3.5 w-3.5 rotate-180"
                aria-hidden="true"
              />
            )}
            {info.getValue() === "SORTIE" && (
              <TrendingUp
                className="h-3.5 w-3.5 rotate-180"
                aria-hidden="true"
              />
            )}
            {info.getValue() === "AJUSTEMENT" && (
              <Scale className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {t(`movementType.${info.getValue()}`)}
          </span>
        ),
      }),
      helper.accessor("quantity", {
        header: t("fields.quantity"),
        cell: (info) => {
          const m = info.row.original;
          const signed =
            m.type === "AJUSTEMENT" && m.quantity > 0
              ? `+${m.quantity}`
              : String(m.quantity);
          return (
            <span
              className={`tabular-nums font-medium ${m.quantity < 0 ? "text-danger-600 dark:text-danger-500" : "text-success-600 dark:text-success-500"}`}
            >
              {signed}
            </span>
          );
        },
      }),
      helper.accessor("reason", {
        header: t("fields.reason"),
        cell: (info) => (
          <span className="block max-w-48 truncate" title={info.getValue()}>
            {info.getValue()}
          </span>
        ),
      }),
      helper.accessor("origin", {
        header: t("fields.origin"),
        cell: (info) => info.getValue() ?? "—",
      }),
      helper.accessor("stockAfter", {
        header: t("fields.stockAfter"),
        cell: (info) => (
          <span className="tabular-nums text-content-secondary">
            {info.getValue()}
          </span>
        ),
      }),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const handleAdjust = async (values: AdjustForm) => {
    await createAdjustment.mutateAsync(values);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-content">
          {t("movementsTitle")}
        </h1>
        <p className="mt-1 text-sm text-content-muted">
          {t("movementsSubtitle")}
        </p>
      </div>

      <DataTableToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={t("search")}
        actions={
          <>
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as StockMovementType | "")
              }
              className="h-9 rounded-sm border border-border-strong bg-surface px-2 text-sm text-content dark:border-[color:var(--dark-border)] dark:bg-[color:var(--dark-input)]"
              aria-label={t("filterType")}
            >
              <option value="">{t("filterAll")}</option>
              {typeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            {canManage && (
              <Button variant="outline" onClick={() => setAdjustOpen(true)}>
                <Plus className="h-4 w-4" />
                {t("adjust")}
              </Button>
            )}
          </>
        }
      />

      <DataTable<StockMovement>
        data={movementsQuery.data ?? []}
        columns={columns}
        isLoading={movementsQuery.isLoading}
        globalFilter={search}
      />

      {/* Manual inventory correction */}
      <AdjustDialog
        open={adjustOpen}
        onClose={() => setAdjustOpen(false)}
        onSubmit={handleAdjust}
      />
    </div>
  );
};

/**
 * Adjustment dialog — article picker, signed quantity, mandatory motif.
 * Uses the standard FormDialog so styling, focus and pending state match.
 */
function AdjustDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: AdjustForm) => Promise<unknown>;
}) {
  const { t } = useTranslation("stock");
  const articlesQuery = useArticles();

  const [articleId, setArticleId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");

  const valid = AdjustSchema.safeParse({ articleId, quantity, reason }).success;

  const handleSubmit = async () => {
    if (!valid) return;
    await onSubmit({ articleId, quantity, reason: reason.trim() });
    setArticleId("");
    setQuantity(1);
    setReason("");
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title={t("adjustTitle")}
      schema={AdjustSchema as never}
      defaultValues={{ articleId, quantity, reason }}
      onSubmit={handleSubmit}
    >
      {() => (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="adjust-article"
              className="mb-1 block text-sm font-medium text-content"
            >
              {t("fields.article")}
            </label>
            <select
              id="adjust-article"
              value={articleId}
              onChange={(e) => setArticleId(e.target.value)}
              required
              className="w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-content dark:border-[color:var(--dark-border)] dark:bg-[color:var(--dark-input)]"
            >
              <option value="" disabled>
                —
              </option>
              {(articlesQuery.data ?? []).map((a) => (
                <option key={a.id} value={a.id}>
                  {a.code} — {a.designation}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="adjust-qty"
              className="mb-1 block text-sm font-medium text-content"
            >
              {t("fields.quantitySigned")}
            </label>
            <input
              id="adjust-qty"
              type="number"
              step={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-content dark:border-[color:var(--dark-border)] dark:bg-[color:var(--dark-input)]"
              aria-describedby="adjust-qty-hint"
            />
            <p id="adjust-qty-hint" className="mt-1 text-xs text-content-muted">
              {t("fields.quantitySignedHint")}
            </p>
          </div>
          <div>
            <label
              htmlFor="adjust-reason"
              className="mb-1 block text-sm font-medium text-content"
            >
              {t("fields.reason")}
            </label>
            <input
              id="adjust-reason"
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-content dark:border-[color:var(--dark-border)] dark:bg-[color:var(--dark-input)]"
            />
          </div>
        </div>
      )}
    </FormDialog>
  );
}
