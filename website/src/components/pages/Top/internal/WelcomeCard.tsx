import React, { useRef, useMemo } from 'react';
import styled from 'styled-components';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

import { useWindowSize } from '../../../../hooks/useWindowSize';

const _ScrollingArea = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 140vh;
  flex-direction: column;
  align-items: center;
`;

const _Background = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100vh;
`;

const _Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: red;
`;

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const EXPAND_POSITION = 0.4;
const SQUARE_SIZE_BASE = 0.7;

export const WelcomeCard = () => {
  const areaRef = useRef<HTMLDivElement>(null);
  const { fraction } = useWindowScrollInElement(areaRef, {
    scrollStartPosition: 'window-top',
    scrollEndPosition: 'window-bottom',
  });

  const { width, height } = useWindowSize();
  const windowAspectRatio = width / height;

  const { minSize, maxSize } = useMemo(() => {
    const _minSize =
      SQUARE_SIZE_BASE +
      clamp(fraction.top - EXPAND_POSITION, 0, 1) *
        ((1 - SQUARE_SIZE_BASE) / (1 - EXPAND_POSITION));

    const squareSize = SQUARE_SIZE_BASE / windowAspectRatio;
    const _maxSize =
      squareSize +
      (clamp(fraction.top - EXPAND_POSITION, 0, 1) * (1 - squareSize)) /
        (1 - EXPAND_POSITION);

    return { minSize: _minSize, maxSize: _maxSize };
  }, [fraction.top, windowAspectRatio]);

  return (
    <_ScrollingArea ref={areaRef}>
      <_Background>
        <_Box
          style={{
            borderRadius: `${16}px`,
            width: `${(windowAspectRatio < 1 ? minSize : maxSize) * 100}%`,
            height: `${(windowAspectRatio < 1 ? maxSize : minSize) * 100}%`,
          }}
        >
          TEST
        </_Box>
      </_Background>
    </_ScrollingArea>
  );
};
