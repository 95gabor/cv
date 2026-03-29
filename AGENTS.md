# Agents

This repository supports task-focused contributors (human or automated) that
work in small, reviewable changes.

## Recommended agent roles

- Dependency Agent
  - Updates npm dependencies in controlled batches.
  - Runs `npm outdated` and applies updates with validation.
- Quality Agent
  - Runs local quality gates before opening or updating a PR.
  - Required checks: `npm ci`, `npm run lint`, `npm run typecheck`,
    `npm run generate`.
- CI Agent
  - Maintains GitHub Actions workflows and keeps checks fast and reliable.
- Release Agent
  - Handles release workflow and release automation setup.

## Working rules

- Keep changes scoped and atomic.
- Prefer small commits with clear intent.
- Commit messages and PR titles must follow Conventional Commits.
- Keep CI green before requesting review.
