export const APP_NAME = 'SGS';
export const APP_DESCRIPTION = 'Système de Gestion de Stock';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  COMPANIES: '/companies',
  USERS: '/users',
  CATEGORIES: '/categories',
  ARTICLES: '/articles',
  CUSTOMERS: '/customers',
  SUPPLIERS: '/suppliers',
  CUSTOMER_ORDERS: '/customer-orders',
  SUPPLIER_ORDERS: '/supplier-orders',
  SALES: '/sales',
  STOCK: '/stock',
  NOTIFICATIONS: '/notifications',
  DASHBOARD: '/dashboard',
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME_MODE: 'theme-mode',
  LANGUAGE: 'i18nextLng',
} as const;

export const PAGINATION_DEFAULT_SIZE = 10;
export const PAGINATION_SIZES = [5, 10, 20, 50, 100];

export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd MMMM yyyy',
  DATETIME: 'dd/MM/yyyy HH:mm',
  ISO: 'yyyy-MM-dd',
} as const;

export const CURRENCY = 'EUR';
export const LOCALE = 'fr-FR';

export const TOAST_DURATION = 4000;
export const DEBOUNCE_DELAY = 300;

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+33|0)[1-9](\d{8})$/,
  SIRET: /^\d{14}$/,
  VAT: /^FR[A-Z0-9]{2}\d{9}$/,
} as const;

export const ROLES = ['ADMIN', 'GESTIONNAIRE', 'VENDEUR'] as const;
export type Role = (typeof ROLES)[number];

export const ORDER_STATUSES = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const PAYMENT_STATUSES = ['PENDING', 'PAID', 'PARTIAL', 'REFUNDED', 'FAILED'] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const STOCK_MOVEMENT_TYPES = ['IN', 'OUT', 'TRANSFER', 'ADJUSTMENT', 'RETURN'] as const;
export type StockMovementType = (typeof STOCK_MOVEMENT_TYPES)[number];