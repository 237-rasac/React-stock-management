import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/Badge";
import type { OrderStatus } from "../types";

/** Status → badge color: in-progress info, validated success, cancelled danger. */
const STATUS_VARIANT = {
  EN_COURS: "info",
  VALIDEE: "success",
  ANNULEE: "danger",
} as const;

/**
 * Order status badge (P4.2) — shared by customer orders and supplier orders
 * (same EN_COURS/VALIDEE/ANNULEE lifecycle) so both lists and detail headers
 * render identically.
 */
export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { t } = useTranslation("customer-orders");
  return (
    <Badge variant={STATUS_VARIANT[status]}>{t(`status.${status}`)}</Badge>
  );
}
