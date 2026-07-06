# Workflow: commit and PR

## Before commit

Run [run-and-verify.md](./run-and-verify.md) quality gate.

## Commit (only when user asked)

```bash
git status
git diff
git log -3 --oneline   # match commit style
```

- Conventional Commits format
- Message via HEREDOC
- Never `--no-verify`, never amend unless rules allow
- Do not commit secrets

## Pull request

```bash
git status
git diff main...HEAD
git log main...HEAD --oneline
```

Create PR with `gh pr create`:

```markdown
## Summary

- ...

## Test plan

- [ ] npm run lint
- [ ] npm run typecheck
- [ ] npm run generate
- [ ] (if UI) npm run test:e2e
```

## CI expectations on PR

`ci.yaml` runs: lint, typecheck, generate, Lighthouse, E2E, Percy, Docker build
validation, commitlint.

Wait for green before requesting review.
