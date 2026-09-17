import {
  LayoutDashboard,
  BarChart3,
  Tag,
  Package,
  Building2,
  Users,
  User,
  Truck,
  ClipboardList,
  ClipboardCheck,
  ArrowLeftRight,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "./permissions";

export interface NavItem {
  key: string;
  /** i18n key in the `common:layout` namespace (e.g. `navDashboard`). */
  labelKey: string;
  href: string;
  icon: LucideIcon;
  /** Restrict visibility to these roles; omit = visible to all authenticated users. */
  roles?: Role[];
  /** NavLink `end` — match only the exact path (needed for index pages). */
  end?: boolean;
}

export interface NavGroup {
  /** i18n key in the `common:layout` namespace (e.g. `groupOverview`). */
  labelKey: string;
  items: NavItem[];
}

/**
 * Grouped primary navigation — mirrors the mockup NAV structure
 * (Vue d'ensemble / Catalogue / Organisation / Tiers / Transactions).
 * Labels are i18n KEYS (resolved via `common:layout.<key>` by the Sidebar)
 * so the navigation translates with the language switcher. Hrefs stay
 * app-absolute (`/dashboard`) — the Sidebar prefixes them with langPath().
 */
export const NAV_GROUPS: NavGroup[] = [
  {
    labelKey: "groupOverview",
    items: [
      {
        key: "dashboard",
        labelKey: "navDashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        end: true,
      },
      {
        key: "stock",
        labelKey: "navStockReports",
        href: "/stock",
        icon: BarChart3,
      },
    ],
  },
  {
    labelKey: "groupCatalog",
    items: [
      {
        key: "categories",
        labelKey: "navCategories",
        href: "/catalog/categories",
        icon: Tag,
        roles: ["ADMIN", "GESTIONNAIRE"],
      },
      {
        key: "articles",
        labelKey: "navArticles",
        href: "/catalog/articles",
        icon: Package,
      },
    ],
  },
  {
    labelKey: "groupOrganization",
    items: [
      {
        key: "companies",
        labelKey: "navCompanies",
        href: "/companies",
        icon: Building2,
        roles: ["ADMIN"],
      },
      {
        key: "users",
        labelKey: "navUsers",
        href: "/users",
        icon: Users,
        roles: ["ADMIN"],
      },
    ],
  },
  {
    labelKey: "groupPartners",
    items: [
      {
        key: "customers",
        labelKey: "navCustomers",
        href: "/customers",
        icon: User,
      },
      {
        key: "suppliers",
        labelKey: "navSuppliers",
        href: "/suppliers",
        icon: Truck,
      },
    ],
  },
  {
    labelKey: "groupTransactions",
    items: [
      {
        key: "customer-orders",
        labelKey: "navCustomerOrders",
        href: "/customer-orders",
        icon: ClipboardList,
      },
      {
        key: "supplier-orders",
        labelKey: "navSupplierOrders",
        href: "/supplier-orders",
        icon: ClipboardCheck,
      },
      {
        key: "stock-movements",
        labelKey: "navStockMovements",
        href: "/stock/movements",
        icon: ArrowLeftRight,
      },
      {
        key: "sales",
        labelKey: "navSales",
        href: "/sales",
        icon: ShoppingCart,
      },
    ],
  },
];
