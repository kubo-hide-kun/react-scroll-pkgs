import React, { useRef, ReactNode } from 'react';
import styled from 'styled-components';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

const _ScrollingArea = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 800vh;
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
  background: white;
`;

type Props = {
  children?: ReactNode;
};

export const WhiteSpace = ({ children }: Props) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const { fraction } = useWindowScrollInElement(areaRef, {
    scrollStartPosition: 'window-top',
    scrollEndPosition: 'window-bottom',
  });

  return (
    <_ScrollingArea ref={areaRef}>
      <_Background
        style={{
          borderRadius: `${Math.max(fraction.top - 0.8, 0)}px`,
          transform: `scale(${1 - Math.max(fraction.top - 0.8, 0)})`,
        }}
      >
        {children}
      </_Background>
    </_ScrollingArea>
  );
};
