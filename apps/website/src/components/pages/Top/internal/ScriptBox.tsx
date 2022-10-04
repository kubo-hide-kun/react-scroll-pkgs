import React, { useCallback } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import styled from 'styled-components';

const _ScriptBox = styled.div`
  width: 360px;
  padding: 0 20px;
  border-radius: 20px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: saturate(180%) blur(10px);
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.32);
  }
`;

const _Script = styled.p`
  font-size: 18px;
  color: #fff;
  :before {
    content: '$';
    padding-right: 6px;
    user-select: none;
  }
`;

const $Icon = styled(IoCopyOutline)`
  font-size: 24px;
  color: #fff;
`;

type Props = {
  script: string;
};

export const ScriptBox = ({ script }: Props) => {
  const copy = useCallback(() => {
    navigator.clipboard.writeText(script);
  }, [script]);

  return (
    <_ScriptBox onClick={copy}>
      <_Script>{script}</_Script>
      <$Icon />
    </_ScriptBox>
  );
};
