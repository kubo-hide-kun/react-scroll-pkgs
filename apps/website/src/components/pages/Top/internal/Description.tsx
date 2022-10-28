import React from 'react';
import styled from 'styled-components';

const _Wrapper = styled.div`
  position: sticky;
`;

const _Title = styled.h1`
  font-size: 64px;
  text-shadow: 0 0 10px rgba(240, 255, 255, 0.2),
    0 0 20px rgba(0, 255, 255, 0.2), 0 0 40px rgba(30, 144, 255, 0.2),
    0 0 80px rgba(0, 0, 255, 0.2);
  background: radial-gradient(
    140% 1024% at 96% -2%,
    #7ed4fd 15%,
    #709df7 50%,
    #4d78ef 80%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const _Description = styled.p`
  padding-bottom: 24px;
  font-size: 24px;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.4),
    0 0 20px rgba(255, 255, 255, 0.35), 0 0 40px rgba(255, 144, 255, 0.3),
    0 0 80px rgba(0, 0, 255, 0.25);
`;

type Props = {
  title: string;
  description: string;
};

export const Description = ({ title, description }: Props) => {
  return (
    <_Wrapper>
      <_Title>{title}</_Title>
      <_Description>{description}</_Description>
    </_Wrapper>
  );
};
