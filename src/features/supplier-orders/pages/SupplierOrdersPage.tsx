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
import type { SupplierOrder } from "../types";
import { useSupplierOrders } from "../hooks";
import { SupplierOrderStatusBadge } from "../components/SupplierOrderStatusBadge";

/**
 * SupplierOrdersPage (P4.3) — list of «commandes-fournisseur».
 * Rows link to the details page, which owns the lifecycle actions
 * (receptionner / annuler) and the line-items table.
 */
export const SupplierOrdersPage = () => {
  const { t } = useTranslation("supplier-orders");

  const [search, setSearch] = useState("");

  const listQuery = useSupplierOrders();

  const columns = useMemo(() => {
    const helper = createDataTableColumns<SupplierOrder>();
    return [
      helper.accessor("code", {
        header: t("fields.code"),
        cell: (info) => (
          <Link
            to={`/supplier-orders/${info.row.original.id}`}
            className="font-mono text-sm text-primary hover:underline"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      helper.accessor("date", {
        header: t("fields.date"),
        cell: (info) => <DateCell value={info.getValue()} withTime />,
      }),
      helper.accessor("supplierName", {
        header: t("fields.supplier"),
      }),
      helper.accessor("status", {
        header: t("fields.status"),
        cell: (info) => <SupplierOrderStatusBadge status={info.getValue()} />,
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
      />

      <DataTable<SupplierOrder>
        data={listQuery.data ?? []}
        columns={columns}
        isLoading={listQuery.isLoading}
        globalFilter={search}
      />
    </div>
  );
};
