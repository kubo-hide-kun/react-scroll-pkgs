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
    </_Wrapper>
  );
};
