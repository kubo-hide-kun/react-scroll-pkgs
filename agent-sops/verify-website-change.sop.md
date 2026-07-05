# Verify a Website / Demo Change

## Overview

This SOP defines how to verify a change to `apps/website` — the scroll-linked
demo and documentation site deployed to Vercel. The site is scroll-driven and
statically exported, so correctness cannot be judged from source alone, and a
misconfigured Turborepo build has silently shipped an empty deploy here
before. This SOP makes browser verification and deploy-artifact checking a
repeatable routine.

Use it whenever you change anything under `apps/website`, or change build
configuration (`turbo.json`, Next.js config) that affects the site.

## Parameters

- **target_pages** (required): The page(s) affected by the change (e.g. the
  landing page `/`, or the hook page). Determines what to load and verify.
- **change_summary** (required): What the change is expected to do visually
  or behaviorally, used as the acceptance criteria for verification.

## Steps

### 1. Run the demo locally

Start the website dev server and open the affected page(s).

**Constraints:**

- You MUST start the site with `npm run website` (which runs
  `npm run dev -w website`).
- You MUST open every page in `target_pages` rather than assuming unaffected
  pages are fine, because shared layout, theme, and stacking context changes
  can regress pages you did not directly edit.

### 2. Verify behavior in a real browser

Drive the page in a real browser and confirm the change against
`change_summary`, including scroll-driven behavior.

**Constraints:**

- You MUST verify using the `playwright` or `chrome-devtools` MCP server in a
  real browser, and MUST capture a screenshot or snapshot as evidence.
- You MUST NOT confirm a website change by reading the source or reasoning
  alone, because the site's value is scroll-linked, animated behavior that
  does not appear in static code and has regressed unnoticed this way before.
- You MUST exercise the scroll interaction (progress bars, fades, parallax,
  flip-book frames) for scroll-driven sections, not just the initial view.
- You SHOULD verify both the Japanese and English states when the change
  touches text, since the demo has a persisted locale toggle.
- You SHOULD check the browser console for errors introduced by the change.

### 3. Verify the production build and export artifacts

Build the site the way Vercel does and confirm real artifacts are produced.

**Constraints:**

- You MUST run `npm run build` (`turbo run build`) and confirm the website
  build succeeds.
- You MUST confirm the build actually emits its output directories
  (`.next/` and the exported `out/`) and that `turbo.json` declares these as
  the build task `outputs`, because Turborepo caches by declared outputs: if
  the real output directories are not listed, a cache hit restores an
  **empty** output and Vercel fails with "Routes Manifest Could Not Be
  Found" — this exact misconfiguration has broken deploys in this repo.
- You MUST NOT declare output globs in `turbo.json` that no task actually
  emits (e.g. a stale `build/**`), because captured-nothing caches silently
  produce empty deploys that look green in CI.
- You SHOULD confirm `.next/routes-manifest.json` exists in the build output
  as a concrete signal the export is complete.

### 4. Confirm the change does not affect published packages

Ensure the website change stays inside `apps/website` and does not leak into
the publishable libraries.

**Constraints:**

- You MUST confirm no files under `packages/*` changed as a side effect,
  because `apps/website` is a private demo (not published) and library
  changes require the separate release process.
- You SHOULD use `serena`'s `find_referencing_symbols` when moving or
  renaming shared code to confirm you did not break a package that the demo
  imports.

## Examples

### Example Input

```
target_pages: landing page "/"
change_summary: Hero flipbook becomes a sticky backdrop; CTA buttons and
  copy-to-clipboard install commands appear above it.
```

### Example Output

- Ran `npm run website`; opened `/` in Chromium via playwright MCP.
- Scrolled through the hero: flipbook stays sticky, content renders above it,
  copy buttons work; screenshot captured. No console errors.
- `turbo run build` green; `.next/` and `out/` emitted, `routes-manifest.json`
  present; `turbo.json` outputs list the real dirs.
- No `packages/*` files changed.

## Troubleshooting

### Vercel deploy fails with "Routes Manifest Could Not Be Found"

Turborepo restored an empty cached output because `turbo.json` did not list
the website's real output directories. Fix the build task `outputs` to the
directories actually emitted (`.next/`, `out/`, and `lib/` for libraries),
then rebuild.

### Section content renders behind the sticky canvas

A stacking-context / z-index regression. Verify in the browser and fix the
stacking so section content layers above the sticky background canvases.
