import React, { useCallback, useState } from 'react';
import { IoCheckmark, IoCopyOutline } from 'react-icons/io5';
import styled from 'styled-components';

const _ScriptBox = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 0 20px;
  border-radius: 12px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  backdrop-filter: saturate(180%) blur(10px);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(126, 212, 253, 0.4);
  }
`;

const _Script = styled.p`
  font-size: 16px;
  font-family: 'SFMono-Regular', Menlo, Consolas, monospace;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  :before {
    content: '$';
    padding-right: 8px;
    color: rgba(126, 212, 253, 0.9);
    user-select: none;
  }
`;

const $Icon = styled(IoCopyOutline)`
  flex-shrink: 0;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
`;

const $Check = styled(IoCheckmark)`
  flex-shrink: 0;
  font-size: 20px;
  color: #17c964;
`;

type Props = {
  script: string;
};

export const ScriptBox = ({ script }: Props) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }, [script]);

  return (
    <_ScriptBox onClick={copy}>
      <_Script>{script}</_Script>
      {copied ? <$Check /> : <$Icon />}
    </_ScriptBox>
  );
};
