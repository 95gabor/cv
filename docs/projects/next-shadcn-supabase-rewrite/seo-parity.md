# SEO parity checklist — Nuxt → Next

**Status:** implemented on `v2` — pre-cutover verification before Phase 6.

Baseline: legacy Nuxt site on `main` + `.lighthouserc.json` CI gates.

## Lighthouse CI

| Assertion                         | Gate | Next implementation                               |
| --------------------------------- | ---- | ------------------------------------------------- |
| `categories:seo` ≥ 1.0            | ✅   | Static HTML, semantic headings, meta (`lib/seo/`) |
| `categories:accessibility` ≥ 0.95 | ✅   | shadcn/Radix primitives                           |
| `color-contrast`                  | ✅   | shadcn theme tokens                               |
| `target-size`                     | ✅   | Touch targets on links/buttons                    |

`.lighthouserc.json` serves Next `out/` via `http-server` on port 4173.

Docker perf baseline: ~91 performance with nginx gzip (see `nginx.conf`).

## Meta tags

| Feature          | Nuxt (legacy)                | Next (`v2`) — `lib/seo/metadata.ts`           |
| ---------------- | ---------------------------- | --------------------------------------------- |
| `<title>`        | `MetaData.vue` + `config.ts` | `generateMetadata()` per route                |
| `description`    | `useHead` meta               | `metadata.description`                        |
| `keywords`       | joined array                 | `metadata.keywords`                           |
| `og:title`       | `useHead`                    | `openGraph.title`                             |
| `og:description` | `useHead`                    | `openGraph.description`                       |
| `og:type`        | `profile`                    | `openGraph.type: 'profile'`                   |
| `canonical`      | `link rel=canonical`         | `metadata.alternates.canonical`               |
| `robots`         | `index, follow`              | `metadata.robots`                             |
| `html lang`      | dynamic per locale           | `app/layout.tsx` / `app/hu/layout.tsx` `lang` |
| `viewport`       | head meta                    | default Next metadata                         |

## Structured data (JSON-LD)

Implemented in `lib/seo/structured-data.ts`:

| Schema          | Fields                                               |
| --------------- | ---------------------------------------------------- |
| `Person`        | name, jobTitle, image, url, sameAs, email, telephone |
| `worksFor`      | Organization per job                                 |
| `alumniOf`      | EducationalOrganization                              |
| `knowsAbout`    | skills                                               |
| `hasOccupation` | JobPosting-derived from work experience              |

## Sitemap

| Nuxt                   | Next (`app/sitemap.ts`) |
| ---------------------- | ----------------------- |
| `@nuxtjs/sitemap` auto | `/` (en) + `/hu`        |

`lastModified` from `cv_profiles.updated_at` when available.

## Robots

| Nuxt             | Next (`app/robots.ts`) |
| ---------------- | ---------------------- |
| `@nuxtjs/robots` | `Allow: /` + sitemap   |

## i18n SEO

| Nuxt                    | Next                               |
| ----------------------- | ---------------------------------- |
| `prefix_except_default` | `/` = en, `/hu` = hu               |
| `hreflang`              | `alternates.languages` in metadata |

## llms.txt

| Nuxt               | Next                                                |
| ------------------ | --------------------------------------------------- |
| `nuxt-llms` module | `scripts/generate-llms-txt.mts` → `public/llms.txt` |

Content builder: `lib/seo/llms-content.ts`.

## Analytics

| Nuxt                               | Next                                           |
| ---------------------------------- | ---------------------------------------------- |
| `@nuxt/scripts` GA production only | `@next/third-parties/google` — production only |

## Semantic HTML

Preserved in Next components:

- `<header role="banner">`
- `<main role="main">`
- Section `aria-labelledby`
- Job items with structured data support

## Performance

| Concern                        | Approach                                                                      |
| ------------------------------ | ----------------------------------------------------------------------------- |
| No runtime Supabase on CV page | Build-time fetch only                                                         |
| Images                         | `next/image` with `images.unoptimized` for export                             |
| Fonts                          | `next/font` — subset, display swap                                            |
| JS bundle                      | Server Components default; client islands for theme, language, cookies, print |
| Third-party scripts            | GA only in prod; defer                                                        |
| Docker/nginx                   | gzip, sendfile — Lighthouse perf ~91                                          |

## Verification before cutover

- [x] Lighthouse CI green on PR (`ci.yaml`)
- [x] `app/not-found.tsx` — 404 with link home; nginx serves `404.html`
- [ ] Manual check: View Source has JSON-LD on preview
- [ ] `curl https://<preview>/sitemap.xml`
- [ ] `curl https://<preview>/robots.txt`
- [ ] `curl https://<preview>/llms.txt`
- [ ] Google Rich Results Test on preview URL
- [ ] Compare `/` and `/hu` meta + `lang` attribute
- [ ] Percy or manual visual diff vs current site
