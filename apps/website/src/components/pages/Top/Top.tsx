import NextHead from 'next/head';
import React from 'react';
import { ScrollFlipBookProps } from 'react-scroll-flip-book';
import styled from 'styled-components';

import { CodeBlock } from './internal/CodeBlock';
import { FirsView } from './internal/FirstView';
import { WelcomeCard } from './internal/WelcomeCard';
import { WhiteSpace } from './internal/WhiteSpace';

const _Container = styled.div`
  width: 100%;
  background: red;
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
        <WhiteSpace>
          <CodeBlock />
        </WhiteSpace>
      </_Container>
    </>
  );
};
