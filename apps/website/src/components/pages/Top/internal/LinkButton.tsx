import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { theme } from '../../../../constants/theme';

const baseStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 48px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 999px;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const _Primary = styled.a`
  ${baseStyle};
  color: #05060a;
  background: ${theme.gradient.accentLine};
  box-shadow: 0 10px 30px rgba(77, 120, 239, 0.35);

  &:hover {
    box-shadow: 0 14px 38px rgba(77, 120, 239, 0.5);
  }
`;

const _Secondary = styled.a`
  ${baseStyle};
  color: ${theme.color.text};
  background: ${theme.color.surface};
  border: 1px solid ${theme.color.surfaceBorder};

  &:hover {
    border-color: rgba(126, 212, 253, 0.5);
    background: rgba(255, 255, 255, 0.07);
  }
`;

type Props = {
  href: string;
  variant?: 'primary' | 'secondary';
  children: ReactNode;
};

export const LinkButton = ({ href, variant = 'primary', children }: Props) => {
  const external = href.startsWith('http');
  const rel = external ? 'noopener noreferrer' : undefined;
  const target = external ? '_blank' : undefined;

  return variant === 'primary' ? (
    <_Primary href={href} target={target} rel={rel}>
      {children}
    </_Primary>
  ) : (
    <_Secondary href={href} target={target} rel={rel}>
      {children}
    </_Secondary>
  );
};
