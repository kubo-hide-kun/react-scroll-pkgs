# Agent Guide

Cross-agent entry point for this repository. Any AI agent (Claude Code,
Cursor, Kiro, …) should start here.

This is a Turborepo monorepo: `packages/*` are the publishable libraries,
`apps/website` is a private demo/docs site deployed to Vercel.

## Reusable procedures (Agent SOPs)

Recurring work is codified as [Agent SOPs](./agent-sops/README.md). Reach for
the matching SOP instead of improvising — each one embeds the failures this
repo has actually hit as constraint rationale.

- Releasing a package to npm → `agent-sops/release-npm-package.sop.md`
- Formatting, verifying, and opening a PR → `agent-sops/format-and-open-pr.sop.md`
- Changing `apps/website` → `agent-sops/verify-website-change.sop.md`

SOPs are distributed to Claude Code via the project-scoped
[`.mcp.json`](./.mcp.json) (`agent-sops` MCP server) and are exposed as MCP
prompts. They are invoked on demand, so consult the list above proactively
when a task matches one.

## Project docs

- `.cursorrules` — project-specific rules (Japanese; scope/coding/turbo/commit).
- `docs/AGENT_GUIDE.md` — project structure, packages, build & publish flow,
  MCP usage (`docs/AGENT_GUIDE.en.md` for English).
- `docs/MCP_SETUP.md` — MCP server setup.
- `.serena/memories/` — Serena memory files.

## Essentials

- Commits: Conventional Commits with a **required non-empty scope** (`all` or a
  workspace name); commitlint + husky enforce this. Do not bypass hooks.
- Format with the **pinned Prettier** (`npm run format:fix`); do not use a
  different Prettier version.
- Always report `typecheck` / `lint` / `build` results with a change; verify
  `apps/website` in a real browser, not by reading source.
