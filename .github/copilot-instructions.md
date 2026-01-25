# Copilot AI Agent Instructions for Inoland Prisma

## Project Overview
- **Framework:** Nuxt 3 (Vue 3, TypeScript, Vite)
- **UI:** Tailwind CSS
- **State:** Pinia stores in `stores/`
- **API:** Custom REST endpoints in `server/api/` (see subfolders for domain-specific APIs)
- **Database:** Managed via Drizzle ORM (see `drizzle.config.ts`)
- **i18n:** Configured in `i18n.config.ts` and `i18n/locales/`

## Key Workflows
- **Install dependencies:** `pnpm install` (preferred)
- **Dev server:** `pnpm dev` (http://localhost:3000)
- **Build:** `pnpm build`
- **Preview production:** `pnpm preview`

## Directory Structure
- `components/` — Vue components (atomic design, some grouped by feature)
- `pages/` — Nuxt file-based routing
- `composables/` — Vue composables (reusable logic)
- `stores/` — Pinia stores for state management
- `server/api/` — API endpoints (REST, see each subfolder's README for details)
- `lib/` — Utilities and helpers
- `assets/` — Static assets (CSS, images)
- `public/` — Publicly served files

## API & Data Flow
- **API endpoints** are colocated in `server/api/` and documented with per-domain `README.md` (e.g., `instansi`, `inolands_inovator`).
- **Database relations** are described in those READMEs. Example: `inolands_inovator` joins with `instansi` and `instansi_kategori`.
- **Frontend** fetches data via Nuxt's `$fetch` or composables.

## Patterns & Conventions
- **Component naming:** PascalCase for Vue SFCs.
- **Composables:** Prefixed with `use` (e.g., `useCurrentUser`).
- **Pinia stores:** Named after domain (e.g., `user.ts`, `adminUser.ts`).
- **i18n:** Use translation keys, do not hardcode strings.
- **API:** Use RESTful conventions, see `server/api/*/README.md` for request/response shape.
- **Styling:** Use Tailwind utility classes, avoid inline styles.

## Integration Points
- **Plugins:** Register in `plugins/` (e.g., `apexcharts.client.js`).
- **External:** Uses Drizzle ORM, Tailwind, Pinia, Nuxt modules.
- **i18n:** All user-facing text should be translatable.

## Examples
- See `server/api/instansi/README.md` for API/DB schema and response examples.
- See `components/ui/` for reusable UI primitives.
- See `pages/` for routing and page-level logic.

## Tips for AI Agents
- Always check for a relevant README in the target directory before editing or generating code.
- Follow the established folder and naming conventions.
- When adding new API endpoints, document them in the appropriate `README.md`.
- Use composables for shared logic, not mixins.
- Prefer Pinia for state, not Vuex.
- Use `pnpm` for all package management commands.
