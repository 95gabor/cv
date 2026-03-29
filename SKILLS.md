# Skills

This repository uses a concise set of skills and responsibilities for agents
working on code and CI changes.

## Core skills

- **Nuxt/Vue maintenance**: Update dependencies and keep app/build stable.
- **TypeScript quality**: Keep type checks passing and fix surfaced issues.
- **Lint/format hygiene**: Ensure ESLint and formatting rules are respected.
- **CI design**: Keep workflows fast, deterministic, and actionable.
- **Release safety**: Prefer small, reviewable changes with validation evidence.

## Working agreements

- Use **conventional commits** for all changes.
- Keep PR titles in **conventional commit format**.
- Run local checks before pushing:
  - `npm ci`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run generate`
- Keep workflow steps minimal and avoid redundant build stages.
