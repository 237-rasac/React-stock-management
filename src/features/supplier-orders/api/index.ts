import apiClient from "@/api/client";
import { API_ENDPOINTS } from "@/lib/constants";
import { toCommandeFournisseurRequest, toSupplierOrder } from "./mappers";
import type {
  CommandeFournisseurResponseDTO,
  SupplierOrder,
  SupplierOrderWrite,
} from "../types";

/**
 * Supplier orders API — pinned to swagger.json (backend resource: «commandes-fournisseur»):
 *
 *   GET    /api/commandes-fournisseur                → CommandeFournisseurResponseDTO[] (bare array)
 *   POST   /api/commandes-fournisseur                → CommandeFournisseurResponseDTO (order + lines in one request)
 *   GET    /api/commandes-fournisseur/{id}           → CommandeFournisseurResponseDTO
 *   PUT    /api/commandes-fournisseur/{id}/receptionner → CommandeFournisseurResponseDTO (stock entries per line; refused if already received)
 *   PUT    /api/commandes-fournisseur/{id}/annuler   → CommandeFournisseurResponseDTO
 *
 * There is no delete endpoint — cancellation is the terminal flow. Every
 * method returns the domain `SupplierOrder`, never raw DTOs.
 */
export const SupplierOrdersApi = {
  getAll: async (): Promise<SupplierOrder[]> => {
    const res = await apiClient.get<CommandeFournisseurResponseDTO[]>(
      API_ENDPOINTS.SUPPLIER_ORDERS,
    );
    return res.data.map(toSupplierOrder);
  },

  getById: async (id: string): Promise<SupplierOrder> => {
    const res = await apiClient.get<CommandeFournisseurResponseDTO>(
      API_ENDPOINTS.SUPPLIER_ORDER(id),
    );
    return toSupplierOrder(res.data);
  },

  create: async (input: SupplierOrderWrite): Promise<SupplierOrder> => {
    const res = await apiClient.post<CommandeFournisseurResponseDTO>(
      API_ENDPOINTS.SUPPLIER_ORDERS,
      toCommandeFournisseurRequest(input),
    );
    return toSupplierOrder(res.data);
  },

  /** PUT /{id}/receptionner — generates a stock entry per line; refused when already RECUE. */
  receive: async (id: string): Promise<SupplierOrder> => {
    const res = await apiClient.put<CommandeFournisseurResponseDTO>(
      API_ENDPOINTS.SUPPLIER_ORDER_RECEIVE(id),
    );
    return toSupplierOrder(res.data);
  },

  /** PUT /{id}/annuler. */
  cancel: async (id: string): Promise<SupplierOrder> => {
    const res = await apiClient.put<CommandeFournisseurResponseDTO>(
      API_ENDPOINTS.SUPPLIER_ORDER_CANCEL(id),
    );
    return toSupplierOrder(res.data);
  },
};
