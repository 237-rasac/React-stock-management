import type { Company, CompanyWrite, EntrepriseResponseDTO } from "../types";

/**
 * DTO → domain mappers for the companies feature (P0.2 pattern).
 * int64 id → string; optional address fields pass through as undefined.
 */

export function toCompany(dto: EntrepriseResponseDTO): Company {
  return {
    id: String(dto.id),
    name: dto.nom,
    addressLine1: dto.adresse1,
    addressLine2: dto.adresse2,
    city: dto.ville,
    postalCode: dto.codePostal,
    country: dto.pays,
    email: dto.mail,
    phone: dto.numTel,
  };
}

/** `CompanyWrite` → `EntrepriseRequestDTO` (only `nom` is required by the API). */
export function toEntrepriseRequest(input: CompanyWrite): {
  nom: string;
  adresse1?: string;
  adresse2?: string;
  ville?: string;
  codePostal?: string;
  pays?: string;
  mail?: string;
  numTel?: string;
} {
  return {
    nom: input.name,
    adresse1: input.addressLine1,
    adresse2: input.addressLine2,
    ville: input.city,
    codePostal: input.postalCode,
    pays: input.country,
    mail: input.email,
    numTel: input.phone,
  };
}
