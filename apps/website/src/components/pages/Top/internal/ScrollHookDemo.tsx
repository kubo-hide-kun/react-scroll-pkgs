import React, { useRef } from 'react';
import styled from 'styled-components';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

import { theme } from '../../../../constants/theme';
import { CodeBlock } from './CodeBlock';

const DEMO_CODE = `import { useRef } from 'react';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

function Showcase() {
  const ref = useRef(null);

  // fraction.top goes from 0 -> 1 as the element
  // scrolls through the viewport.
  const { fraction } = useWindowScrollInElement(ref, {
    scrollStartPosition: 'window-bottom',
    scrollEndPosition: 'window-top',
  });

  const p = fraction.top; // 0 .. 1

  return (
    <div ref={ref}>
      {/* progress bar */}
      <div style={{ width: \`\${p * 100}%\` }} />

      {/* fade + rise in */}
      <div style={{
        opacity: p,
        transform: \`translateY(\${(1 - p) * 40}px)\`,
      }} />

      {/* parallax layers */}
      <div style={{ transform: \`translateY(\${p * -80}px)\` }} />
    </div>
  );
}`;

const _Area = styled.div`
  position: relative;
  width: 100%;
  height: 320vh;
`;

const _Sticky = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding: 48px 0;
`;

const _Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  width: 100%;
  max-width: ${theme.maxWidth};
  margin: 0 auto;
  padding: 0 24px;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const _Panel = styled.div`
  position: relative;
  overflow: hidden;
  padding: 32px;
  border-radius: ${theme.radius.lg};
  background: linear-gradient(
    160deg,
    rgba(126, 212, 253, 0.08),
    rgba(77, 120, 239, 0.05)
  );
  border: 1px solid ${theme.color.surfaceBorder};
`;

const _PanelLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${theme.color.textFaint};
  margin-bottom: 6px;
`;

const _Row = styled.div`
  margin-bottom: 28px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const _ProgressTrack = styled.div`
  position: relative;
  width: 100%;
  height: 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
`;

const _ProgressFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: ${theme.gradient.accentLine};
`;

const _Percent = styled.div`
  margin-top: 10px;
  font-size: 30px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${theme.color.text};
`;

const _FadeCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 96px;
  border-radius: ${theme.radius.md};
  font-size: 20px;
  font-weight: 700;
  color: ${theme.color.text};
  background: ${theme.gradient.brand};
`;

const _ParallaxStage = styled.div`
  position: relative;
  height: 150px;
  border-radius: ${theme.radius.md};
  background: rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const _Layer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  will-change: transform;
`;

const _Dot = styled.span<{ size: number; color: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background: ${({ color }) => color};
  filter: blur(1px);
  opacity: 0.9;
`;

const _Readout = styled.div`
  display: flex;
  gap: 24px;
  font-variant-numeric: tabular-nums;
  font-size: 14px;
  color: ${theme.color.textMuted};

  b {
    display: block;
    font-size: 22px;
    color: ${theme.color.text};
  }
`;

const _CodeCol = styled.div`
  min-width: 0;
`;

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

export const ScrollHookDemo = () => {
  const areaRef = useRef<HTMLDivElement>(null);
  const { position, fraction } = useWindowScrollInElement(areaRef, {
    scrollStartPosition: 'window-bottom',
    scrollEndPosition: 'window-top',
  });

  const p = clamp01(fraction.top);

  return (
    <_Area ref={areaRef}>
      <_Sticky>
        <_Grid>
          <_Panel>
            <_Row>
              <_PanelLabel>fraction.top → width</_PanelLabel>
              <_ProgressTrack>
                <_ProgressFill style={{ width: `${p * 100}%` }} />
              </_ProgressTrack>
              <_Percent>{(p * 100).toFixed(0)}%</_Percent>
            </_Row>

            <_Row>
              <_PanelLabel>fraction.top → opacity + translateY</_PanelLabel>
              <_FadeCard
                style={{
                  opacity: p,
                  transform: `translateY(${(1 - p) * 40}px)`,
                }}
              >
                Fade &amp; Rise
              </_FadeCard>
            </_Row>

            <_Row>
              <_PanelLabel>fraction.top → parallax translateY</_PanelLabel>
              <_ParallaxStage>
                <_Layer
                  style={{ top: 90, transform: `translateY(${p * -30}px)` }}
                >
                  <_Dot size={22} color="rgba(77,120,239,0.6)" />
                  <_Dot size={30} color="rgba(112,157,247,0.5)" />
                  <_Dot size={18} color="rgba(77,120,239,0.55)" />
                </_Layer>
                <_Layer
                  style={{ top: 60, transform: `translateY(${p * -70}px)` }}
                >
                  <_Dot size={16} color="rgba(126,212,253,0.75)" />
                  <_Dot size={24} color="rgba(112,157,247,0.8)" />
                  <_Dot size={14} color="rgba(126,212,253,0.7)" />
                </_Layer>
                <_Layer
                  style={{ top: 40, transform: `translateY(${p * -120}px)` }}
                >
                  <_Dot size={10} color="rgba(255,255,255,0.9)" />
                  <_Dot size={12} color="rgba(126,212,253,0.95)" />
                  <_Dot size={9} color="rgba(255,255,255,0.85)" />
                </_Layer>
              </_ParallaxStage>
            </_Row>

            <_Readout>
              <div>
                position.top
                <b>{Math.round(position.top)}px</b>
              </div>
              <div>
                fraction.top
                <b>{p.toFixed(3)}</b>
              </div>
            </_Readout>
          </_Panel>

          <_CodeCol>
            <CodeBlock script={DEMO_CODE} />
          </_CodeCol>
        </_Grid>
      </_Sticky>
    </_Area>
  );
};
