### Structure

```
app/
├── layout.tsx, page.tsx       # EN route
├── hu/page.tsx, hu/layout.tsx # HU route
├── not-found.tsx
├── globals.css
├── sitemap.ts, robots.ts
components/
├── cv-page.tsx, header.tsx, experience.tsx, ...
├── locale-provider.tsx        # next-intl provider per route
├── providers.tsx              # next-themes
├── ui/                        # shadcn primitives
i18n/
├── config.ts, request.ts      # next-intl plugin config
lib/
├── cv/                        # types, fetch, map-from-db
├── seo/                       # metadata, JSON-LD, llms
messages/                      # UI strings (en, hu)
content/                       # YAML seed source
supabase/migrations/
```

### Conventions

- **Server Components** by default; `'use client'` only for interactivity
  (theme, cookies, print, language link).
- CV data via `getCvProfile()` in server pages — no client fetch.
- i18n: **`next-intl`** — `getTranslations()` / `useTranslations()` for UI; CV
  text from DB localized fields.
- Theme: **`next-themes`** (`ThemeProvider` in `components/providers.tsx`).
- shadcn/ui: extend via `className`, use `cn()` from `lib/utils.ts`.
- Static export: no API routes, no server runtime after build.
