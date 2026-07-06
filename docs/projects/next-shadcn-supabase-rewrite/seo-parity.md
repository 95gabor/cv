# SEO parity checklist — Nuxt → Next

Baseline: current site + `.lighthouserc.json` CI gates.

## Lighthouse CI

| Assertion                         | Current | Next implementation                       |
| --------------------------------- | ------- | ----------------------------------------- |
| `categories:seo` ≥ 1.0            | ✅      | Static HTML, semantic headings, meta      |
| `categories:accessibility` ≥ 0.95 | ✅      | shadcn/Radix primitives; manual audit     |
| `color-contrast`                  | ✅      | shadcn theme tokens; verify orange accent |
| `target-size`                     | ✅      | Touch targets on links/buttons            |

Update `.lighthouserc.json` `startServerCommand` to serve Next `out/` directory.

## Meta tags

| Feature          | Current (Nuxt)               | Next target                                     |
| ---------------- | ---------------------------- | ----------------------------------------------- |
| `<title>`        | `MetaData.vue` + `config.ts` | `export const metadata` or `generateMetadata()` |
| `description`    | `useHead` meta               | `metadata.description`                          |
| `keywords`       | joined array                 | `metadata.keywords`                             |
| `og:title`       | `useHead`                    | `openGraph.title`                               |
| `og:description` | `useHead`                    | `openGraph.description`                         |
| `og:type`        | `profile`                    | `openGraph.type: 'profile'`                     |
| `canonical`      | `link rel=canonical`         | `metadata.alternates.canonical`                 |
| `robots`         | `index, follow`              | `metadata.robots`                               |
| `html lang`      | dynamic per locale           | `layout` `lang={locale}`                        |
| `viewport`       | head meta                    | default Next metadata                           |

## Structured data (JSON-LD)

Port `app/components/StructuredData.vue`:

| Schema          | Fields                                               |
| --------------- | ---------------------------------------------------- |
| `Person`        | name, jobTitle, image, url, sameAs, email, telephone |
| `worksFor`      | Organization per job                                 |
| `alumniOf`      | EducationalOrganization                              |
| `knowsAbout`    | skills                                               |
| `hasOccupation` | JobPosting-derived from work experience              |

Implementation: `<script type="application/ld+json">` in layout or dedicated
Server Component.

## Sitemap

| Current                | Next             |
| ---------------------- | ---------------- |
| `@nuxtjs/sitemap` auto | `app/sitemap.ts` |

```typescript
// Minimum entries
[
  '/',
] // en
['/hu']; // hu
```

Include `lastModified` from `cv_profiles.updated_at` when available.

## Robots

| Current          | Next            |
| ---------------- | --------------- |
| `@nuxtjs/robots` | `app/robots.ts` |

```
User-agent: *
Allow: /
Sitemap: https://95gabor.me/sitemap.xml
```

## i18n SEO

| Current                 | Next                                   |
| ----------------------- | -------------------------------------- |
| `prefix_except_default` | `/` = en, `/hu` = hu                   |
| `hreflang`              | Add `alternates.languages` in metadata |

```typescript
alternates: {
  canonical: 'https://95gabor.me',
  languages: {
    en: 'https://95gabor.me',
    hu: 'https://95gabor.me/hu',
  },
},
```

## llms.txt

| Current            | Next                                    |
| ------------------ | --------------------------------------- |
| `nuxt-llms` module | `app/llms.txt/route.ts` or build script |

Port content from `scripts/generate-llm-config.ts`.

## Analytics

| Current                            | Next                                             |
| ---------------------------------- | ------------------------------------------------ |
| `@nuxt/scripts` GA production only | `@next/third-parties/google` or env-gated Script |

Load only when `NODE_ENV === 'production'`.

## Semantic HTML

Preserve from current components:

- `<header role="banner">`
- `<main role="main">`
- `<article itemscope itemtype="Person">`
- Section `aria-labelledby`
- Job items `itemtype="JobPosting"`

## Performance (non-Lighthouse but important)

| Concern                        | Approach                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| No runtime Supabase on CV page | Build-time fetch only                                                                 |
| Images                         | `next/image` with static export config or plain `<img>` for exported paths            |
| Fonts                          | `next/font` — subset, display swap                                                    |
| JS bundle                      | Server Components default; minimal client islands (language switcher, cookie consent) |
| Third-party scripts            | GA only in prod; defer                                                                |

## Verification before cutover

- [ ] Lighthouse CI green on PR
- [ ] Manual check: View Source has JSON-LD
- [ ] `curl https://<preview>/sitemap.xml`
- [ ] `curl https://<preview>/robots.txt`
- [ ] `curl https://<preview>/llms.txt`
- [ ] Google Rich Results Test on preview URL
- [ ] Compare `/` and `/hu` meta + lang attribute
- [ ] Percy or manual visual diff vs current site
