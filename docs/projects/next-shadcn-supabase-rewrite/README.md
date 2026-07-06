# Next + shadcn + Supabase rewrite — index

| Document                                                                 | Purpose                                               |
| ------------------------------------------------------------------------ | ----------------------------------------------------- |
| [../next-shadcn-supabase-rewrite.md](../next-shadcn-supabase-rewrite.md) | **Project brief** — goals, acceptance criteria, risks |
| [architecture.md](./architecture.md)                                     | Target folder layout, rendering, env vars             |
| [supabase-schema.md](./supabase-schema.md)                               | Postgres tables, RLS, seed strategy                   |
| [seo-parity.md](./seo-parity.md)                                         | Nuxt → Next SEO mapping + verification                |
| [phases.md](./phases.md)                                                 | Implementation phases 0–6                             |
| [deploy.md](./deploy.md)                                                 | **GitHub Pages**, tag release, prod Supabase seed     |
| [github-secrets.md](./github-secrets.md)                                 | GitHub Secrets checklist + where to find each value   |
| [local-supabase.md](./local-supabase.md)                                 | Self-hosted local dev (Supabase CLI + Docker)         |

**Status:** `implementation complete` — **cutover pending** (Phase 6)

**Locked decisions:** GitHub Pages · `v2` until merge · manual `v*` release ·
Playwright · editor-first schema · pnpm · local Supabase CLI · `next-intl` ·
root `Dockerfile`
