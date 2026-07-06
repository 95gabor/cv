# Implementation phases

## Phase 0 — Planning

**Status:** complete

- [x] Project brief and architecture docs
- [x] Deploy: **GitHub Pages**
- [x] Branch: **`v2`**
- [x] Schema: editor-first hybrid (Supabase)
- [x] Package manager: **pnpm**
- [x] Local dev: **Supabase CLI**

---

## Phase 1 — Scaffold

**Status:** complete

- [x] Next.js App Router, TypeScript, Tailwind, ESLint
- [x] shadcn/ui base components
- [x] `output: 'export'`, folder layout
- [x] `messages/en.json`, `messages/hu.json`
- [x] Dark shell + grid background

---

## Phase 2 — Supabase + data layer

**Status:** complete

- [x] Migrations, seed from YAML, `getCvProfile()`
- [x] `lib/site-config.ts`, db scripts

---

## Phase 3 — UI port

**Status:** complete

- [x] Header, Experience, Education, Skills, Hobbies
- [x] Language / theme / print controls
- [x] Print styles, responsive layout

---

## Phase 4 — SEO + i18n

**Status:** complete

- [x] `generateMetadata`, JSON-LD, sitemap, robots
- [x] `llms.txt` (prebuild), hreflang, GA, favicon
- [x] `next-intl` (UI strings), `next-themes` (dark/light)
- [x] `app/not-found.tsx` (404 + back to home)

---

## Phase 5 — CI + testing

**Status:** complete

- [x] pnpm CI, `out/` static export
- [x] Playwright, Lighthouse, Percy scripts
- [x] Docker (`Dockerfile` — Next build inside image + nginx)
- [x] `publish.yaml` on `v*` tag (Pages + GHCR)
- [~] Supabase Database Webhook → deploy — **deferred**; manual `v*` release
  when content changes

---

## Phase 6 — Cutover

**Status:** pending

- [ ] Production Supabase project (`supabase link` + secrets in GitHub)
- [ ] Prod seed: `pnpm run db:seed` with cloud `SUPABASE_*` env (before tag)
- [ ] Publish credentials — [github-secrets.md](./github-secrets.md) (1 secret +
      2 vars)
- [ ] Merge `v2` → `main`
- [ ] Remove remaining Nuxt artifacts from `main`
- [ ] Tag release (`v*`) → live https://95gabor.me on Next build

**Exit:** https://95gabor.me serves Next build.

---

## Post-cutover

- CV Editor UI (Supabase-backed admin)
- Image upload to Storage
- Supabase webhook → auto deploy (optional)
- Optional ISR if moving off pure static export
