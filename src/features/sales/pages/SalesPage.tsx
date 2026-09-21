import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  DataTable,
  DataTableToolbar,
  createDataTableColumns,
  DateCell,
  CurrencyCell,
} from "@/components/data-table";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import type { Sale } from "../types";
import { useSales } from "../hooks";
import { PosCheckoutDialog } from "../components/PosCheckoutDialog";
import { hasAnyRole } from "@/lib/permissions";
import { ShoppingCart } from "lucide-react";

/**
 * SalesPage (P5.4) — sale history + the POS checkout:
 *  - list: code (mono), date-time, customer (or walk-in), line count, total
 *  - details drawer: sold line items with server-priced lines and the total
 *  - POS dialog (GESTIONNAIRE+; VENDEUR's primary screen): cart lines with
 *    live stock/prices → POST /api/ventes (stock decremented server-side)
 */
export const SalesPage = () => {
  const { t } = useTranslation("sales");

  const [search, setSearch] = useState("");
  const [posOpen, setPosOpen] = useState(false);
  const [viewing, setViewing] = useState<Sale | null>(null);

  const canSell = hasAnyRole(["ADMIN", "GESTIONNAIRE", "VENDEUR"]);

  const listQuery = useSales();

  const columns = useMemo(() => {
    const helper = createDataTableColumns<Sale>();
    return [
      helper.accessor("code", {
        header: t("fields.code"),
        cell: (info) => (
          <button
            type="button"
            className="font-mono text-sm text-primary hover:underline"
            onClick={() => setViewing(info.row.original)}
          >
            {info.getValue()}
          </button>
        ),
      }),
      helper.accessor("date", {
        header: t("fields.date"),
        cell: (info) => <DateCell value={info.getValue()} withTime />,
      }),
      helper.accessor("customerName", {
        header: t("fields.customer"),
        cell: (info) => {
          const sale = info.row.original;
          if (sale.customerId) {
            return (
              <Link
                to={`/customers/${sale.customerId}`}
                className="text-content hover:text-primary hover:underline"
              >
                {sale.customerName}
              </Link>
            );
          }
          return <span className="text-content-muted">{t("anonymous")}</span>;
        },
      }),
      helper.accessor((row) => row.lines.length, {
        id: "lines",
        header: t("linesCard"),
      }),
      helper.accessor("total", {
        header: t("fields.total"),
        cell: (info) => <CurrencyCell value={info.getValue()} />,
      }),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

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
          canSell && (
            <Button variant="gold" onClick={() => setPosOpen(true)}>
              <ShoppingCart className="h-4 w-4" />
              {t("posTitle")}
            </Button>
          )
        }
      />

      <DataTable<Sale>
        data={listQuery.data ?? []}
        columns={columns}
        isLoading={listQuery.isLoading}
        globalFilter={search}
      />

      {/* Sale details drawer */}
      <SaleDrawer sale={viewing} onClose={() => setViewing(null)} />

      {/* POS checkout */}
      <PosCheckoutDialog open={posOpen} onClose={() => setPosOpen(false)} />
    </div>
  );
};

/** Details dialog with the sold line items (lines are server-priced). */
function SaleDrawer({
  sale,
  onClose,
}: {
  sale: Sale | null;
  onClose: () => void;
}) {
  const { t } = useTranslation("sales");
  if (!sale) return null;

  return (
    <Dialog
      open={!!sale}
      onOpenChange={(o) => !o && onClose()}
      title={sale.code}
    >
      <div className="space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-content-secondary">{t("fields.date")}</span>
          <DateCell value={sale.date} withTime />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-content-secondary">{t("fields.customer")}</span>
          {sale.customerId ? (
            <Link
              to={`/customers/${sale.customerId}`}
              className="text-primary hover:underline"
              onClick={onClose}
            >
              {sale.customerName}
            </Link>
          ) : (
            <span className="text-content-muted">{t("anonymous")}</span>
          )}
        </div>

        <div className="border-t border-border-strong pt-3 dark:border-[color:var(--dark-border)]">
          <p className="mb-2 font-medium text-content">{t("linesCard")}</p>
          <table className="w-full">
            <tbody>
              {sale.lines.map((line) => (
                <tr
                  key={line.id}
                  className="border-b border-border/60 last:border-0 dark:border-[color:var(--dark-border)]/60"
                >
                  <td className="py-2 pr-2 text-content">
                    {line.articleDesignation}
                  </td>
                  <td className="py-2 pr-2 text-right tabular-nums text-content-secondary">
                    ×{line.quantity}
                  </td>
                  <td className="py-2 text-right font-medium tabular-nums text-content">
                    <CurrencyCell value={line.subTotal} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border-strong pt-3 dark:border-[color:var(--dark-border)]">
          <span className="text-content-secondary">{t("fields.total")}</span>
          <span className="text-lg font-bold tabular-nums text-content">
            <CurrencyCell value={sale.total} />
          </span>
        </div>
      </div>
    </Dialog>
  );
}
