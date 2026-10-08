# Skills

Concise skills and responsibilities for agents working on this repository.

## Core skills

- **Next.js / React maintenance**: App Router, static export, shadcn/ui
  components.
- **YAML content layer**: `content/*.yaml` loaded at build time.
- **TypeScript quality**: Keep type checks passing and fix surfaced issues.
- **Lint/format hygiene**: ESLint and Prettier rules respected.
- **CI design**: pnpm-based workflows — fast, deterministic, actionable.
- **Release safety**: Small, reviewable changes with validation evidence.

## Working agreements

- Use **conventional commits** for all changes.
- Keep PR titles in **conventional commit format**.
- Run local checks before pushing:
  - `pnpm install --frozen-lockfile`
  - `pnpm run lint`
  - `pnpm run typecheck`
  - `pnpm run build`
- Keep workflow steps minimal and avoid redundant build stages.
