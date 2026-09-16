export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
  timestamp: string;
}

export interface RequestParams {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  [key: string]: unknown;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ID {
  id: string;
}

export interface Timestamped {
  createdAt: string;
  updatedAt: string;
}

export interface UserRef {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CompanyRef {
  id: string;
  name: string;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}