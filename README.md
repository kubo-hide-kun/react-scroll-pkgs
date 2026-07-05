# react-scroll-pkgs

<div align="center">

**Scroll-linked React UI libraries**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[Live Demo](https://react-scroll-pkgs.vercel.app/) • [GitHub](https://github.com/kubo-hide-kun/react-scroll-pkgs) • [日本語](./README.ja.md)

</div>

## Overview

`react-scroll-pkgs` is a **Turborepo monorepo** containing React hooks and components for building scroll-linked UI animations. The project provides two npm packages:

1. **[use-window-scroll-in-element](./packages/use-window-scroll-in-element)** - Primitive hook for tracking window position within an element
2. **[react-scroll-flip-book](./packages/react-scroll-flip-book)** - Scroll-linked flipbook animation component

Both packages are designed to work together but can be used independently.

## Packages

### use-window-scroll-in-element

React Hook that calculates **where the window's top/bottom edge is positioned within a target element** as the user scrolls. Returns both pixel values and percentage values (0-100%).

**Installation:**

```bash
npm install use-window-scroll-in-element
```

**Documentation:** [packages/use-window-scroll-in-element/README.md](./packages/use-window-scroll-in-element/README.md)

**npm:** [use-window-scroll-in-element](https://www.npmjs.com/package/use-window-scroll-in-element)

### react-scroll-flip-book

React component that creates scroll-linked flipbook animations by rendering sequential image frames on a canvas as the user scrolls. Built on top of `use-window-scroll-in-element`.

**Installation:**

```bash
npm install react-scroll-flip-book
```

**Documentation:** [packages/react-scroll-flip-book/README.md](./packages/react-scroll-flip-book/README.md)

**npm:** [react-scroll-flip-book](https://www.npmjs.com/package/react-scroll-flip-book)

## Quick Start

### Using the Hook

```tsx
import { useRef } from 'react';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const { position, fraction } = useWindowScrollInElement(ref);

  return (
    <div ref={ref} style={{ height: '200vh' }}>
      <p>Scroll progress: {(fraction.top * 100).toFixed(1)}%</p>
    </div>
  );
}
```

### Using the Flipbook Component

```tsx
import { ScrollFlipBook } from 'react-scroll-flip-book';

function App() {
  const frames = Array.from({ length: 60 }, (_, i) => ({
    webp: `/frames/frame-${String(i).padStart(4, '0')}.webp`,
    jpg: `/frames/frame-${String(i).padStart(4, '0')}.jpg`,
  }));

  return (
    <div style={{ height: '200vh' }}>
      <ScrollFlipBook
        defaultSource={{ framePaths: frames }}
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
}
```

## Project Structure

This is a **Turborepo monorepo** with the following structure:

```
react-scroll-pkgs/
├── apps/
│   └── website/          # Demo/documentation site (Next.js)
├── packages/
│   ├── use-window-scroll-in-element/  # Published package
│   ├── react-scroll-flip-book/        # Published package
│   ├── eslint-config/     # Shared ESLint config
│   └── tsconfig/          # Shared TypeScript configs
├── .github/workflows/     # CI/CD workflows
├── docs/                  # Developer documentation
└── scripts/               # Utility scripts
```

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run linting
npm run lint

# Run type checking
npm run typecheck

# Start demo website
npm run website
```

### Turborepo Commands

- `turbo run build` - Build all packages (respects dependencies)
- `turbo run lint` - Lint all packages
- `turbo run lint:fix` - Auto-fix linting issues
- `turbo run typecheck` - Type check all packages

## Demo & Documentation

- **[Live Demo](https://react-scroll-pkgs.vercel.app/)** - Interactive examples and visualizations hosted on Vercel
- **[GitHub Repository](https://github.com/kubo-hide-kun/react-scroll-pkgs)** - Source code, issues, and pull requests
- **[Developer Documentation](./docs/README.md)** - Documentation index for developers and contributors

## License

MIT © [kubo-hide-kun](https://github.com/kubo-hide-kun)

## Contributing

Contributions are welcome! Please see the [GitHub repository](https://github.com/kubo-hide-kun/react-scroll-pkgs) for contribution guidelines.

## Related Links

- [use-window-scroll-in-element on npm](https://www.npmjs.com/package/use-window-scroll-in-element)
- [react-scroll-flip-book on npm](https://www.npmjs.com/package/react-scroll-flip-book)
- [Live Demo Site](https://react-scroll-pkgs.vercel.app/)
