# Workflow: commit and PR

## Before opening a PR

```bash
pnpm install --frozen-lockfile
pnpm run lint
pnpm run typecheck
pnpm run build
```

If UI changed:

```bash
pnpm run test:e2e
```

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation only
- `chore:` tooling, deps, CI
- `refactor:` code change without feature/fix
- `test:` tests only

## PR checklist

- [ ] `pnpm run lint`
- [ ] `pnpm run typecheck`
- [ ] `pnpm run build`
- [ ] (if UI) `pnpm run test:e2e`
- [ ] Docs updated if architecture, setup, or content model changed
- [ ] Conventional Commits PR title

## Do not

- Commit unless user explicitly asked
- Force-push to `main`
