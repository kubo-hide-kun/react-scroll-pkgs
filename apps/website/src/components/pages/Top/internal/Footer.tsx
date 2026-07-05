import React from 'react';
import { IoLogoGithub, IoLogoNpm, IoOpenOutline } from 'react-icons/io5';
import styled from 'styled-components';

import { repoUrl, theme } from '../../../../constants/theme';
import { LinkButton } from './LinkButton';

const _Wrapper = styled.footer`
  position: relative;
  padding: 120px 24px 80px;
  border-top: 1px solid ${theme.color.surfaceBorder};
  background: linear-gradient(180deg, ${theme.color.bg} 0%, #070a12 100%);
`;

const _Inner = styled.div`
  max-width: ${theme.maxWidth};
  margin: 0 auto;
  text-align: center;
`;

const _Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -0.02em;
  background: ${theme.gradient.brand};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const _Lead = styled.p`
  max-width: 520px;
  margin: 18px auto 0;
  font-size: 18px;
  line-height: 1.6;
  color: ${theme.color.textMuted};
`;

const _Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-top: 34px;
`;

const _Meta = styled.p`
  margin-top: 64px;
  font-size: 14px;
  color: ${theme.color.textFaint};
`;

export const Footer = () => {
  return (
    <_Wrapper>
      <_Inner>
        <_Title>Build it yourself</_Title>
        <_Lead>
          Fork the repo, open it in an online editor, and start wiring the
          scrollbar to your UI in seconds.
        </_Lead>
        <_Buttons>
          <LinkButton
            href={`https://stackblitz.com/github/kubo-hide-kun/react-scroll-pkgs`}
          >
            <IoOpenOutline size={19} />
            Open on StackBlitz
          </LinkButton>
          <LinkButton
            href={`https://codesandbox.io/s/github/kubo-hide-kun/react-scroll-pkgs`}
            variant="secondary"
          >
            <IoOpenOutline size={19} />
            Open on CodeSandbox
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
        <_Meta>MIT Licensed · react-scroll-pkgs</_Meta>
      </_Inner>
    </_Wrapper>
  );
};
