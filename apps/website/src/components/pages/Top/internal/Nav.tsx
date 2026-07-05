import React from 'react';
import { IoLogoGithub } from 'react-icons/io5';
import styled from 'styled-components';

import { repoUrl, theme } from '../../../../constants/theme';

const _Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 24px;
  background: rgba(5, 6, 10, 0.5);
  border-bottom: 1px solid ${theme.color.surfaceBorder};
  backdrop-filter: saturate(180%) blur(14px);
`;

const _Brand = styled.a`
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${theme.color.text};
`;

const _Links = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;

  @media (max-width: 640px) {
    gap: 16px;
  }
`;

const _Link = styled.a`
  font-size: 15px;
  font-weight: 500;
  color: ${theme.color.textMuted};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.color.text};
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const _GitHub = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 15px;
  font-weight: 600;
  color: ${theme.color.text};
`;

export const Nav = () => {
  return (
    <_Nav>
      <_Brand href="#top">react-scroll-pkgs</_Brand>
      <_Links>
        <_Link href="#use-window-scroll-in-element">Hook</_Link>
        <_Link href="#react-scroll-flip-book">Flipbook</_Link>
        <_GitHub href={repoUrl} target="_blank" rel="noopener noreferrer">
          <IoLogoGithub size={19} />
          GitHub
        </_GitHub>
      </_Links>
    </_Nav>
  );
};
