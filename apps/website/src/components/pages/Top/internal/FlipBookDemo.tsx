import React, { useState } from 'react';
import { ScrollFlipBook } from 'react-scroll-flip-book';
import type { ScrollFlipBookProps } from 'react-scroll-flip-book';
import styled from 'styled-components';

import { theme } from '../../../../constants/theme';

const _Area = styled.div`
  position: relative;
  width: 100%;
  height: 320vh;
`;

const _Background = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const _Scrim = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(5, 6, 10, 0.55) 0%,
    rgba(5, 6, 10, 0) 28%,
    rgba(5, 6, 10, 0) 60%,
    rgba(5, 6, 10, 0.85) 100%
  );
`;

const _Overlay = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 48px 40px;
  pointer-events: none;

  @media (max-width: 768px) {
    padding: 32px 22px;
  }
`;

const _TopRow = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

const _Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  color: ${theme.color.text};
  background: rgba(5, 6, 10, 0.55);
  border: 1px solid ${theme.color.surfaceBorder};
  border-radius: 999px;
  backdrop-filter: blur(8px);
`;

const _Pulse = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${theme.color.accent};
  box-shadow: 0 0 12px ${theme.color.accent};
`;

const _Counter = styled.div`
  font-variant-numeric: tabular-nums;
  font-size: 15px;
  font-weight: 600;
  color: ${theme.color.text};
  background: rgba(5, 6, 10, 0.55);
  border: 1px solid ${theme.color.surfaceBorder};
  border-radius: 999px;
  padding: 10px 18px;
  backdrop-filter: blur(8px);

  span {
    color: ${theme.color.accent};
  }
`;

const _Bottom = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const _Caption = styled.p`
  max-width: 520px;
  font-size: 22px;
  line-height: 1.5;
  font-weight: 600;
  color: ${theme.color.text};
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.6);

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const _Track = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  overflow: hidden;
`;

const _Fill = styled.div`
  height: 100%;
  background: ${theme.gradient.accentLine};
`;

type Props = {
  framePaths: ScrollFlipBookProps['defaultSource']['framePaths'];
};

export const FlipBookDemo = ({ framePaths }: Props) => {
  const total = framePaths.length;
  const [frame, setFrame] = useState({ index: 0, progress: 0 });

  return (
    <_Area>
      <_Background>
        <ScrollFlipBook
          defaultSource={{ framePaths }}
          animationStartPosition="window-bottom"
          animationEndPosition="window-top"
          background={
            framePaths[0]?.jpg ? `url(${framePaths[0].jpg})` : '#05060a'
          }
          onUpdateImage={setFrame}
        />
      </_Background>
      <_Overlay>
        <_Scrim />
        <_TopRow>
          <_Badge>
            <_Pulse />
            react-scroll-flip-book
          </_Badge>
          <_Counter>
            frame <span>{String(frame.index + 1).padStart(3, '0')}</span> /{' '}
            {total}
          </_Counter>
        </_TopRow>
        <_Bottom>
          <_Caption>
            Keep scrolling — every frame is drawn to a canvas in sync with the
            scrollbar. No video, no timeline. Just images.
          </_Caption>
          <_Track>
            <_Fill style={{ width: `${frame.progress * 100}%` }} />
          </_Track>
        </_Bottom>
      </_Overlay>
    </_Area>
  );
};
