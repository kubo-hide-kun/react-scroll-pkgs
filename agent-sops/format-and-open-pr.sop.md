# Format, Verify, and Open a Pull Request

## Overview

This SOP defines the pre-commit and pull-request routine every change in this
repository goes through: format with the project's pinned Prettier, run the
type/lint/build checks, write a commitlint-compliant message, and open the
PR. It exists because formatting churn and scope-less commit messages have
repeatedly caused avoidable review noise and rejected commits here.

Use it before committing any change and before opening any PR.

## Parameters

- **change_scope** (required): The Conventional Commit scope for the change —
  either `all` or a specific workspace name (e.g. `react-scroll-flip-book`,
  `use-window-scroll-in-element`, `website`).
- **change_type** (required): The Conventional Commit type (`feat`, `fix`,
  `docs`, `style`, `refactor`, `chore`, `ci`, etc.).
- **touches_website** (optional, default: "false"): Whether the change
  affects `apps/website`, which triggers the browser verification step.

## Steps

### 1. Format with the project's pinned Prettier

Format all touched TypeScript and Markdown with the repository's Prettier so
the diff contains only intended changes.

**Constraints:**

- You MUST format using the Prettier version pinned in the root
  `package.json` devDependencies (currently `2.7.1`), invoked through the
  repo (`npm run format:fix`, which runs
  `prettier --write "**/*.{ts,tsx,md}"`).
- You MUST NOT format with a globally-installed or newer Prettier, because
  Prettier changes its default formatting between major versions and a
  mismatched version rewrites unrelated lines — this project had to add a
  dedicated "format with pinned Prettier 2.7.1" pass to undo exactly that
  kind of churn.
- You MUST respect the configured style (`singleQuote: true`,
  `arrowParens: always`) and MUST NOT hand-format to a different style,
  since Prettier output is the single source of truth for formatting.
- You SHOULD run `npm run format` (`--check`) afterward to confirm the tree
  is clean.

### 2. Run type, lint, and build checks

Run the workspace checks and confirm they pass before committing.

**Constraints:**

- You MUST run `npm run typecheck`, `npm run lint`, and `npm run build`
  (each delegates to `turbo run …`) and confirm all pass.
- You MUST report the outcome of typecheck, lint, and build as a short
  bulleted list, because this project's convention is to always surface
  "type / lint / build / minimal behavior check" results with every change.
- You SHOULD keep the change minimal and MUST explain up front if it must
  span both `apps/` and `packages/`, since cross-boundary changes require a
  stated justification.

### 3. Verify website changes in a real browser

If `touches_website` is true, load the affected page in a real browser and
confirm the behavior, not just the code.

**Constraints:**

- If `touches_website` is true, You MUST run the demo (`npm run website`)
  and verify the affected page in a real browser using the `playwright` or
  `chrome-devtools` MCP server, capturing a screenshot or snapshot.
- You MUST NOT rely on code review or reasoning alone for website changes,
  because visual and scroll-driven behavior in `apps/website` cannot be
  confirmed from source and regressions have shipped this way before.
- You SHOULD confirm the static export still produces output (see the
  `verify-website-change.sop.md` SOP for the deploy-artifact caveat).

### 4. Write a commitlint-compliant commit

Commit with a Conventional Commit message that passes the repo's commitlint
configuration and husky hooks.

**Constraints:**

- You MUST use the form `type(scope): subject` with a non-empty scope drawn
  from `change_scope`, because commitlint in this repo enforces a required
  scope (`all` or a workspace name) and rejects scope-less messages.
- You MUST let the husky `pre-commit` hook run `lint-staged`
  (lint:fix / format:fix / typecheck) and MUST NOT bypass it with
  `--no-verify`, because skipping the hook lets unformatted or broken code
  into history that CI will then reject.
- You SHOULD keep each commit focused on a single logical change.

### 5. Open the pull request

Push the branch and open a PR describing the change, its rationale, and the
verification performed.

**Constraints:**

- You MUST push with `git push -u origin <branch-name>`.
- You MUST write a PR body that states what changed, why, and the
  type/lint/build (and browser, if applicable) verification results.
- You SHOULD choose the version-bump implication (patch/minor/major) for any
  change to a published package and note it in the PR, so the follow-up
  release is unambiguous.

## Examples

### Example Input

```
change_scope: website
change_type: feat
touches_website: true
```

### Example Output

- `npm run format:fix` with pinned Prettier 2.7.1 → no unrelated diff.
- typecheck ✅ / lint ✅ / build ✅.
- Verified the demo in Chromium via playwright MCP; screenshot attached.
- Commit `feat(website): add language toggle to the live demo`.
- Pushed branch and opened PR with rationale and verification notes.

## Troubleshooting

### commitlint rejects the commit

The message is missing a scope or uses a non-Conventional type. Rewrite as
`type(scope): subject` with `scope` = `all` or a workspace name.

### A formatting-only diff appears on unrelated lines

A different Prettier version reformatted the file. Reinstall dependencies so
the pinned Prettier is used, then re-run `npm run format:fix`.

### The pre-commit hook fails

`lint-staged` found a lint, format, or type error. Fix the reported issue
rather than bypassing the hook with `--no-verify`.
