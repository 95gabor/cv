# Architecture

## System context

```mermaid
flowchart TB
    subgraph build [Build time]
        YAML[content/*.yaml]
        Zod[app/types/cv.ts Zod schema]
        Nuxt[Nuxt generate]
        YAML --> Zod
        Zod --> Nuxt
        Nuxt --> Static[.output/public]
    end

    subgraph runtime [Static hosting]
        Static --> GH[GitHub Pages]
        Static --> Docker[nginx Docker image]
    end

    subgraph client [Browser]
        GH --> SPA[Single-page CV]
        Docker --> SPA
    end
```

## Component responsibilities

| Layer                   | Owns                                                 | Does NOT own           |
| ----------------------- | ---------------------------------------------------- | ---------------------- |
| **`content/*.yaml`**    | CV data (personal, jobs, education, skills, hobbies) | UI labels, routing     |
| **`config.ts`**         | Site URL, SEO meta, which CV file to load            | CV field content       |
| **`i18n/locales/`**     | Section titles, buttons, employment type labels      | CV body text           |
| **`app/app.vue`**       | Page shell, loading skeleton, data fetch             | Section markup details |
| **`app/components/*`**  | Section rendering, SCSS                              | Global site config     |
| **`@nuxt/content`**     | YAML parse + schema validation                       | Visual design          |
| **Nitro static preset** | Prerender all routes                                 | Server runtime         |

## Request / data flow

```mermaid
sequenceDiagram
    participant Browser
    participant Nuxt as Nuxt app.vue
    participant Content as @nuxt/content
    participant YAML as content/gabor-pichner.yaml

    Browser->>Nuxt: Load /
    Nuxt->>Content: queryCollection cv
    Content->>YAML: Parse + validate
    YAML-->>Content: CvCollectionItem
    Content-->>Nuxt: cv data
    Nuxt->>Browser: Render Header, Experience, Education, Skills, Hobbies
```

No `pages/` directory — `app/app.vue` is the sole entry. i18n uses
`prefix_except_default` (`/` = en, `/hu` = Hungarian).

## Key paths

| Task             | Path                                                               |
| ---------------- | ------------------------------------------------------------------ |
| Change CV data   | `content/gabor-pichner.yaml`                                       |
| Switch CV file   | `config.ts` → `siteConfig.cv.filename`                             |
| CV schema        | `app/types/cv.ts`                                                  |
| Site meta / URL  | `config.ts`                                                        |
| Global SCSS      | `app/assets/styles/main.scss`, `_variables.scss`, `_tailwind.scss` |
| Component styles | `app/components/<Name>/<Name>.scss`                                |
| UI strings       | `i18n/locales/en.json`, `hu.json`                                  |
| E2E tests        | `tests/`                                                           |
| CI               | `.github/workflows/ci.yaml`                                        |
| Deploy           | `.github/workflows/publish.yaml` (on `v*` tag)                     |

## Modules (nuxt.config.ts)

| Module                              | Role                               |
| ----------------------------------- | ---------------------------------- |
| `@nuxt/content`                     | YAML collections + Zod validation  |
| `@nuxt/ui`                          | UCard, UContainer, design system   |
| `@nuxtjs/i18n`                      | en/hu routing and messages         |
| `@nuxtjs/sitemap`, `@nuxtjs/robots` | SEO                                |
| `nuxt-llms`                         | llms.txt generation                |
| `@nuxt/scripts`                     | Google Analytics (production only) |

## Styling architecture

- **Tailwind v4** via `@nuxt/ui` — utility classes in templates where
  appropriate.
- **SCSS** for component-specific styles — use Tailwind theme tokens
  (`tw-spacing()`, `var(--color-*)`), not `@apply` in `.scss` files.
- Vite `additionalData` injects `_variables.scss`, `_mixins.scss`,
  `_tailwind.scss` globally.

## Build and deploy

```mermaid
flowchart LR
    Tag[v* git tag] --> Publish[publish.yaml]
    Publish --> Gen[npm run generate]
    Gen --> Pages[GitHub Pages]
    Publish --> Docker[GHCR image]
    PR[PR to main] --> CI[ci.yaml]
    CI --> Lint[lint + typecheck + generate]
    CI --> E2E[Playwright]
    CI --> LH[Lighthouse]
    CI --> Percy[Visual regression]
```

## Static output

- `nitro.preset: 'static'`
- Production command: `npm run generate` (not `npm run build` for Pages deploy)
- Preview: `npx serve .output/public` or `npm run preview`
