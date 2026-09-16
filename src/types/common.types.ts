export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  permissions: string[];
  companyId?: string;
  phone?: string;
  avatar?: string;
  lastLoginAt?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  siret?: string;
  vatNumber?: string;
  address?: Address;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  children?: Category[];
  articleCount?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  code: string;
  name: string;
  description?: string;
  categoryId: string;
  category?: Category;
  unitPrice: number;
  purchasePrice?: number;
  taxRate: number;
  unit: string;
  barcode?: string;
  minStock: number;
  maxStock?: number;
  currentStock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  code: string;
  name: string;
  email?: string;
  phone?: string;
  address?: Address;
  siret?: string;
  vatNumber?: string;
  paymentTerms?: number;
  creditLimit?: number;
  outstandingBalance: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  code: string;
  name: string;
  email?: string;
  phone?: string;
  address?: Address;
  siret?: string;
  vatNumber?: string;
  paymentTerms?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  articleId: string;
  article?: Article;
  quantity: number;
  unitPrice: number;
  discount?: number;
  taxRate: number;
  total: number;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customer?: Customer;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  orderDate: string;
  deliveryDate?: string;
  items: OrderItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierOrder {
  id: string;
  orderNumber: string;
  supplierId: string;
  supplier?: Supplier;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  orderDate: string;
  expectedDeliveryDate?: string;
  items: OrderItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  saleNumber: string;
  customerId?: string;
  customer?: Customer;
  items: OrderItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  saleDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StockMovement {
  id: string;
  articleId: string;
  article?: Article;
  type: StockMovementType;
  quantity: number;
  reason?: string;
  referenceType?: string;
  referenceId?: string;
  userId: string;
  user?: UserRef;
  createdAt: string;
}

export interface StockAlert {
  id: string;
  articleId: string;
  article?: Article;
  currentStock: number;
  minStock: number;
  severity: 'warning' | 'critical';
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface DashboardKPIs {
  totalArticles: number;
  totalCustomers: number;
  totalSuppliers: number;
  totalOrders: number;
  totalSales: number;
  lowStockCount: number;
  pendingOrders: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
  topSellingArticles: Array<{ article: Article; quantity: number; revenue: number }>;
  recentOrders: CustomerOrder[];
  recentSales: Sale[];
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'PARTIAL' | 'REFUNDED' | 'FAILED';
export type StockMovementType = 'IN' | 'OUT' | 'TRANSFER' | 'ADJUSTMENT' | 'RETURN';

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}