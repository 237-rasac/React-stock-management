/**
 * Customer orders — real shapes pinned from swagger.json (roadmap P0.2 / P4.2).
 *
 * Backend resource: «commandes-client» (French). Components never see DTOs;
 * mapping happens in ../api/mappers.ts.
 *
 * Contract notes:
 *  - `total` is server-computed from the lines; the client recomputes it as a
 *    sanity fallback but trusts the wire value when present.
 *  - Lines carry `prixUnitaire`/`sousTotal` read-only — the request sends only
 *    { articleId, quantite } and the backend prices the lines.
 *  - Lifecycle: create → EN_COURS; PUT /{id}/valider (409 if stock insufficient);
 *    PUT /{id}/annuler (only while EN_COURS). No delete endpoint.
 */

export type OrderStatus = "EN_COURS" | "VALIDEE" | "ANNULEE";

/** Body of POST /api/commandes-client — swagger `CommandeClientRequestDTO`. */
export interface CommandeClientRequestDTO {
  clientId: number;
  lignes: LigneCommandeRequestDTO[];
}

export interface LigneCommandeRequestDTO {
  articleId: number;
  quantite: number;
}

/** Response of GET/POST/PUT — swagger `CommandeClientResponseDTO`. */
export interface CommandeClientResponseDTO {
  id: number;
  code: string;
  /** ISO date-time. */
  dateCommande: string;
  statut: OrderStatus;
  clientId: number;
  clientNom: string;
  lignes: LigneCommandeResponseDTO[];
  total: number;
}

export interface LigneCommandeResponseDTO {
  id: number;
  articleId: number;
  articleDesignation: string;
  quantite: number;
  prixUnitaire: number;
  sousTotal: number;
}

/**
 * Domain order — mapped from `CommandeClientResponseDTO` in ../api/mappers.ts.
 * Type alias (not interface) for TanStack Table v9's `RowData` constraint.
 */
export type CustomerOrder = {
  id: string;
  code: string;
  date: string;
  status: OrderStatus;
  clientId: string;
  /** `clientNom` — denormalized label sent by the backend. */
  customerName: string;
  lines: OrderLine[];
  total: number;
};

export type OrderLine = {
  id: string;
  articleId: string;
  articleDesignation: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
};

/** Create payload — the order and its lines in one request. */
export type CustomerOrderWrite = {
  customerId: string;
  lines: Array<{ articleId: string; quantity: number }>;
};
