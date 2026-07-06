# CV – Nuxt

Modern, maintainable CV site built with Nuxt 4, Vue 3, TypeScript, and SCSS.
Content lives in YAML; the site is statically generated.

**Documentation:** [`docs/README.md`](./docs/README.md) · **Agents:**
[`docs/.ai/README.md`](./docs/.ai/README.md)

## Setup

```bash
npm ci
npm run dev    # http://localhost:3000
```

See [`docs/setup.md`](./docs/setup.md) for prerequisites and troubleshooting.

## Production

```bash
npm run generate    # static output → .output/public
npm run preview
```

Deploy: GitHub Pages on `v*` tags, or Docker (`docker compose up` → port 8000).

## Quality gate

```bash
npm run lint
npm run typecheck
npm run generate
```

## Tests

```bash
npm run test:e2e
npm run test:e2e:ui
npm run storybook
```

## Edit CV content

Edit `content/gabor-pichner.yaml` — see [`docs/content.md`](./docs/content.md).

## Project structure

```
app/           Vue components, SCSS, types
content/       CV YAML data
i18n/          UI translations (en, hu)
config.ts      Site URL, meta, active CV file
docs/          Documentation (human + AI-native)
tests/         Playwright E2E
```

## Links

- [Nuxt documentation](https://nuxt.com/docs)
- [Vue style guide](https://vuejs.org/style-guide/)
