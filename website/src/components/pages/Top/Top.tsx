import React from 'react';
import styled from 'styled-components';

import { WhiteSpace } from './internal/WhiteSpace';

const _Container = styled.div`
  width: 100%;
  background: red;
`;

const _FirstView = styled.div`
  width: 100%;
  height: 200vh;
`;

export const Top = () => {
  return (
    <_Container>
      <_FirstView>Hello World</_FirstView>
      <WhiteSpace />
    </_Container>
  );
};
