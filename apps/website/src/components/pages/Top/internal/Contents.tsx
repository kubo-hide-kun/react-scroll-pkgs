import React from 'react';
import styled from 'styled-components';

import { Demo3D } from './Demo3D';
import { Description } from './Description';

const _Wrapper = styled.div`
  position: relative;
`;

const _Content = styled.div`
  display: flex;
`;

export const Contents = () => {
  return (
    <_Wrapper>
      <_Content>
        <Description title="use-window-scroll-in-element" description="XXX" />
        <Demo3D />
      </_Content>
      <_Content>
        <Description title="react-scroll-flip-book" description="XXX" />
      </_Content>
    </_Wrapper>
  );
};
