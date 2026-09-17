# SGS — Système de Gestion de Stock (Frontend)

Production-shaped React SPA for the SGS inventory-management platform: catalog, orders lifecycle (customers & suppliers), POS sales, stock monitoring, and admin modules — against a French-named Spring Boot REST API.

**Stack:** React 19 · TypeScript 7 · Vite 8 · Tailwind v4 (`@theme` tokens) · TanStack Query + Table v9 · react-hook-form + zod · zustand · i18next (fr/en) · sonner · vitest + Testing Library · oxlint

---

## Getting started

```bash
# 1. Install
npm install

# 2. Configure the API URL
cp .env.example .env        # VITE_API_URL=/api → dev-proxied to :8081 (no CORS)

# 3. Run
npm run dev                 # http://localhost:5173 (proxies /api → :8081)
```

### Scripts

| Command             | What it does                                         |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Vite dev server with HMR + `/api` proxy              |
| `npm run build`     | `tsc && vite build` (typecheck is part of the build) |
| `npm run preview`   | Serve the production build locally                   |
| `npm run typecheck` | `tsc --noEmit`                                       |
| `npm run lint`      | oxlint over `src/` (TS-native, ~60 ms)               |
| `npm test`          | vitest in run mode                                   |
| `npx vitest --ui`   | Vitest UI (watch mode with browser panel)            |

### Quality gates

CI (`.github/workflows/ci.yml`) runs **typecheck → lint → test** on every push/PR.
Locally, a husky pre-commit hook runs **lint-staged** (oxlint + prettier on staged files).

> **Why oxlint and not typescript-eslint?** This project runs **TypeScript 7** (the native compiler), which removed the JS API typescript-eslint depends on (it hard-throws; support is tracked at typescript-eslint#10940). Oxlint parses TS/TSX natively without any TypeScript-API dependency and honors the existing `eslint-disable` comments.

---

## Architecture

```
src/
├── api/            # axios client + interceptors (JWT, ApiError, field errors)
├── app/            # providers (QueryClient, Toaster, Theme) + router
├── components/
│   ├── ui/         # 14 design-system primitives (Button, Card, Dialog, Badge…)
│   ├── data-table/ # DataTable suite (TanStack v9): toolbar, pagination, cells
│   ├── forms/      # FormDialog (RHF+zod), ConfirmDialog, FormFields (Controller)
│   ├── feedback/   # FeedbackStates, NotFoundPage, ErrorPage
│   └── layout/     # AppLayout, Sidebar (role-filtered nav), Header, bell
├── features/       # ONE FOLDER PER BACKEND RESOURCE — the core convention:
│   └── <feature>/
│       ├── api/          # endpoint calls; unwraps axios + maps DTO → domain
│       │   └── mappers.ts# the ONLY place that sees raw DTOs (int64 → string ids)
│       ├── types/        # XRequestDTO/XResponseDTO (wire) + domain models
│       ├── schemas/      # zod schemas mirroring the request DTO (French messages)
│       ├── hooks/        # query-key factory + typed mutations + toasts
│       ├── components/   # shared within the feature (forms, badges)
│       ├── pages/        # route pages
│       └── translations/ # fr.json / en.json — auto-registered by i18n glob
├── lib/            # constants (API_ENDPOINTS pinned to swagger), formatters, permissions, toast
├── stores/         # zustand: auth (user only), ui (theme, sidebar)
└── styles/         # design tokens (light/dark), Tailwind theme
```

### Conventions that matter

- **The "Categories pattern"** (reference: `src/features/categories/`) — every feature: pin swagger DTOs → mapper per endpoint → API returns unwrapped domain types → zod mirrors the request DTO → hooks with a `xxxKeys` factory; mutations invalidate `all` + `detail` and toast on success; errors surface via the global `MutationCache` (opt-out with `{ handled: true }`).
- **Backend paths are French** (`/clients`, `/fournisseurs`, `/commandes-client`, `/ventes`…) — `API_ENDPOINTS` in `src/lib/constants.ts` is the single source; do not "translate" them.
- **Domain ids are strings** — swagger sends int64; converting at the mapper avoids JS precision loss. Write-mappers convert back with a safe-integer guard.
- **Domain models are type aliases, not interfaces** — required by TanStack Table v9's `RowData` constraint.
- **Role gating in depth** — nav visibility (`lib/navigation.ts`), `RoleRoute` on the route group, and a `hasRole` re-check in admin pages (deep-link defense).
- **Stock side effects** — order validation (stock exits) and supplier-order reception (stock entries) invalidate `stock`/`articles` queries; the POS checkout does the same.

### Auth

JWT-only (swagger v1.0 has no refresh token): the token lives in `localStorage` (single source, read by the axios interceptor); the user object lives in the persisted zustand store. `ProtectedRoute` awaits a `/auth/me` bootstrap on mount — 401 purges the token; network errors fall back to the persisted user.

### i18n

`fr`/`en`. Global keys in `src/i18n/resources.ts`; **feature namespaces are auto-loaded** via `import.meta.glob` over `features/*/translations/` — dropping a JSON file there is the whole registration step.

---

## Testing

```bash
npm test                    # 28 tests, 4 files
```

Covered today: formatters (incl. stock-status boundaries), permissions against the real zustand store, the articles mappers (int64 safety, TTC recompute), and the DataTable (render/filter/sort/empty states). New tests go next to the code as `*.test.ts(x)`; jest-dom matchers and a `matchMedia` stub are in `src/test/setup.ts`.
