# Agents

> **AI-native docs:** Read [`docs/.ai/README.md`](./docs/.ai/README.md) first.

Quick links:

- [Architecture](./docs/.ai/architecture.md)
- [Coding standards](./docs/.ai/coding-standards.md)
- [Content model](./docs/.ai/content-model.md)
- [Workflows](./docs/.ai/workflows/)
- [Human docs index](./docs/README.md)

## Recommended agent roles

- **Dependency Agent** — pnpm updates in controlled batches; `pnpm outdated` +
  validation.
- **Quality Agent** — `pnpm install --frozen-lockfile`, lint, typecheck, build
  before PR.
- **CI Agent** — GitHub Actions workflows; keep checks fast and reliable.
- **Release Agent** — semantic-release and publish workflow.

## Working rules

- Keep changes scoped and atomic.
- Prefer small commits with clear intent.
- Commit messages and PR titles must follow Conventional Commits.
- Keep CI green before requesting review.

See also [`SKILLS.md`](./SKILLS.md).
