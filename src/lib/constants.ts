export const APP_NAME = "SGS";
export const APP_DESCRIPTION = "Système de Gestion de Stock";

/**
 * Backend endpoint paths — pinned to swagger.json (v1.0).
 * The axios baseURL already includes the `/api` prefix (VITE_API_URL),
 * so paths here omit it (e.g. `/clients` → GET {API_URL}/api/clients).
 * NOTE: the backend uses French resource names; do not "translate" them.
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },
  COMPANIES: "/entreprises",
  COMPANY: (id: string) => `/entreprises/${id}`,
  USERS: "/utilisateurs",
  USER: (id: string) => `/utilisateurs/${id}`,
  CATEGORIES: "/categories",
  CATEGORY: (id: string) => `/categories/${id}`,
  ARTICLES: "/articles",
  ARTICLE: (id: string) => `/articles/${id}`,
  CUSTOMERS: "/clients",
  CUSTOMER: (id: string) => `/clients/${id}`,
  SUPPLIERS: "/fournisseurs",
  SUPPLIER: (id: string) => `/fournisseurs/${id}`,
  CUSTOMER_ORDERS: "/commandes-client",
  CUSTOMER_ORDER: (id: string) => `/commandes-client/${id}`,
  CUSTOMER_ORDER_VALIDATE: (id: string) => `/commandes-client/${id}/valider`,
  CUSTOMER_ORDER_CANCEL: (id: string) => `/commandes-client/${id}/annuler`,
  SUPPLIER_ORDERS: "/commandes-fournisseur",
  SUPPLIER_ORDER: (id: string) => `/commandes-fournisseur/${id}`,
  SUPPLIER_ORDER_RECEIVE: (id: string) =>
    `/commandes-fournisseur/${id}/receptionner`,
  SUPPLIER_ORDER_CANCEL: (id: string) => `/commandes-fournisseur/${id}/annuler`,
  SALES: "/ventes",
  SALE: (id: string) => `/ventes/${id}`,
  STOCK: {
    /** Current stock state per article (read-only). */
    ETAT: "/stock/etat",
    /** Low-stock alerts (read-only). */
    ALERTS: "/stock/alertes",
    /** Aggregate stock valuation. */
    VALUATION: "/stock/valorisation",
    /** Stock movements ledger; supports `articleId` & `type` query params. */
    MOVEMENTS: "/mouvements-stock",
  },
  NOTIFICATIONS: "/notifications",
  DASHBOARD_KPIs: "/dashboard/kpis",
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  USER: "user",
  /** zustand persist key for the auth store (see stores/auth.store.ts). */
  AUTH_STORAGE: "auth-storage",
  THEME_MODE: "theme-mode",
  LANGUAGE: "i18nextLng",
} as const;

export const PAGINATION_DEFAULT_SIZE = 10;
export const PAGINATION_SIZES = [5, 10, 20, 50, 100];

export const DATE_FORMATS = {
  SHORT: "dd/MM/yyyy",
  LONG: "dd MMMM yyyy",
  DATETIME: "dd/MM/yyyy HH:mm",
  ISO: "yyyy-MM-dd",
} as const;

export const CURRENCY = "EUR";
export const LOCALE = "fr-FR";

export const TOAST_DURATION = 4000;
export const DEBOUNCE_DELAY = 300;

/**
 * NOTE — no domain enums here. Status/movement/role types live pinned to
 * swagger.json with their features and are the single source of truth:
 *   - customer-orders/types `OrderStatus`      = EN_COURS | VALIDEE | ANNULEE
 *   - supplier-orders/types `SupplierOrderStatus` = EN_ATTENTE | RECUE | ANNULEE
 *   - stock/types `StockMovementType`          = ENTREE | SORTIE | AJUSTEMENT
 *   - auth/types `UserRole` + lib/permissions `ROLES` = ADMIN | GESTIONNAIRE | VENDEUR
 * Do not reintroduce parallel enum lists (the old PENDING/SHIPPED/IN/OUT ones
 * never existed in the backend contract).
 */
