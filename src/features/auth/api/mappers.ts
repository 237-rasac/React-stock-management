import type { AuthUser, CurrentUserResponseDTO, UserInfoDTO } from "../types";

/**
 * DTO → domain mappers for the auth feature (P0.4).
 * int64 id → string; single backend role → roles array for gating helpers.
 */

export function toAuthUser(dto: UserInfoDTO): AuthUser {
  return {
    id: String(dto.id),
    login: dto.login,
    firstName: dto.prenom,
    lastName: dto.nom,
    email: dto.login, // LoginResponse carries no mail; /auth/me refines it.
    roles: [dto.role],
    companyId:
      dto.entrepriseId !== undefined ? String(dto.entrepriseId) : undefined,
  };
}

/** `CurrentUserResponseDTO` → `AuthUser`, refining email/phone from /auth/me. */
export function toAuthUserFromMe(dto: CurrentUserResponseDTO): AuthUser {
  return {
    ...toAuthUser(dto),
    email: dto.mail ?? dto.login,
    phone: dto.numTel,
  };
}
