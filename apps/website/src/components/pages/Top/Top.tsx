import NextHead from 'next/head';
import React from 'react';
import { ScrollFlipBookProps } from 'react-scroll-flip-book';
import styled from 'styled-components';

import { theme } from '../../../constants/theme';
import { CodeBlock } from './internal/CodeBlock';
import { FeatureCards } from './internal/FeatureCards';
import { FirsView } from './internal/FirstView';
import { FlipBookDemo } from './internal/FlipBookDemo';
import { Footer } from './internal/Footer';
import { Nav } from './internal/Nav';
import { ScriptBox } from './internal/ScriptBox';
import { ScrollHookDemo } from './internal/ScrollHookDemo';
import { Section } from './internal/Section';

const FLIPBOOK_CODE = `import { ScrollFlipBook } from 'react-scroll-flip-book';

// Point it at a folder of numbered frames.
const frames = Array.from({ length: 162 }, (_, i) => {
  const n = String(i + 1).padStart(3, '0');
  return { avif: \`/frames/\${n}.avif\`, jpg: \`/frames/\${n}.jpg\` };
});

export function Hero() {
  return (
    // The taller the wrapper, the slower the flip.
    <div style={{ height: '320vh' }}>
      <ScrollFlipBook
        defaultSource={{ framePaths: frames }}
        animationStartPosition="window-bottom"
        animationEndPosition="window-top"
        positionFixed
      />
    </div>
  );
}`;

const _Container = styled.div`
  width: 100%;
  background: ${theme.color.bg};
`;

const _Install = styled.div`
  margin-top: 34px;
`;

const _CodeWrap = styled.div`
  margin-top: 40px;
`;

export type Props = {
  framePaths: ScrollFlipBookProps['defaultSource']['framePaths'];
};

export const Top = ({ framePaths }: Props) => {
  return (
    <>
      <NextHead>
        <title>react-scroll-pkgs — Scroll-linked React UI libraries</title>
        <meta
          name="description"
          content="Turn the scrollbar into an animation timeline. Two tiny, zero-config React packages: use-window-scroll-in-element and react-scroll-flip-book."
        />
        {framePaths.slice(0, 20).map((framePath) => (
          <React.Fragment key={framePath.jpg}>
            <link
              rel="preload"
              href={framePath.avif}
              as="image"
              type="image/avif"
            />
          </React.Fragment>
        ))}
      </NextHead>
      <Nav />
      <_Container>
        <FirsView framePaths={framePaths} />

        <Section
          id="use-window-scroll-in-element"
          eyebrow="Package 01 · The hook"
          title="use-window-scroll-in-element"
          lead="A primitive hook that reports exactly where the viewport sits inside any element — as raw pixels and as a 0 → 1 fraction. Bind that one number to width, opacity, transform… anything."
        >
          <FeatureCards
            items={[
              {
                icon: '📐',
                title: 'px & fraction',
                body: 'Get both the pixel offset and a normalized 0–1 progress value for the top and bottom edges.',
              },
              {
                icon: '🎚️',
                title: 'Start / end anchors',
                body: 'Choose whether tracking begins and ends at the window top, center, or bottom.',
              },
              {
                icon: '🪶',
                title: 'Zero dependencies',
                body: 'A tiny throttled scroll listener. No context, no providers, no CSS to import.',
              },
            ]}
          />
          <_Install>
            <ScriptBox script="npm i use-window-scroll-in-element" />
          </_Install>
        </Section>

        <ScrollHookDemo />

        <Section
          id="react-scroll-flip-book"
          eyebrow="Package 02 · The component"
          title="react-scroll-flip-book"
          lead="Feed it a sequence of images and it draws one frame per scroll step to a canvas — preloading, scaling and cover-fitting for you. Scroll through the section below to flip all 162 frames."
        >
          <FeatureCards
            items={[
              {
                icon: '🎞️',
                title: 'Canvas rendering',
                body: 'Frames are painted to a single canvas, so playback stays smooth even with hundreds of images.',
              },
              {
                icon: '⚡',
                title: 'Smart preloading',
                body: 'Loads frames just ahead of the scroll and supports avif / webp / jpg per encode.',
              },
              {
                icon: '📱',
                title: 'Responsive sources',
                body: 'Swap frame sets at breakpoints so mobile and desktop each get the right assets.',
              },
            ]}
          />
          <_Install>
            <ScriptBox script="npm i react-scroll-flip-book" />
          </_Install>
        </Section>

        <FlipBookDemo framePaths={framePaths} />

        <Section
          eyebrow="Preview → Code"
          title="That was ~10 lines"
          lead="Everything you just scrolled through is driven by the snippet below. The height of the wrapper controls how much scrolling it takes to play; positionFixed pins the canvas while it plays."
        >
          <_CodeWrap>
            <CodeBlock script={FLIPBOOK_CODE} />
          </_CodeWrap>
        </Section>

        <Footer />
      </_Container>
    </>
  );
};
