/**
 * Supplier orders — real shapes pinned from swagger.json (roadmap P0.2 / P4.3).
 *
 * Backend resource: «commandes-fournisseur» (French). Components never see
 * DTOs; mapping happens in ../api/mappers.ts.
 *
 * Contract notes:
 *  - Status lifecycle differs from customer orders: EN_ATTENTE → RECUE
 *    (reception) or ANNULEE. `OrderStatusBadge` handles both lifecycles.
 *  - PUT /{id}/receptionner generates a stock *entry* per line; refused if
 *    the order was already received.
 *  - Lines are server-priced — the request sends only { articleId, quantite }.
 *  - No delete endpoint; cancellation is the terminal flow.
 */

export type SupplierOrderStatus = "EN_ATTENTE" | "RECUE" | "ANNULEE";

/** Body of POST /api/commandes-fournisseur — swagger `CommandeFournisseurRequestDTO`. */
export interface CommandeFournisseurRequestDTO {
  fournisseurId: number;
  lignes: LigneCommandeFournisseurRequestDTO[];
}

export interface LigneCommandeFournisseurRequestDTO {
  articleId: number;
  quantite: number;
}

/** Response of GET/POST/PUT — swagger `CommandeFournisseurResponseDTO`. */
export interface CommandeFournisseurResponseDTO {
  id: number;
  code: string;
  /** ISO date-time. */
  dateCommande: string;
  statut: SupplierOrderStatus;
  fournisseurId: number;
  fournisseurNom: string;
  lignes: LigneCommandeFournisseurResponseDTO[];
  total: number;
}

export interface LigneCommandeFournisseurResponseDTO {
  id: number;
  articleId: number;
  articleDesignation: string;
  quantite: number;
  prixUnitaire: number;
  sousTotal: number;
}

/**
 * Domain order — mapped from `CommandeFournisseurResponseDTO` in ../api/mappers.ts.
 * Type alias (not interface) for TanStack Table v9's `RowData` constraint.
 */
export type SupplierOrder = {
  id: string;
  code: string;
  date: string;
  status: SupplierOrderStatus;
  supplierId: string;
  /** `fournisseurNom` — denormalized label sent by the backend. */
  supplierName: string;
  lines: SupplierOrderLine[];
  total: number;
};

export type SupplierOrderLine = {
  id: string;
  articleId: string;
  articleDesignation: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
};

/** Create payload — the order and its lines in one request. */
export type SupplierOrderWrite = {
  supplierId: string;
  lines: Array<{ articleId: string; quantity: number }>;
};
