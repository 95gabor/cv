# Implementation phases

## Phase 0 — Planning

**Status:** mostly complete

- [x] Project brief and architecture docs
- [x] Deploy: **GitHub Pages**
- [x] Branch: **`v2`**
- [x] Rebuild: **Supabase Database Webhook → GitHub**
- [x] Approve schema: **editor-first hybrid** (`_en`/`_hu` columns, child
      tables)
- [x] Package manager: **pnpm** on `v2`
- [x] Local dev: **self-hosted Supabase** (CLI + Docker)
- [ ] Create Supabase **cloud** project (staging / CI / prod)

**Exit:** `supabase start` works locally; cloud project for CI — then create
`v2` branch for Phase 1.

---

## Phase 1 — Scaffold

**Goal:** Empty Next app with toolchain.

- [ ] Create branch `v2` from `main`
- [ ] `packageManager` in `package.json`; remove `package-lock.json` on `v2`
- [ ] `pnpm create next-app` (or manual) — App Router, TypeScript, Tailwind,
      ESLint
- [ ] Add shadcn/ui — `pnpm dlx shadcn@latest init` + base components
- [ ] Folder layout per [architecture.md](./architecture.md)
- [ ] `next.config.ts` — `output: 'export'`, `images.unoptimized: true`
- [ ] Port `messages/en.json`, `messages/hu.json` from `i18n/locales/`
- [ ] Basic layout shell (dark gradient background, grid pattern)

**Exit:** `pnpm run build` succeeds; placeholder page renders.

---

## Phase 2 — Supabase + data layer

**Goal:** CV data in Supabase; fetch at build time.

- [ ] `supabase init` + `config.toml`; add `db:*` scripts to `package.json`
- [ ] Migrations per [supabase-schema.md](./supabase-schema.md) (editor-first
      hybrid)
- [ ] `supabase db reset` — apply migrations + seed locally
- [ ] Seed script: YAML → structured rows (not JSON blob)
- [ ] `lib/cv/fetch.ts` + `lib/cv/map-from-db.ts` + types
- [ ] `lib/site-config.ts`
- [ ] Verify fetch in Server Component (log output in dev)

**Exit:** `getCvProfile('gabor-pichner', 'en')` works against **local** Supabase
(`supabase start`).

See [local-supabase.md](./local-supabase.md).

---

## Phase 3 — UI port

**Goal:** Visual and functional parity with Nuxt components.

| Component        | Source                   | Notes                   |
| ---------------- | ------------------------ | ----------------------- |
| Header           | `app/components/Header/` | Avatar, social, contact |
| Experience       | `Experience/`            | JobPosting microdata    |
| Education        | `Education/`             |                         |
| Skills           | `Skills/`                |                         |
| Hobbies          | `Hobbies/`               |                         |
| LanguageSelector | client component         |                         |
| CookieConsent    | client component         |                         |
| SectionTitle     | shadcn + custom          |                         |

- [ ] Loading skeleton (optional — static build may skip)
- [ ] Print styles (port from SCSS `@media print`)
- [ ] Responsive layout matches current

**Exit:** Side-by-side visual review `/` and `/hu`.

---

## Phase 4 — SEO + i18n

**Goal:** Meet [seo-parity.md](./seo-parity.md).

- [ ] `generateMetadata` per locale
- [ ] `structured-data.tsx`
- [ ] `sitemap.ts`, `robots.ts`
- [ ] `llms.txt` route
- [ ] hreflang alternates
- [ ] GA production-only
- [ ] Favicon from site config

**Exit:** Lighthouse SEO 100% on local static serve.

---

## Phase 5 — CI + testing

**Goal:** Replace Nuxt CI with Next equivalents.

- [ ] ESLint + TypeScript in CI
- [ ] `next build` with Supabase secrets in CI
- [ ] Playwright smoke tests — port/adapt from `tests/` (page load, locale
      switch, sections visible)
- [ ] Deploy workflow: GitHub Pages from `out/` on `v2` push
- [ ] Supabase Database Webhook → `repository_dispatch` (see
      [deploy.md](./deploy.md))
- [ ] Lighthouse job — serve `out/` directory
- [ ] Percy visual regression (optional first pass)
- [ ] Docker build if keeping container deploy

**Exit:** PR CI green on feature branch.

---

## Phase 6 — Cutover

**Goal:** Production on new stack.

- [ ] Production Supabase project + seed
- [ ] Deploy preview URL review
- [ ] Merge `v2` → `main`
- [ ] Configure Supabase production webhooks → deploy on `main`
- [ ] Update workflow branch filters (`v2` → `main`)
- [ ] Remove or archive Nuxt dependencies
- [ ] Update `docs/.ai/architecture.md`, `docs/content.md`, `docs/setup.md`
- [ ] Tag release

**Exit:** https://95gabor.me serves Next build; old stack deprecated.

---

## Post–public-site-v1

- **CV Editor UI** — form-based admin per
  [supabase-schema.md](./supabase-schema.md#future-cv-editor-ui)
- Image upload to Storage from editor
- Multiple CV profiles (optional)
- ISR on Vercel instead of full rebuild
