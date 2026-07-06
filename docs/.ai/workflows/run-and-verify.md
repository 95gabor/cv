# Workflow: run and verify

## Quality gate (default)

```bash
npm ci
npm run lint
npm run typecheck
npm run generate
```

| Check     | Pass criteria                                            |
| --------- | -------------------------------------------------------- |
| Lint      | Exit 0                                                   |
| Typecheck | Exit 0                                                   |
| Generate  | Static output in `.output/public`, no YAML schema errors |

## E2E (when UI/routing changed)

```bash
npm run test:e2e
```

Interactive debug: `npm run test:e2e:ui`

## Visual regression (when layout/styles changed)

```bash
# Requires PERCY_TOKEN
npm run test:e2e:visual
```

CI runs Percy automatically on PRs.

## Storybook (when ui/ components changed)

```bash
npm run storybook
```

## Build warning check

```bash
npm run build 2>&1 | grep -i warn
```

Known harmless warnings: VueUse `#__PURE__`, Nuxt sourcemap plugins, npm
`always-auth` (global config).

## Report back to user

Include:

- Commands run
- Pass/fail per check
- Relevant error excerpt if failed
