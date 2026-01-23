# use-window-scroll-in-element

<div align="center">

**React Hook for getting window position within an element**

[![npm version](https://img.shields.io/npm/v/use-window-scroll-in-element)](https://www.npmjs.com/package/use-window-scroll-in-element)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[Live Demo](https://react-scroll-pkgs.vercel.app/) • [GitHub](https://github.com/kubo-hide-kun/react-scroll-pkgs) • [日本語](./README.ja.md)

</div>

## Overview

`use-window-scroll-in-element` is a React Hook that calculates **where the window's top/bottom edge is positioned within a target element** as the user scrolls. It returns both **pixel values** and **percentage values** (0-100%), making it perfect for building scroll-linked UI animations.

This is the **primitive building block** for scroll-based animations. It tracks:
- How many pixels the window has scrolled within the element
- What percentage of the scrollable area has been traversed
- Whether the window is currently within the element's scrollable area

## Installation

```bash
npm install use-window-scroll-in-element
```

or

```bash
yarn add use-window-scroll-in-element
```

## Quick Start

```tsx
import { useRef } from 'react';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

function MyComponent() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { position, fraction, isInside } = useWindowScrollInElement(targetRef);
  
  return (
    <div>
      <div ref={targetRef} style={{ height: '200vh' }}>
        {/* Scrollable content */}
      </div>
      
      <div>
        <p>Position: {position.top}px / {position.bottom}px</p>
        <p>Progress: {(fraction.top * 100).toFixed(1)}%</p>
        <p>Is inside: {isInside ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}
```

## API Reference

### `useWindowScrollInElement(targetElmRef, options?)`

#### Parameters

- **`targetElmRef`** (`React.RefObject<HTMLElement>`) - Required
  - A React ref pointing to the target element whose scroll position you want to track

- **`options`** (`Partial<Options>`) - Optional
  - Configuration object with the following properties:

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `scrollStartPosition` | `'window-top' \| 'window-center' \| 'window-bottom'` | `'window-top'` | Which part of the window to use as the reference point when calculating scroll start |
| `scrollEndPosition` | `'window-top' \| 'window-center' \| 'window-bottom'` | `'window-top'` | Which part of the window to use as the reference point when calculating scroll end |
| `disableValueChangesOffscreen` | `boolean` | `false` | If `true`, returns `{position: {top: 0, bottom: 0}, fraction: {top: 0, bottom: 0}, isInside: false}` when the element is outside the viewport. Useful for performance optimization. |
| `waitingMs` | `number` | `undefined` | Throttle delay in milliseconds for scroll events. If not specified, events fire on every scroll. |

#### Return Value

Returns an object with the following properties:

```typescript
{
  position: {
    top: number;    // Position of window top edge in pixels (within target element)
    bottom: number; // Position of window bottom edge in pixels (within target element)
  };
  fraction: {
    top: number;    // Position as percentage (0-1) of scrollable area
    bottom: number; // Position as percentage (0-1) of scrollable area
  };
  isInside: boolean; // Whether the window is currently within the element's scrollable area
}
```

### Understanding the Values

#### `position.top` and `position.bottom`

These values represent **how many pixels** the window's top/bottom edge has scrolled within the target element:

- `position.top = 0` when the window top edge aligns with the element's top
- `position.top` increases as you scroll down
- `position.bottom` represents the bottom edge position similarly

**Calculation method:**
- Uses `getBoundingClientRect()` to get viewport-relative positions
- Converts viewport coordinates to element-relative coordinates
- Accounts for `scrollStartPosition` and `scrollEndPosition` settings

#### `fraction.top` and `fraction.bottom`

These values represent the **scroll progress as a percentage** (0.0 to 1.0):

- `fraction.top = 0` at the start of the scrollable area
- `fraction.top = 1` at the end of the scrollable area
- Calculated as: `position / scrollableHeight`

**Note:** If the element's height is less than the window height, `scrollableHeight` can be negative, which may result in unexpected fraction values.

#### `isInside`

Boolean indicating whether the window is currently within the element's scrollable area. Useful for:
- Conditional rendering
- Performance optimization (with `disableValueChangesOffscreen`)
- Triggering animations only when visible

## Usage Examples

### Basic Scroll Progress Indicator

```tsx
import { useRef } from 'react';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

function ScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { fraction } = useWindowScrollInElement(containerRef);
  
  return (
    <div>
      <div 
        ref={containerRef}
        style={{ height: '300vh', padding: '2rem' }}
      >
        <h1>Scroll down to see progress</h1>
        {/* Your content */}
      </div>
      
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <div 
          style={{ 
            height: '4px', 
            background: 'blue',
            width: `${fraction.top * 100}%` 
          }} 
        />
      </div>
    </div>
  );
}
```

### Scroll-Linked Animation

```tsx
import { useRef } from 'react';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

function AnimatedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { fraction, isInside } = useWindowScrollInElement(sectionRef, {
    disableValueChangesOffscreen: true, // Optimize performance
  });
  
  const opacity = isInside ? fraction.top : 0;
  const scale = 0.5 + (fraction.top * 0.5); // Scale from 0.5 to 1.0
  
  return (
    <section ref={sectionRef} style={{ height: '200vh' }}>
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          transition: 'opacity 0.1s, transform 0.1s',
        }}
      >
        <h2>Fade in and scale as you scroll</h2>
      </div>
    </section>
  );
}
```

### Window Center Position Tracking

```tsx
import { useRef } from 'react';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

function CenterTrackedSection() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track when window center passes through the element
  const { position, fraction } = useWindowScrollInElement(ref, {
    scrollStartPosition: 'window-center',
    scrollEndPosition: 'window-center',
  });
  
  return (
    <div ref={ref} style={{ height: '500vh' }}>
      <p>Window center position: {position.top}px</p>
      <p>Progress: {(fraction.top * 100).toFixed(1)}%</p>
    </div>
  );
}
```

### Performance Optimization

```tsx
import { useRef } from 'react';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

function OptimizedComponent() {
  const ref = useRef<HTMLDivElement>(null);
  
  const result = useWindowScrollInElement(ref, {
    disableValueChangesOffscreen: true, // Stop updates when offscreen
    waitingMs: 16, // Throttle to ~60fps
  });
  
  // When offscreen, result will be:
  // { position: {top: 0, bottom: 0}, fraction: {top: 0, bottom: 0}, isInside: false }
  
  return (
    <div ref={ref} style={{ height: '200vh' }}>
      {result.isInside && (
        <div>Only renders when visible!</div>
      )}
    </div>
  );
}
```

## How It Works

### Internal Implementation

1. **Scroll Event Listening**
   - Uses `useWindowScrollEffect` hook to listen to window scroll events
   - Throttles events based on `waitingMs` option (uses `just-throttle`)

2. **Position Calculation**
   - Gets element position using `getBoundingClientRect()`
   - Calculates window edge positions relative to the element
   - Accounts for `scrollStartPosition` and `scrollEndPosition`:
     - `window-top`: Uses `rect.top * -1`
     - `window-center`: Uses `windowHeight/2 - rect.top`
     - `window-bottom`: Uses `windowHeight - rect.top`

3. **Fraction Calculation**
   - Calculates scrollable height: `elementHeight - windowHeight`
   - Converts pixel position to fraction: `position / scrollableHeight`

4. **Ref Handling**
   - Uses `useRefValue` to handle ref changes via polling
   - Ensures updates continue even if ref is swapped

### Important Notes

⚠️ **Window Resize Handling**: The current implementation listens to `scroll` events for window size changes instead of `resize` events. This may cause issues when the window is resized without scrolling. Consider using a resize observer or listening to `resize` events separately.

⚠️ **Negative Scrollable Height**: If the element's height is less than the window height, `scrollableHeight` becomes negative, which can result in unexpected `fraction` values. Consider adding guards or clamping values in your application code.

## Browser Support

- React 16.8+ (requires Hooks)
- Modern browsers with ES6+ support
- Uses `getBoundingClientRect()` API (widely supported)

## TypeScript

This package includes TypeScript definitions. No additional type packages needed.

```typescript
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

// Types are automatically inferred
const result = useWindowScrollInElement(ref);
// result.position.top: number
// result.fraction.top: number
// result.isInside: boolean
```

## Related Packages

- **[react-scroll-flip-book](https://www.npmjs.com/package/react-scroll-flip-book)** - Scroll-linked flipbook animation component built on top of this hook

## Demo & Documentation

- **[Live Demo](https://react-scroll-pkgs.vercel.app/)** - Interactive examples and visualizations
- **[GitHub Repository](https://github.com/kubo-hide-kun/react-scroll-pkgs)** - Source code and issues

## License

MIT © [kubo-hide-kun](https://github.com/kubo-hide-kun)

## Contributing

Contributions are welcome! Please see the [GitHub repository](https://github.com/kubo-hide-kun/react-scroll-pkgs) for contribution guidelines.
