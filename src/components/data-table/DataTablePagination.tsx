import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGINATION_SIZES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

/**
 * Pagination footer (P1.1) — plain props, no table generics. The parent
 * DataTable reads page state/total from the table instance and passes values;
 * this keeps the footer trivially testable and reusable.
 */
interface DataTablePaginationProps {
  /** Zero-based current page index. */
  pageIndex: number;
  pageSize: number;
  /** Total number of pages (>= 1). */
  pageCount: number;
  /** Total items across all pages (post-filter). */
  totalItems: number;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function DataTablePagination({
  pageIndex,
  pageSize,
  pageCount,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm">
      <p className="text-content-muted">
        {t("totalItems", { count: totalItems })}
      </p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="dt-page-size" className="sr-only">
            {t("rowsPerPage")}
          </label>
          <select
            id="dt-page-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-sm border border-border-strong bg-surface px-2 py-1 text-sm text-content focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-[color:var(--dark-input)] dark:border-[color:var(--dark-border)]"
          >
            {PAGINATION_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <span className="whitespace-nowrap text-content-muted">
          {t("pageInfo", { page: pageIndex + 1, totalPages: pageCount })}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
            aria-label={t("previous")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex >= pageCount - 1}
            aria-label={t("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
