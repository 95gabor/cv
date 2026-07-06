# AI context — CV site

**Entry point for agents.** Read this file first, then load only what the task
needs.

## Load order

| Priority | File                                         | When                               |
| -------- | -------------------------------------------- | ---------------------------------- |
| 1        | [architecture.md](./architecture.md)         | Always — system map, build, deploy |
| 2        | [coding-standards.md](./coding-standards.md) | Before writing code                |
| 3        | [content-model.md](./content-model.md)       | Editing CV data or i18n            |
| 4        | [workflows/](./workflows/)                   | Multi-step tasks                   |
| 5        | [../projects/](../projects/)                 | Rewrite initiative docs            |

## Stack (v2 branch)

**Next.js 16** · App Router · static export · **shadcn/ui** · **Tailwind v4** ·
**Supabase** (build-time fetch) · **pnpm**

## Active projects

| Project                                                                     | Status                                           |
| --------------------------------------------------------------------------- | ------------------------------------------------ |
| [next-shadcn-supabase-rewrite](../projects/next-shadcn-supabase-rewrite.md) | Phases 1–5 done on `v2`; Phase 6 cutover pending |

## Agent roles

| Role                 | Focus                                         |
| -------------------- | --------------------------------------------- |
| **Dependency Agent** | pnpm updates in controlled batches            |
| **Quality Agent**    | lint, typecheck, build before PR              |
| **CI Agent**         | GitHub Actions — pnpm, Supabase in CI, `out/` |
| **Release Agent**    | semantic-release, tag workflow, publish       |

See also root [`SKILLS.md`](../../SKILLS.md).

## Deep reference

| File                                                       | Scope                           |
| ---------------------------------------------------------- | ------------------------------- |
| [../content.md](../content.md)                             | Human CV editing guide          |
| [../setup.md](../setup.md)                                 | Local dev setup                 |
| [../references.md](../references.md)                       | URLs, CI secrets, external docs |
| [workflows/commit-and-pr.md](./workflows/commit-and-pr.md) | Commits and PRs                 |
