import React from 'react';
import { IoLogoGithub, IoLogoNpm } from 'react-icons/io5';
import { ScrollFlipBook } from 'react-scroll-flip-book';
import type { ScrollFlipBookProps } from 'react-scroll-flip-book';
import styled, { keyframes } from 'styled-components';

import { repoUrl, theme } from '../../../../constants/theme';
import { LinkButton } from './LinkButton';
import { ScriptBox } from './ScriptBox';

const _Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200vh;
`;

const _Background = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const _Scrim = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      120% 90% at 20% 30%,
      rgba(5, 6, 10, 0.75) 0%,
      rgba(5, 6, 10, 0.35) 55%,
      rgba(5, 6, 10, 0.7) 100%
    ),
    linear-gradient(180deg, rgba(5, 6, 10, 0.4) 0%, rgba(5, 6, 10, 0.85) 100%);
`;

const _ContentWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const _Content = styled.div`
  position: relative;
  width: 100%;
  max-width: ${theme.maxWidth};
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

const _Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: ${theme.color.accent};
  background: rgba(126, 212, 253, 0.08);
  border: 1px solid rgba(126, 212, 253, 0.24);
  border-radius: 999px;
`;

const _Title = styled.h1`
  font-size: 76px;
  line-height: 1.02;
  font-weight: 800;
  letter-spacing: -0.03em;
  text-shadow: 0 0 40px rgba(0, 128, 255, 0.25);
  background: ${theme.gradient.brand};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 46px;
  }
`;

const _Description = styled.p`
  max-width: 560px;
  margin-top: 22px;
  font-size: 24px;
  line-height: 1.5;
  color: ${theme.color.text};
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.6);

  @media (max-width: 768px) {
    font-size: 19px;
  }
`;

const _Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin: 34px 0 30px;
`;

const _ScriptWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

const bounce = keyframes`
  0%, 100% { transform: translate(-50%, 0); opacity: 0.7; }
  50% { transform: translate(-50%, 10px); opacity: 1; }
`;

const _ScrollHint = styled.div`
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.color.textFaint};
  animation: ${bounce} 1.8s ease-in-out infinite;

  &::after {
    content: '';
    width: 1px;
    height: 34px;
    background: linear-gradient(
      to bottom,
      ${theme.color.textFaint},
      transparent
    );
  }
`;

type Props = {
  framePaths: ScrollFlipBookProps['defaultSource']['framePaths'];
};

export const FirsView = ({ framePaths }: Props) => {
  return (
    <_Wrapper id="top">
      <_Background>
        <ScrollFlipBook
          defaultSource={{ framePaths }}
          animationStartPosition="window-top"
          animationEndPosition="window-top"
          background={
            framePaths[0]?.jpg ? `url(${framePaths[0].jpg})` : '#05060a'
          }
        />
      </_Background>
      <_ContentWrapper>
        <_Scrim />
        <_Content>
          <_Tag>Scroll-linked React UI libraries</_Tag>
          <_Title>react-scroll-pkgs</_Title>
          <_Description>
            Turn the scrollbar into an animation timeline. Two tiny, zero-config
            packages for building Apple-style scroll experiences in React.
          </_Description>
          <_Buttons>
            <LinkButton href="#react-scroll-flip-book">
              See it in action
            </LinkButton>
            <LinkButton href={repoUrl} variant="secondary">
              <IoLogoGithub size={19} />
              GitHub
            </LinkButton>
            <LinkButton
              href="https://www.npmjs.com/package/react-scroll-flip-book"
              variant="secondary"
            >
              <IoLogoNpm size={22} />
              npm
            </LinkButton>
          </_Buttons>
          <_ScriptWrapper>
            <ScriptBox script="npm i react-scroll-flip-book" />
            <ScriptBox script="npm i use-window-scroll-in-element" />
          </_ScriptWrapper>
        </_Content>
        <_ScrollHint>Scroll</_ScrollHint>
      </_ContentWrapper>
    </_Wrapper>
  );
};
