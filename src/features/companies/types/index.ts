/**
 * Companies — real shapes pinned from swagger.json (roadmap P0.2).
 *
 * Backend resource: «entreprises» (French). Components never see DTOs;
 * mapping happens in ../api/mappers.ts.
 *
 * Note: no SIRET/VAT/logo fields exist in swagger v1.0 (the roadmap's
 * aspirational Company had them) — the pinned shape is the truth.
 */

/** Request body of POST/PUT /api/entreprises — swagger `EntrepriseRequestDTO` (only `nom` required). */
export interface EntrepriseRequestDTO {
  nom: string;
  adresse1?: string;
  adresse2?: string;
  ville?: string;
  codePostal?: string;
  pays?: string;
  mail?: string;
  numTel?: string;
}

/** Raw response body of GET/POST/PUT /api/entreprises — swagger `EntrepriseResponseDTO`. */
export interface EntrepriseResponseDTO {
  id: number;
  nom: string;
  adresse1?: string;
  adresse2?: string;
  ville?: string;
  codePostal?: string;
  pays?: string;
  mail?: string;
  numTel?: string;
}

/**
 * Domain model — mapped from `EntrepriseResponseDTO` in ../api/mappers.ts.
 * Type alias (not interface) for TanStack Table v9's `RowData` constraint.
 */
export type Company = {
  /** int64 in swagger; kept as string domain-wide. */
  id: string;
  name: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  email?: string;
  phone?: string;
};

/** Client-side write input for POST/PUT — English domain names. */
export type CompanyWrite = {
  name: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  email?: string;
  phone?: string;
};
