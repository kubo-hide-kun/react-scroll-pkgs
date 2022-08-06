import React from 'react';
import styled, { keyframes } from 'styled-components';
// import { useWindowScrollInElement } from 'use-window-scroll-in-element';

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
    transform: rotateY(60deg);
  }
  100% {
    transform: rotateY(-60deg);
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
  background-color: #f00;
  transform: rotateY(0deg) translate3D(-50%, -50%, 100px);
`;

const _Back = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 500px;
  background-color: #00f;
  transform: rotateY(0deg) translate3D(-50%, -50%, 0);
`;

export const Demo3D = () => {
  return (
    <_ScrollingArea>
      <_Container>
        <_Contents>
          <_Front />
          <_Back />
        </_Contents>
      </_Container>
    </_ScrollingArea>
  );
};
