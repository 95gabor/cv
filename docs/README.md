# CV site — documentation

This folder is **version-controlled** (git). Agent and developer context lives
here.

## AI-native context (agents: start here)

```
docs/.ai/
├── README.md              ← entry point
├── architecture.md
├── coding-standards.md
├── content-model.md       ← YAML schema, i18n model
└── workflows/
    ├── local-setup.md
    ├── edit-cv-content.md
    ├── run-and-verify.md
    ├── commit-and-pr.md
    └── release.md
```

**Read first:** [`.ai/README.md`](./.ai/README.md)

## Reference

| Document                         | Purpose                           |
| -------------------------------- | --------------------------------- |
| [content.md](./content.md)       | CV YAML editing, fields, examples |
| [setup.md](./setup.md)           | Local development environment     |
| [references.md](./references.md) | GitHub, deploy, external links    |
| [templates/](./templates/)       | Task brief template               |
| [projects/](./projects/)         | Larger initiatives (when needed)  |
| [local/](./local/)               | Personal notes (not shared)       |

## Update rules

**Flow diagrams:** use **Mermaid** in new or updated flow docs (not ASCII box
art). Details:
[`.ai/coding-standards.md`](./.ai/coding-standards.md#documentation).

| Change type                     | Update in                                   |
| ------------------------------- | ------------------------------------------- |
| Architecture, build, deploy     | `.ai/architecture.md`                       |
| Code style, SCSS/Tailwind rules | `.ai/coding-standards.md`                   |
| CV YAML schema, i18n            | `.ai/content-model.md` + `content.md`       |
| New recurring task              | new file in `.ai/workflows/`                |
| New larger initiative           | `projects/<slug>.md` + `projects/README.md` |
| Stack rewrite / migration       | `projects/next-shadcn-supabase-rewrite/`    |
| Agent roles                     | `.ai/README.md` + root `AGENTS.md`          |

## Quick commands

```bash
npm ci
npm run dev          # http://localhost:3000
npm run lint && npm run typecheck && npm run generate
npm run test:e2e
```
