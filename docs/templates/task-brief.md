# Task brief template

Copy to the start of a new chat or into `local/` for larger tasks.

---

## Task

**Title:** [short description]

**Affected areas:**

- [ ] `content/*.yaml` — CV content (seed via `pnpm run db:seed`)
- [ ] `components/` — UI
- [ ] `app/` — routes, layout, metadata
- [ ] `messages/` + `i18n/` — UI translations (`next-intl`)
- [ ] `lib/cv/` — types, fetch, mapping
- [ ] `.github/workflows/` — CI
- [ ] `docs/` — documentation

## Context

[What is the problem / feature? Why is it needed?]

## Acceptance criteria

- [ ] ...
- [ ] ...

## Constraints

- Do not change: ...
- Quality gate: `pnpm run lint && pnpm run typecheck && pnpm run build`
- Build-time Supabase fetch only on public CV pages

## Relevant files

- `path/to/file`

## Testing

1. ...
2. ...

## Notes

[Optional: screenshot, issue link]

---
