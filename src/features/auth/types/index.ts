/**
 * Auth — real shapes pinned from swagger.json (roadmap P0.2/P0.4).
 *
 * Backend contract:
 *   POST /api/auth/login → LoginResponse  { token, user: UserInfo }
 *   GET  /api/auth/me    → CurrentUserResponse (UserInfo + mail, numTel)
 *
 * NOTE: there is NO refresh token in swagger v1.0 — the JWT is the only
 * credential. /auth/register is admin-only user creation (not self-signup)
 * and belongs to the Users feature (P3.3), not here.
 */

export type UserRole = "ADMIN" | "GESTIONNAIRE" | "VENDEUR";

/** `user` payload of LoginResponse — swagger `UserInfo`. */
export interface UserInfoDTO {
  id: number;
  nom: string;
  prenom: string;
  login: string;
  role: UserRole;
  entrepriseId?: number;
}

/** Response of POST /api/auth/login — swagger `LoginResponse`. No refresh token. */
export interface LoginResponseDTO {
  token: string;
  user: UserInfoDTO;
}

/** Response of GET /api/auth/me — swagger `CurrentUserResponse`. */
export interface CurrentUserResponseDTO extends UserInfoDTO {
  mail?: string;
  numTel?: string;
}

/** Domain user stored in auth.store — mapped from the DTOs in ../api. */
export interface AuthUser {
  id: string;
  login: string;
  /** `prenom`. */
  firstName: string;
  /** `nom`. */
  lastName: string;
  /** `mail` when known (via /auth/me); falls back to the login string. */
  email?: string;
  /** `numTel` when known (via /auth/me). */
  phone?: string;
  /** Backend sends a single role; kept as an array for role-gating helpers. */
  roles: UserRole[];
  companyId?: string;
}
