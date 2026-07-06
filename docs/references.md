# External references

## Repo and deploy

| Resource       | URL                                   |
| -------------- | ------------------------------------- |
| GitHub repo    | https://github.com/95gabor/cv         |
| Live site      | https://95gabor.me                    |
| GitHub Actions | https://github.com/95gabor/cv/actions |
| GHCR image     | `ghcr.io/95gabor/cv` (after tag push) |

## CI/CD workflows

| Workflow       | Trigger             | Purpose                                           |
| -------------- | ------------------- | ------------------------------------------------- |
| `ci.yaml`      | PR / push to `main` | lint, typecheck, generate, E2E, Lighthouse, Percy |
| `publish.yaml` | `v*` tag            | GitHub Pages deploy + Docker push                 |
| `release.yaml` | `workflow_dispatch` | semantic-release                                  |

## Secrets (GitHub)

| Secret                     | Usage                    |
| -------------------------- | ------------------------ |
| `PERCY_TOKEN`              | Visual regression CI     |
| `RELEASE_BOT_GITHUB_TOKEN` | Release workflow         |
| `GITHUB_TOKEN`             | Pages deploy (automatic) |

## Documentation in the repo

| File                      | Contents                                 |
| ------------------------- | ---------------------------------------- |
| `docs/.ai/README.md`      | Agent entry point                        |
| `docs/content.md`         | CV YAML editing                          |
| `content/example.yaml`    | Example CV data                          |
| `app/types/cv.ts`         | Zod schema (source)                      |
| `schema/cv.schema.json`   | Generated JSON Schema                    |
| `AGENTS.md` / `SKILLS.md` | Agent guidelines (redirect / supplement) |

## Framework documentation

| Tool                 | Link                                |
| -------------------- | ----------------------------------- |
| Nuxt 4               | https://nuxt.com/docs               |
| Nuxt Content         | https://content.nuxt.com            |
| Nuxt UI              | https://ui.nuxt.com                 |
| Vue 3                | https://vuejs.org                   |
| Playwright           | https://playwright.dev              |
| Tailwind CSS v4      | https://tailwindcss.com/docs        |
| Conventional Commits | https://www.conventionalcommits.org |
