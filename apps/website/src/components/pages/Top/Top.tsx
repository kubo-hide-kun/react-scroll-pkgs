import NextHead from 'next/head';
import React from 'react';
import { ScrollFlipBookProps } from 'react-scroll-flip-book';
import styled from 'styled-components';

import { CodeBlock } from './internal/CodeBlock';
import { Contents } from './internal/Contents';
import { FirsView } from './internal/FirstView';
import { WelcomeCard } from './internal/WelcomeCard';
import { WhiteSpace } from './internal/WhiteSpace';

const _Container = styled.div`
  width: 100%;
  background: red;
`;

const EXAMPLE_SCRIPT = `// Language: typescript
// Path: apps/website/src/components/pages/Top/internal/CodeBlock.tsx
// Compare this snippet from apps/website/src/pages/_document.tsx:
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import styled from 'styled-components';
`;

export type Props = {
  framePaths: ScrollFlipBookProps['defaultSource']['framePaths'];
};

export const Top = ({ framePaths }: Props) => {
  return (
    <>
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
      <_Container>
        <FirsView framePaths={framePaths} />
        <WelcomeCard />
        <Contents />
        <WhiteSpace>
          <CodeBlock script={EXAMPLE_SCRIPT} />
        </WhiteSpace>
      </_Container>
    </>
  );
};
