# Next + shadcn + Supabase rewrite — index

> **Superseded.** The Supabase data layer was dropped; CV data is committed YAML
> (`content/*.yaml`) read at build time by `lib/cv/fetch.ts`. The Next.js
> migration stays. This document is kept as historical record only.

| Document                                                                 | Purpose                                               |
| ------------------------------------------------------------------------ | ----------------------------------------------------- |
| [../next-shadcn-supabase-rewrite.md](../next-shadcn-supabase-rewrite.md) | **Project brief** — goals, acceptance criteria, risks |
| [architecture.md](./architecture.md)                                     | Target folder layout, rendering, env vars             |
| [seo-parity.md](./seo-parity.md)                                         | Nuxt → Next SEO mapping + verification                |
| [phases.md](./phases.md)                                                 | Implementation phases 0–6                             |
| [deploy.md](./deploy.md)                                                 | **GitHub Pages**, tag release, prod Supabase seed     |

**Status:** `implementation complete` — **cutover pending** (Phase 6)

**Locked decisions:** GitHub Pages · `v2` until merge · manual `v*` release ·
Playwright · editor-first schema · pnpm · local Supabase CLI · `next-intl` ·
root `Dockerfile`
