# react-scroll-flip-book

<div align="center">

**Scroll-linked flipbook animation component for React**

[![npm version](https://img.shields.io/npm/v/react-scroll-flip-book)](https://www.npmjs.com/package/react-scroll-flip-book)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[Live Demo](https://react-scroll-pkgs.vercel.app/) • [GitHub](https://github.com/kubo-hide-kun/react-scroll-pkgs) • [日本語](./README.ja.md)

</div>

## Overview

`react-scroll-flip-book` is a React component that creates **scroll-linked flipbook animations** by rendering sequential image frames on a canvas as the user scrolls. It's built on top of [`use-window-scroll-in-element`](https://www.npmjs.com/package/use-window-scroll-in-element) and automatically handles:

- Frame selection based on scroll progress
- Image format detection (AVIF, WebP, JPG, PNG)
- Image preloading and caching
- Responsive breakpoints for different frame sets
- Canvas rendering with proper scaling

Perfect for creating hero animations, scroll-triggered sequences, and interactive storytelling experiences.

## Installation

```bash
npm install react-scroll-flip-book
```

or

```bash
yarn add react-scroll-flip-book
```

**Peer Dependencies:**

- React 16.8+ (requires Hooks)

## Quick Start

```tsx
import { ScrollFlipBook } from 'react-scroll-flip-book';

function App() {
  // Prepare frame paths (supports multiple formats for browser compatibility)
  const framePaths = Array.from({ length: 60 }, (_, i) => ({
    webp: `/frames/frame-${String(i).padStart(4, '0')}.webp`,
    jpg: `/frames/frame-${String(i).padStart(4, '0')}.jpg`,
  }));

  return (
    <div style={{ height: '200vh' }}>
      {' '}
      {/* Scrollable container */}
      <ScrollFlipBook
        defaultSource={{ framePaths }}
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
}
```

## API Reference

### `<ScrollFlipBook />`

#### Required Props

- **`defaultSource`** (`object`)
  - **`framePaths`** (`Array<{ [encodeType in Encode]?: string }>`) - Array of frame objects. Each object can contain paths for different image formats:
    ```typescript
    {
      avif?: string;  // AVIF format (best compression)
      webp?: string;  // WebP format (good compression)
      jpg?: string;   // JPEG format (fallback)
      png?: string;   // PNG format (fallback)
    }
    ```
    The component automatically selects the best supported format.

#### Optional Props

| Prop                     | Type                                                  | Default                         | Description                                                                                            |
| ------------------------ | ----------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `sources`                | `Array<Source>`                                       | `[]`                            | Responsive breakpoints for different frame sets. Each source applies when screen width >= `breakPoint` |
| `pause`                  | `boolean`                                             | `false`                         | Pause the animation (freezes on current frame)                                                         |
| `preLoadingSize`         | `number`                                              | `undefined`                     | Number of frames to preload ahead. If not specified, all frames load at once                           |
| `canvasSize`             | `{ width: number; height: number }`                   | `{ width: 1920, height: 1920 }` | Canvas drawing buffer size (not CSS size). Higher = better quality but more memory                     |
| `background`             | `string`                                              | `'transparent'`                 | Background color or image for the canvas                                                               |
| `positionFixed`          | `boolean`                                             | `false`                         | Use `position: fixed` for the canvas (useful for hero sections)                                        |
| `animationStartPosition` | `'window-top' \| 'window-center' \| 'window-bottom'`  | `'window-top'`                  | Window position where animation starts                                                                 |
| `animationEndPosition`   | `'window-top' \| 'window-center' \| 'window-bottom'`  | `'window-top'`                  | Window position where animation ends                                                                   |
| `onUpdateImage`          | `(args: { index: number; progress: number }) => void` | `undefined`                     | Callback fired when frame changes                                                                      |
| `onPreloadImages`        | `() => void`                                          | `undefined`                     | Callback fired when preloading completes                                                               |

#### Source Type

```typescript
type Source = {
  breakPoint: number; // Minimum screen width (px) to apply this source
  framePaths: { [encodeType in Encode]?: string }[];
};
```

#### Supported Image Formats

The component supports these formats (in priority order):

- `avif` - AVIF format (best compression, modern browsers)
- `webp` - WebP format (good compression, widely supported)
- `jpg` - JPEG format (universal fallback)
- `png` - PNG format (fallback, supports transparency)

The component automatically detects browser support and selects the best available format.

## Usage Examples

### Basic Flipbook

```tsx
import { ScrollFlipBook } from 'react-scroll-flip-book';

function BasicFlipbook() {
  const frames = Array.from({ length: 120 }, (_, i) => ({
    webp: `/animation/frame-${String(i).padStart(4, '0')}.webp`,
    jpg: `/animation/frame-${String(i).padStart(4, '0')}.jpg`,
  }));

  return (
    <div style={{ height: '300vh' }}>
      {' '}
      {/* Important: Provide scrollable height */}
      <ScrollFlipBook
        defaultSource={{ framePaths: frames }}
        style={{
          width: '100%',
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      />
    </div>
  );
}
```

### Fixed Position Hero Animation

```tsx
import { ScrollFlipBook } from 'react-scroll-flip-book';

function HeroSection() {
  const heroFrames = Array.from({ length: 90 }, (_, i) => ({
    avif: `/hero/frame-${String(i).padStart(3, '0')}.avif`,
    webp: `/hero/frame-${String(i).padStart(3, '0')}.webp`,
    jpg: `/hero/frame-${String(i).padStart(3, '0')}.jpg`,
  }));

  return (
    <div style={{ height: '200vh' }}>
      <ScrollFlipBook
        defaultSource={{ framePaths: heroFrames }}
        positionFixed={true}
        animationStartPosition="window-top"
        animationEndPosition="window-bottom"
        style={{
          width: '100%',
          height: '100vh',
          zIndex: -1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1>Your content here</h1>
      </div>
    </div>
  );
}
```

### Responsive Frame Sets

```tsx
import { ScrollFlipBook } from 'react-scroll-flip-book';

function ResponsiveFlipbook() {
  // Mobile frames (smaller, fewer frames)
  const mobileFrames = Array.from({ length: 60 }, (_, i) => ({
    webp: `/mobile/frame-${String(i).padStart(3, '0')}.webp`,
    jpg: `/mobile/frame-${String(i).padStart(3, '0')}.jpg`,
  }));

  // Desktop frames (larger, more frames)
  const desktopFrames = Array.from({ length: 120 }, (_, i) => ({
    avif: `/desktop/frame-${String(i).padStart(4, '0')}.avif`,
    webp: `/desktop/frame-${String(i).padStart(4, '0')}.webp`,
    jpg: `/desktop/frame-${String(i).padStart(4, '0')}.jpg`,
  }));

  return (
    <div style={{ height: '400vh' }}>
      <ScrollFlipBook
        defaultSource={{ framePaths: mobileFrames }}
        sources={[
          {
            breakPoint: 768, // Apply desktop frames on tablets and up
            framePaths: desktopFrames,
          },
        ]}
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
}
```

### With Preloading and Callbacks

```tsx
import { useState } from 'react';
import { ScrollFlipBook } from 'react-scroll-flip-book';

function FlipbookWithLoading() {
  const [loading, setLoading] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);

  const frames = Array.from({ length: 100 }, (_, i) => ({
    webp: `/frames/frame-${String(i).padStart(4, '0')}.webp`,
  }));

  return (
    <div style={{ height: '300vh' }}>
      {loading && <div>Loading animation...</div>}

      <ScrollFlipBook
        defaultSource={{ framePaths: frames }}
        preLoadingSize={10} // Preload 10 frames ahead
        onPreloadImages={() => setLoading(false)}
        onUpdateImage={({ index, progress }) => {
          setCurrentFrame(index);
          console.log(`Frame ${index} (${(progress * 100).toFixed(1)}%)`);
        }}
        style={{ width: '100%', height: '100vh' }}
      />

      <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
        Frame: {currentFrame} / {frames.length - 1}
      </div>
    </div>
  );
}
```

### Custom Canvas Size

```tsx
import { ScrollFlipBook } from 'react-scroll-flip-book';

function HighQualityFlipbook() {
  const frames = Array.from({ length: 150 }, (_, i) => ({
    webp: `/frames/frame-${String(i).padStart(4, '0')}.webp`,
  }));

  return (
    <div style={{ height: '400vh' }}>
      <ScrollFlipBook
        defaultSource={{ framePaths: frames }}
        canvasSize={{ width: 3840, height: 2160 }} // 4K buffer for high DPI displays
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
}
```

## How It Works

### Internal Flow

1. **Scroll Progress Detection**
   - Uses `useWindowScrollInElement` hook internally
   - Tracks scroll progress as a fraction (0.0 to 1.0)
   - Only updates when element is in viewport (`disableValueChangesOffscreen: true`)

2. **Frame Index Calculation**
   - Converts scroll fraction to frame index: `Math.ceil(fraction.top * frameCount)`
   - Clamps to valid range: `0` to `frameCount - 1`

3. **Image Format Selection**
   - Detects browser support for AVIF, WebP, JPG, PNG
   - Selects best supported format from available frame paths
   - Uses `supportsEncode` utility (tests via Image loading)

4. **Image Loading & Caching**
   - `useImageLoader` hook manages image cache
   - Loads images on demand
   - Preloads ahead based on `preLoadingSize`
   - When element enters viewport, preloads all remaining frames

5. **Canvas Rendering**
   - Uses HTML5 Canvas API
   - Calculates cover rectangle (object-fit: cover equivalent)
   - Handles high DPI displays via `calcCanvasScale`
   - Draws image using `drawImage()` API

### Usage Notes

- **Scrollable container**: The component's wrapper is `height: 100%`, so provide a scrollable container with enough height (e.g., `200vh`, `300vh`) to drive the animation. The component maps that scroll distance to frames rather than creating scroll space itself.
- **Canvas size vs CSS size**: `canvasSize` is the **drawing buffer size**, not the CSS display size. The canvas is automatically scaled to its CSS dimensions via `calcCanvasScale`, so larger buffers give sharper output on high-DPI displays at the cost of memory.
- **Frame path format**: Provide multiple formats per frame for the widest browser coverage; the best supported one is selected automatically.

## Performance Considerations

### Preloading Strategy

- **Without `preLoadingSize`**: All frames load immediately (good for small animations)
- **With `preLoadingSize`**: Loads frames incrementally (better for large animations)
- **When visible**: Automatically preloads all remaining frames for smooth playback

### Throttling

- Scroll events are throttled to 30ms internally
- Image preloading is throttled to 480ms to avoid performance issues
- Uses `just-throttle` library for efficient throttling

### Memory Management

- Images are cached in memory after first load
- Consider frame count and image sizes when planning animations
- Use responsive `sources` to serve smaller frames on mobile devices

## Browser Support

- React 16.8+ (requires Hooks)
- Modern browsers with Canvas API support
- Image format support detection (AVIF, WebP, JPG, PNG)

## TypeScript

This package includes TypeScript definitions and exports:

```typescript
import {
  ScrollFlipBook,
  ScrollFlipBookProps,
  ENCODES,
  Encode
} from 'react-scroll-flip-book';

// Use exported types
const props: ScrollFlipBookProps = { ... };

// Available encode types
const encodes: Encode[] = ['avif', 'webp', 'jpg', 'png'];
```

## Dependencies

- [`use-window-scroll-in-element`](https://www.npmjs.com/package/use-window-scroll-in-element) - Scroll position tracking
- [`@seznam/compose-react-refs`](https://www.npmjs.com/package/@seznam/compose-react-refs) - Ref composition
- [`just-throttle`](https://www.npmjs.com/package/just-throttle) - Event throttling

## Related Packages

- **[use-window-scroll-in-element](https://www.npmjs.com/package/use-window-scroll-in-element)** - The underlying hook used for scroll tracking

## Demo & Documentation

- **[Live Demo](https://react-scroll-pkgs.vercel.app/)** - Interactive examples and visualizations
- **[GitHub Repository](https://github.com/kubo-hide-kun/react-scroll-pkgs)** - Source code and issues

## License

MIT © [kubo-hide-kun](https://github.com/kubo-hide-kun)

## Contributing

Contributions are welcome! Please see the [GitHub repository](https://github.com/kubo-hide-kun/react-scroll-pkgs) for contribution guidelines.
