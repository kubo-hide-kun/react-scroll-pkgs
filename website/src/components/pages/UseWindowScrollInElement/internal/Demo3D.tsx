import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

const _ScrollingArea = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 800vh;
  flex-direction: column;
  align-items: center;
`;

const _Container = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  perspective: 500px;
`;

const _ContentsAnimation = keyframes`
  0% {
    transform: rotateY(30deg);
  }
  100% {
    transform: rotateY(-30deg);
  }
`;

const _Contents = styled.div`
  transform-style: preserve-3d;
  animation: ${_ContentsAnimation} 10s ease-in-out infinite alternate;
`;

const _Front = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 500px;
  transform: rotateY(0deg) translate3D(-50%, -50%, 75px);
`;

const _Back = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 500px;
  background-color: orange;
  transform: rotateY(0deg) translate3D(-50%, -50%, 0);
`;

const _WindowCard = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 16 / 9;
  color: white;
  font-weight: bold;
  background-color: rgba(0, 0, 255, 0.65);
  border: 2px solid blue;
  opacity: 0.85;
`;

const _ShadowCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: brown;
`;

export const Demo3D = () => {
  const areaRef = useRef<HTMLDivElement>(null);
  const { fraction } = useWindowScrollInElement(areaRef, {
    scrollStartPosition: 'window-top',
    scrollEndPosition: 'window-top',
  });

  return (
    <_ScrollingArea ref={areaRef}>
      <_Container>
        <_Contents>
          <_Front>
            <_WindowCard
              style={{
                top: `${fraction.top * 100}%`,
              }}
            >
              WINDOW
            </_WindowCard>
          </_Front>
          <_Back>
            <_ShadowCard
              style={{
                top: `${fraction.top * 100}%`,
              }}
            />
          </_Back>
        </_Contents>
      </_Container>
    </_ScrollingArea>
  );
};
