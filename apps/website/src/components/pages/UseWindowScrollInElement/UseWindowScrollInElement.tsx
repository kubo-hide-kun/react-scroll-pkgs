import React from 'react';

import { Footer } from '../Top/internal/Footer';
import { Nav } from '../Top/internal/Nav';
import { ScrollHookDemo } from '../Top/internal/ScrollHookDemo';
import { Section } from '../Top/internal/Section';

export const UseWindowScrollInElement = () => {
  return (
    <>
      <Nav />
      <Section
        eyebrow="Package 01 · The hook"
        title="use-window-scroll-in-element"
        lead="A React hook that reports how far the window has scrolled through a target element — as pixels and as a 0 → 1 fraction. Scroll down to bind it to a progress bar, a fade-in, and a parallax scene."
      />
      <ScrollHookDemo />
      <Footer />
    </>
  );
};
