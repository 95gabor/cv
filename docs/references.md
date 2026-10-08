# External references

## Repo and deploy

| Resource       | URL                                   |
| -------------- | ------------------------------------- |
| GitHub repo    | https://github.com/95gabor/cv         |
| Live site      | https://95gabor.me                    |
| GitHub Actions | https://github.com/95gabor/cv/actions |
| GHCR image     | `ghcr.io/95gabor/cv` (after tag push) |

## CI/CD workflows

| Workflow       | Trigger             | Purpose                                                |
| -------------- | ------------------- | ------------------------------------------------------ |
| `ci.yaml`      | PR / push to `main` | lint, typecheck, build, E2E, Lighthouse, Percy, Docker |
| `publish.yaml` | `v*` tag            | GitHub Pages (`out/`) + Docker push                    |
| `release.yaml` | `workflow_dispatch` | semantic-release                                       |

## Secrets (GitHub)

| Name                       | Type   | Usage                |
| -------------------------- | ------ | -------------------- |
| `PERCY_TOKEN`              | Secret | Visual regression CI |
| `RELEASE_BOT_GITHUB_TOKEN` | Secret | Release workflow     |

`publish.yaml` needs no CV data secrets — content is committed YAML.

## Documentation in the repo

| File                      | Contents            |
| ------------------------- | ------------------- |
| `docs/.ai/README.md`      | Agent entry point   |
| `docs/content.md`         | CV YAML editing     |
| `content/example.yaml`    | Example CV data     |
| `lib/cv/types.ts`         | CV TypeScript types |
| `AGENTS.md` / `SKILLS.md` | Agent guidelines    |

## Framework documentation

| Tool                 | Link                                |
| -------------------- | ----------------------------------- |
| Next.js              | https://nextjs.org/docs             |
| React                | https://react.dev                   |
| shadcn/ui            | https://ui.shadcn.com               |
| Playwright           | https://playwright.dev              |
| Tailwind CSS v4      | https://tailwindcss.com/docs        |
| Conventional Commits | https://www.conventionalcommits.org |
