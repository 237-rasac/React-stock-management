import type {
  ClientRequestDTO,
  ClientResponseDTO,
  Customer,
  CustomerWrite,
} from "../types";

/** `ClientResponseDTO` → `Customer` (int64 id → string to avoid JS precision loss). */
export function toCustomer(dto: ClientResponseDTO): Customer {
  return {
    id: String(dto.id),
    lastName: dto.nom,
    firstName: dto.prenom,
    addressLine1: dto.adresse1 ?? null,
    addressLine2: dto.adresse2 ?? null,
    city: dto.ville ?? null,
    postalCode: dto.codePostal ?? null,
    country: dto.pays ?? null,
    email: dto.mail ?? null,
    phone: dto.numTel ?? null,
    photo: dto.photo ?? null,
  };
}

/** `CustomerWrite` → `ClientRequestDTO` (empty strings dropped so the backend keeps the fields absent). */
export function toClientRequest(input: CustomerWrite): ClientRequestDTO {
  return {
    nom: input.lastName,
    prenom: input.firstName,
    adresse1: input.addressLine1 || undefined,
    adresse2: input.addressLine2 || undefined,
    ville: input.city || undefined,
    codePostal: input.postalCode || undefined,
    pays: input.country || undefined,
    mail: input.email || undefined,
    numTel: input.phone || undefined,
    photo: input.photo || undefined,
  };
}
