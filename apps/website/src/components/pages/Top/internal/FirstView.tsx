import React, { useRef } from 'react';
import { ScrollFlipBook } from 'react-scroll-flip-book';
import type { ScrollFlipBookProps } from 'react-scroll-flip-book';
import styled from 'styled-components';

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

const _ContentBox = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  height: 100vh;
`;

const _Title = styled.h1`
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
      </_Background>
      <_ContentBox>
        <_Title>react-scroll-flip-book & use-window-scroll-in-element</_Title>
      </_ContentBox>
    </_Wrapper>
  );
};
