import React from 'react';
import styled from 'styled-components';

import { theme } from '../../../../constants/theme';

const _Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const _Card = styled.div`
  padding: 24px;
  border-radius: ${theme.radius.md};
  background: ${theme.color.surface};
  border: 1px solid ${theme.color.surfaceBorder};
`;

const _Icon = styled.div`
  font-size: 24px;
  margin-bottom: 12px;
`;

const _Title = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${theme.color.text};
`;

const _Body = styled.p`
  margin-top: 8px;
  font-size: 15px;
  line-height: 1.55;
  color: ${theme.color.textMuted};
`;

export type Feature = {
  icon: string;
  title: string;
  body: string;
};

export const FeatureCards = ({ items }: { items: Feature[] }) => {
  return (
    <_Grid>
      {items.map((f) => (
        <_Card key={f.title}>
          <_Icon>{f.icon}</_Icon>
          <_Title>{f.title}</_Title>
          <_Body>{f.body}</_Body>
        </_Card>
      ))}
    </_Grid>
  );
};
