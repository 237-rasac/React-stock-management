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
import type { CustomerOrder } from "../types";
import { useCustomerOrders } from "../hooks";
import { OrderStatusBadge } from "../components/OrderStatusBadge";

/**
 * CustomerOrdersPage (P4.2) — list of «commandes-client».
 * Read-first: statuses, dates and totals; rows link to the details page,
 * which owns the lifecycle actions and the line-items table. Creating an
 * order is done from the details flow (P4.2 create dialog comes with the
 * POS/sale work in P5.4 — the backend model is the same).
 */
export const CustomerOrdersPage = () => {
  const { t } = useTranslation("customer-orders");

  const [search, setSearch] = useState("");

  const listQuery = useCustomerOrders();

  const columns = useMemo(() => {
    const helper = createDataTableColumns<CustomerOrder>();
    return [
      helper.accessor("code", {
        header: t("fields.code"),
        cell: (info) => (
          <Link
            to={`/customer-orders/${info.row.original.id}`}
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
      helper.accessor("customerName", {
        header: t("fields.customer"),
      }),
      helper.accessor("status", {
        header: t("fields.status"),
        cell: (info) => <OrderStatusBadge status={info.getValue()} />,
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

      <DataTable<CustomerOrder>
        data={listQuery.data ?? []}
        columns={columns}
        isLoading={listQuery.isLoading}
        globalFilter={search}
      />
    </div>
  );
};
