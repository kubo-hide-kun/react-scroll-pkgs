import Prism from 'prismjs';
import React, { useCallback, useEffect } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
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

const _Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 12px;
  z-index: 2;
  position: sticky;
  top: 0px;
`;

const _WindowActions = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;

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

const _IconWrapper = styled.div`
  font-size: 24px;
  color: #aaa;
  cursor: pointer;
  > :hover {
    opacity: #fff;
  }
`;

const _CodeWrapper = styled.pre`
  width: calc(100% - 40px);
  overflow: scroll;
`;

type Props = {
  script: string;
};

export const CodeBlock = ({ script }: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(script);
  }, [script]);

  // Usage
  return (
    <_Container>
      <_Pre>
        <_Header>
          <_WindowActions>
            <_WindowAction background="#F31260" />
            <_WindowAction background="#F5A524" />
            <_WindowAction background="#17C964" />
          </_WindowActions>
          <_IconWrapper onClick={copy}>
            <IoCopyOutline />
          </_IconWrapper>
        </_Header>
        <_CodeWrapper>
          <code className="language-typescript">{script}</code>
        </_CodeWrapper>
      </_Pre>
    </_Container>
  );
};
