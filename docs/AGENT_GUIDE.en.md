# Agent Guide for react-scroll-pkgs

> **Note**: This document is for Cursor agents. For Japanese developers, see [AGENT_GUIDE.md](./AGENT_GUIDE.md).

This document is a guide for Cursor agents to understand this project and propose appropriate changes.

## Project Structure

### Monorepo Structure

- **`apps/website`**: Demo/documentation site (not published)
  - **Demo Site**: https://react-scroll-pkgs.vercel.app/ (hosted on Vercel)
- **`packages/*`**: Libraries published to npm (published)

### Turborepo Workspace

- `workspaces` defined in root `package.json`
- Task pipeline defined in `turbo.json`

## Project Links

- **GitHub Repository**: https://github.com/kubo-hide-kun/react-scroll-pkgs
- **Demo Site**: https://react-scroll-pkgs.vercel.app/
- **npm Packages**:
  - [react-scroll-flip-book](https://www.npmjs.com/package/react-scroll-flip-book)
  - [use-window-scroll-in-element](https://www.npmjs.com/package/use-window-scroll-in-element)

## Published Packages

### react-scroll-flip-book (v1.0.2)

- **Purpose**: React Hook for scroll flip book functionality
- **Entry Point**: `src/index.ts` → `lib/index.js`
- **Type Definitions**: `lib/typescript/index.d.ts`
- **Published Files**: `lib/`, `LICENSE`
- **Dependencies**: Uses `use-window-scroll-in-element`
- **npm**: https://www.npmjs.com/package/react-scroll-flip-book
- **Installation**: `npm install react-scroll-flip-book`

### use-window-scroll-in-element (v1.1.1)

- **Purpose**: React Hook for getting window position of element
- **Entry Point**: `src/index.ts` → `lib/index.js`
- **Type Definitions**: `lib/typescript/index.d.ts`
- **Published Files**: `lib/`, `LICENSE`
- **Dependencies**: Uses `just-throttle`
- **npm**: https://www.npmjs.com/package/use-window-scroll-in-element
- **Installation**: `npm install use-window-scroll-in-element`

## Build & Publish Process

### Build

- Each package compiles TypeScript using `tsc --project tsconfig.build.json`
- Output directory: `lib/`
- Auto-builds via `prepublishOnly` script

### Publish Workflow (GitHub Actions)

1. `npm ci` - Install dependencies
2. `npm run build` - Build all packages (`turbo run build`)
3. `npm publish -w <package-name>` - Publish specific package

**Important**: If the `build` task fails, the entire publish process fails.

## Breaking Change Criteria

### Major Version Bump Required

- Public API removal
- Function signature changes (parameter types, order, required/optional)
- Default behavior changes
- Major dependency version updates

### Minor Version Bump Required

- New feature additions (backward compatible)
- Existing API extensions (e.g., adding optional parameters)

### Patch Version Bump Required

- Bug fixes
- Documentation updates
- Internal implementation improvements (no API changes)

## Release Management

- Each package has independent versioning
- Manual publishing via GitHub Actions `workflow_dispatch`
- Always verify `turbo run build` succeeds before publishing

## MCP (Model Context Protocol) Usage

This project **requires full utilization of MCP**. The following MCP Servers are configured and should be used whenever possible.

### Available MCP Servers

#### playwright

- **Purpose**: Browser automation and vision capabilities
- **Use Cases**:
  - `apps/website` verification
  - Demo site E2E testing
  - Visual regression testing
  - Screenshot capture

#### chrome-devtools

- **Purpose**: Browser debugging using Chrome DevTools Protocol
- **Use Cases**:
  - Performance analysis
  - Network request inspection
  - Console log review
  - Element investigation

#### serena

- **Purpose**: Project context-aware IDE assistant
- **Use Cases**:
  - Code search (`find_symbol`, `search_for_pattern`)
  - Symbol reference search (`find_referencing_symbols`)
  - Code structure understanding (`get_symbols_overview`)
  - Symbol renaming (`rename_symbol`)

#### cipher

- **Purpose**: Local embedder
- **Use Cases**:
  - Code meaning understanding
  - Semantic search
  - Similar code search

### MCP Usage Priority

1. **Code Search & Symbol Operations**: Prioritize `serena`

   - Use `serena`'s `find_symbol` or `search_for_pattern` instead of traditional `grep` or `codebase_search`
   - Use `find_referencing_symbols` to find symbol references

2. **Web Application Verification**: Use `playwright` or `chrome-devtools`

   - Always verify `apps/website` in a browser
   - Capture screenshots or snapshots for visual verification

3. **Code Understanding**: Utilize `cipher`

   - Use when semantic search is needed

4. **Traditional Tools**: Use only as fallback when MCP cannot handle
   - `grep`, `read_file`, `codebase_search`, etc. are fallbacks when MCP cannot handle

### Important Notes

- **Browser Operations**: When verifying `apps/website` or demos, always use `playwright` or `chrome-devtools` to verify in an actual browser. Guessing or code review alone is insufficient.
- **Code Search**: When symbol names are known, use `serena`'s `find_symbol`. Use `search_for_pattern` when pattern matching is needed.
- **Project Structure Understanding**: When understanding new files or directories, utilize `serena`'s `get_symbols_overview`.

## Development Notes

1. **apps and packages boundary**: `apps/website` is for demo purposes. Verify that package changes don't affect the demo (**use MCP `playwright` to verify in browser**)
2. **Dependency cycles**: `react-scroll-flip-book` depends on `use-window-scroll-in-element`. Avoid circular dependencies (**verify with `serena`'s `find_referencing_symbols`**)
3. **Type definition consistency**: Verify that `lib/typescript/index.d.ts` is generated correctly
4. **Prettier configuration**: Follow `singleQuote: true`, `arrowParens: always`
