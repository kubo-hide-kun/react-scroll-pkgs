import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { theme } from '../../../../constants/theme';

const _Section = styled.section`
  position: relative;
  width: 100%;
  padding: 120px 24px;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const _Inner = styled.div`
  width: 100%;
  max-width: ${theme.maxWidth};
  margin: 0 auto;
`;

const _Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.color.accent};
  background: rgba(126, 212, 253, 0.08);
  border: 1px solid rgba(126, 212, 253, 0.24);
  border-radius: 999px;
`;

const _Title = styled.h2`
  font-size: 44px;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
  background: ${theme.gradient.brand};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const _Lead = styled.p`
  max-width: 640px;
  margin-top: 18px;
  font-size: 19px;
  line-height: 1.65;
  color: ${theme.color.textMuted};

  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: ReactNode;
  children?: ReactNode;
};

export const Section = ({ id, eyebrow, title, lead, children }: Props) => {
  return (
    <_Section id={id}>
      <_Inner>
        {eyebrow && <_Eyebrow>{eyebrow}</_Eyebrow>}
        {title && <_Title>{title}</_Title>}
        {lead && <_Lead>{lead}</_Lead>}
        {children}
      </_Inner>
    </_Section>
  );
};
