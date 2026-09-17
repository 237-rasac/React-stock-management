import type {
  FournisseurRequestDTO,
  FournisseurResponseDTO,
  Supplier,
  SupplierWrite,
} from "../types";

/** `FournisseurResponseDTO` → `Supplier` (int64 id → string to avoid JS precision loss). */
export function toSupplier(dto: FournisseurResponseDTO): Supplier {
  return {
    id: String(dto.id),
    name: dto.nom,
    addressLine1: dto.adresse1 ?? null,
    addressLine2: dto.adresse2 ?? null,
    city: dto.ville ?? null,
    postalCode: dto.codePostal ?? null,
    country: dto.pays ?? null,
    email: dto.mail ?? null,
    phone: dto.numTel ?? null,
  };
}

/** `SupplierWrite` → `FournisseurRequestDTO` (empty strings dropped so the backend keeps the fields absent). */
export function toFournisseurRequest(
  input: SupplierWrite,
): FournisseurRequestDTO {
  return {
    nom: input.name,
    adresse1: input.addressLine1 || undefined,
    adresse2: input.addressLine2 || undefined,
    ville: input.city || undefined,
    codePostal: input.postalCode || undefined,
    pays: input.country || undefined,
    mail: input.email || undefined,
    numTel: input.phone || undefined,
  };
}
