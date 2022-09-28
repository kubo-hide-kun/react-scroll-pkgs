import React from 'react';
import styled from 'styled-components';

const _ScriptBox = styled.div`
  width: 320px;
  padding: 0 20px;
  border-radius: 18px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: saturate(180%) blur(10px);
  background: rgba(255, 255, 255, 0.1); ;
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

type Props = {
  script: string;
};

export const ScriptBox = ({ script }: Props) => {
  return (
    <_ScriptBox>
      <_Script>{script}</_Script>
    </_ScriptBox>
  );
};
