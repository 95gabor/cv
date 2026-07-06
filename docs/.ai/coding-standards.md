# Coding standards

Rules for agents writing code in this repository.

## Universal

| Rule                 | Detail                                                 |
| -------------------- | ------------------------------------------------------ |
| Minimal scope        | Smallest correct diff; no drive-by refactors           |
| Read neighbors       | Match naming, structure, imports in adjacent files     |
| Comments             | Only non-obvious business or technical rationale       |
| Tests                | Add only when asked or when changing critical behavior |
| Commits              | Only when explicitly requested                         |
| Conventional Commits | PR titles and commit messages                          |
| Secrets              | Never in git — GitHub Secrets, env vars                |

## Documentation

| Rule          | Detail                                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| Flow diagrams | **Mermaid** (`flowchart`, `sequenceDiagram`) — not ASCII box art in fenced blocks                          |
| Doc updates   | Architecture change → `architecture.md`; SCSS/Tailwind rules → this file; YAML schema → `content-model.md` |

## Nuxt / Vue

### Structure

```
app/
├── app.vue              # Root page — data fetch, layout shell
├── components/
│   ├── Header/
│   ├── Experience/
│   ├── Education/
│   ├── Skills/
│   ├── Hobbies/
│   └── ui/              # Shared primitives (SectionTitle, InlineLink)
├── assets/styles/       # Global SCSS partials
└── types/cv.ts          # Zod schema
```

### Conventions

- Single-page app — no `pages/` unless routing requirements change.
- Components: co-located `<Name>.vue` + `<Name>.scss`.
- Use `@nuxt/ui` components (UCard, UContainer) where already established.
- `useAsyncData` + `queryCollection('cv')` for content loading in `app.vue`.
- i18n: `useI18n()` for UI strings; CV content comes from YAML localized fields.

### DO

- Keep components focused on one CV section.
- Use existing period utils (`~/utils/period`) for date formatting.
- Run quality gate before PR: `npm ci`, lint, typecheck, generate.

### DON'T

- Upgrade dependencies without being asked (Dependency Agent scope).
- Use `@apply` in `.scss` files — Tailwind v4 does not process SCSS; use theme
  tokens or utility classes in templates.
- Mix CSS and SCSS for the same component.
- Edit generated files (`schema/cv.schema.json`) by hand — regenerate via build.

## SCSS / Tailwind

Use Tailwind v4 theme tokens in SCSS for consistent sizing:

```scss
// Spacing: gap-4 → tw-spacing(4)
gap: tw-spacing(4);

// Colors: text-gray-400 → var(--color-gray-400)
color: var(--color-gray-400);

// Typography: text-xl → var(--text-xl)
font-size: var(--text-xl);

// Breakpoints
@include tw-md {
  flex-direction: row;
}
```

Helpers live in `app/assets/styles/_tailwind.scss` (auto-injected via Vite).

## Content / YAML

- Schema source: `app/types/cv.ts` — update Zod first, then YAML.
- All user-facing CV text: `en` + `hu` on localized fields.
- Reference example: `content/example.yaml`.

## CI expectations

PRs to `main` trigger: lint, typecheck, generate, E2E, Lighthouse (SEO ≥100%,
a11y ≥95%), Percy visual, Docker build validation.

## Key commands

| Task         | Command                                                 |
| ------------ | ------------------------------------------------------- |
| Dev          | `npm run dev`                                           |
| Quality gate | `npm run lint && npm run typecheck && npm run generate` |
| E2E          | `npm run test:e2e`                                      |
| Storybook    | `npm run storybook`                                     |
