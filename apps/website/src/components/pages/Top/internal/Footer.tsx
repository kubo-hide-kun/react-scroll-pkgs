import React from 'react';
import { IoLogoGithub, IoLogoNpm, IoOpenOutline } from 'react-icons/io5';
import styled from 'styled-components';

import { repoUrl, theme } from '../../../../constants/theme';
import { useI18n } from '../../../../i18n';
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
  const { t } = useI18n();

  return (
    <_Wrapper>
      <_Inner>
        <_Title>{t.footer.title}</_Title>
        <_Lead>{t.footer.lead}</_Lead>
        <_Buttons>
          <LinkButton
            href={`https://stackblitz.com/github/kubo-hide-kun/react-scroll-pkgs`}
          >
            <IoOpenOutline size={19} />
            {t.footer.openOnStackBlitz}
          </LinkButton>
          <LinkButton
            href={`https://codesandbox.io/s/github/kubo-hide-kun/react-scroll-pkgs`}
            variant="secondary"
          >
            <IoOpenOutline size={19} />
            {t.footer.openOnCodeSandbox}
          </LinkButton>
          <LinkButton href={repoUrl} variant="secondary">
            <IoLogoGithub size={19} />
            {t.footer.github}
          </LinkButton>
          <LinkButton
            href="https://www.npmjs.com/package/react-scroll-flip-book"
            variant="secondary"
          >
            <IoLogoNpm size={22} />
            {t.footer.npm}
          </LinkButton>
        </_Buttons>
        <_Meta>{t.footer.meta}</_Meta>
      </_Inner>
    </_Wrapper>
  );
};
