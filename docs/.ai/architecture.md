# Architecture

## System context

```mermaid
flowchart TB
    subgraph build [Build time]
        YAML[content/gabor-pichner.yaml]
        Next[next build]
        YAML --> Next
        Next --> Static[out/]
    end

    subgraph runtime [Static hosting]
        Static --> GH[GitHub Pages]
        Static --> Docker[nginx Docker image]
    end

    subgraph client [Browser]
        GH --> Site[Static CV site]
        Docker --> Site
    end
```

## Component responsibilities

| Layer                | Owns                                   | Does NOT own    |
| -------------------- | -------------------------------------- | --------------- |
| **`content/*.yaml`** | Source of truth for CV data            | UI strings      |
| **`lib/cv/*`**       | Types, YAML loader, `getCvProfile()`   | React markup    |
| UI strings / i18n    | `messages/`, `i18n/`, `next-intl`      | CV body text    |
| **`components/*`**   | Section rendering, client widgets      | Global routing  |
| **`app/`**           | Routes (`/`, `/hu`), metadata, sitemap | Section details |
| **`lib/seo/*`**      | Metadata, JSON-LD, llms.txt content    | Visual design   |

## Request / data flow

```mermaid
sequenceDiagram
    participant Browser
    participant Next as Next.js Server Component
    participant FS as content/*.yaml

    Note over Next,FS: At build time (SSG)
    Next->>FS: getCvProfile(slug, locale)
    FS-->>Next: CV model
    Next->>Browser: Pre-rendered HTML (static export)
```

Routes: `/` (English), `/hu` (Hungarian). No client-side CV fetch in production.

## Key paths

| Task              | Path                                                |
| ----------------- | --------------------------------------------------- |
| Change CV data    | Edit `content/*.yaml` → commit → release (`v*` tag) |
| CV types          | `lib/cv/types.ts`                                   |
| YAML loader       | `lib/cv/fetch.ts`                                   |
| Site meta / URL   | `lib/site-config.ts`                                |
| UI strings (i18n) | `messages/`, `i18n/`, `next-intl`                   |
| Docker prod image | Root `Dockerfile` (build inside Docker + nginx)     |
| Global styles     | `app/globals.css`                                   |
| Components        | `components/*.tsx`, `components/ui/`                |
| SEO               | `lib/seo/`, `app/sitemap.ts`, `app/robots.ts`       |
| E2E tests         | `tests/e2e/`                                        |
| CI                | `.github/workflows/ci.yaml`                         |
| Deploy            | `.github/workflows/publish.yaml` (on `v*` tag)      |

## Styling

- **Tailwind CSS v4** via `app/globals.css` (`@import 'tailwindcss'`).
- **shadcn/ui** components in `components/ui/`.
- Utility classes in TSX; shared layout tokens as `.cv-*` classes in
  `globals.css`.
- **No `@apply` in SCSS** — legacy Nuxt SCSS removed; use Tailwind utilities or
  `.cv-*` helpers in `app/globals.css`.
- Dark/light theme via `.dark` on `<html>` (`next-themes`).

## Build and deploy

```mermaid
flowchart LR
    Tag[v* git tag] --> Publish[publish.yaml]
    Publish --> Build[pnpm run generate]
    Build --> Pages[GitHub Pages out/]
    Publish --> Docker[Dockerfile build + GHCR]
    PR[PR] --> CI[ci.yaml]
    CI --> Lint[lint + typecheck]
    CI --> Gen[build]
    CI --> E2E[Playwright on out/]
    CI --> LH[Lighthouse on out/]
```

## Static output

- `next.config.ts`: `output: 'export'`, `images.unoptimized: true`
- Build command: `pnpm run build` (alias: `pnpm run generate`)
- Output directory: `out/`
- Preview: `npx http-server out -p 4173`

## Environment variables

| Variable               | Purpose                       |
| ---------------------- | ----------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, sitemap, OG    |
| `NEXT_PUBLIC_GA_ID`    | Google Analytics (production) |

See `.env.example`.
