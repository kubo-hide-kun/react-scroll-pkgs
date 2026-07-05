import NextHead from 'next/head';
import React from 'react';
import { ScrollFlipBookProps } from 'react-scroll-flip-book';
import styled from 'styled-components';

import { Seo } from '../../common/Seo';
import { theme } from '../../../constants/theme';
import { useI18n } from '../../../i18n';
import { homeStructuredData } from '../../../utils/structuredData';
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
  const { t } = useI18n();

  return (
    <>
      <Seo path="/" structuredData={homeStructuredData()} />
      <NextHead>
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
          eyebrow={t.hookSection.eyebrow}
          title="use-window-scroll-in-element"
          lead={t.hookSection.lead}
        >
          <FeatureCards items={t.hookSection.features} />
          <_Install>
            <ScriptBox script="npm i use-window-scroll-in-element" />
          </_Install>
        </Section>

        <ScrollHookDemo />

        <Section
          id="react-scroll-flip-book"
          eyebrow={t.flipbookSection.eyebrow}
          title="react-scroll-flip-book"
          lead={t.flipbookSection.lead}
        >
          <FeatureCards items={t.flipbookSection.features} />
          <_Install>
            <ScriptBox script="npm i react-scroll-flip-book" />
          </_Install>
        </Section>

        <FlipBookDemo framePaths={framePaths} />

        <Section
          eyebrow={t.codeSection.eyebrow}
          title={t.codeSection.title}
          lead={t.codeSection.lead}
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
