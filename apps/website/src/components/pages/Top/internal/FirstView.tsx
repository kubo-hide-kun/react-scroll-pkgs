import React, { useRef } from 'react';
import { ScrollFlipBook } from 'react-scroll-flip-book';
import type { ScrollFlipBookProps } from 'react-scroll-flip-book';
import styled from 'styled-components';

import { ScriptBox } from './ScriptBox';

const _Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200vh;
`;

const _Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const _ContentWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const _Certain = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

const _Content = styled.div`
  padding: 0 96px;
`;

const _Title = styled.h1`
  font-size: 64px;
  text-shadow: 0 0 10px rgba(240, 255, 255, 0.2),
    0 0 20px rgba(0, 255, 255, 0.2), 0 0 40px rgba(30, 144, 255, 0.2),
    0 0 80px rgba(0, 0, 255, 0.2);
  background: radial-gradient(
    140% 1024% at 96% -2%,
    #7ed4fd 15%,
    #709df7 50%,
    #4d78ef 80%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const _Description = styled.p`
  padding-bottom: 24px;
  font-size: 24px;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.4),
    0 0 20px rgba(255, 255, 255, 0.35), 0 0 40px rgba(255, 144, 255, 0.3),
    0 0 80px rgba(0, 0, 255, 0.25);
`;

type Props = {
  framePaths: ScrollFlipBookProps['defaultSource']['framePaths'];
};

export const FirsView = ({ framePaths }: Props) => {
  const areaRef = useRef<HTMLDivElement>(null);

  return (
    <_Wrapper ref={areaRef}>
      <_Background>
        <ScrollFlipBook
          defaultSource={{ framePaths }}
          animationStartPosition="window-top"
          animationEndPosition="window-top"
          positionFixed
          background={
            framePaths[0]?.jpg ? `url(${framePaths[0].jpg})` : 'transparent'
          }
        />
        <_Certain />
      </_Background>
      <_ContentWrapper>
        <_Content>
          <_Title>react-scroll-pkgs</_Title>
          <_Description>
            Provides scroll-linked React UI libraries .
          </_Description>
          <ScriptBox script="npm i react-scroll-flip-book" />
        </_Content>
      </_ContentWrapper>
    </_Wrapper>
  );
};
