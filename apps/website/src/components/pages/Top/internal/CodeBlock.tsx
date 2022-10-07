import Prism from 'prismjs';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import 'prismjs/components/prism-typescript';
import 'prism-themes/themes/prism-vsc-dark-plus.min.css';

const _Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-left: 0%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
`;

const _Pre = styled.pre`
  box-sizing: border-box;
  border-radius: 14px;
  overflow: auto;
  line-height: 21px;
  white-space: pre;
  position: relative;
  background-color: #1e1e1e;
  color: #f4f4f4;
  box-shadow: 0 12px 20px 6px rgb(0 0 0 / 0.08);
  padding: 20px;
  width: 100%;
`;

const _WindowActions = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 12px;
  z-index: 2;
  position: sticky;
  top: 0px;

  > :not(:last-child) {
    margin-right: 8px;
  }
`;

const _WindowAction = styled.span<{ background: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ background }) => background};
`;

const _CodeWrapper = styled.pre`
  width: calc(100% - 40px);
  overflow: scroll;
`;

export const CodeBlock = () => {
  // Init
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  // Usage
  return (
    <_Container>
      <_Pre>
        <_WindowActions>
          <_WindowAction background="#F31260" />
          <_WindowAction background="#F5A524" />
          <_WindowAction background="#17C964" />
        </_WindowActions>
        <_CodeWrapper>
          <code className="language-typescript">
            {`// Language: typescript
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
`}
          </code>
        </_CodeWrapper>
      </_Pre>
    </_Container>
  );
};
