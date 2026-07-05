import { createGlobalStyle } from 'styled-components';

import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI",
    sans-serif;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}
body {
  margin: 0;
  color: ${theme.color.text};
  background-color: ${theme.color.bg};
  overflow-x: hidden;
}
h1, h2, h3, p {
  margin: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
button {
  border: none;
  background-color: transparent;
  font-family: inherit;
  cursor: pointer;
}
::selection {
  background: rgba(126, 212, 253, 0.28);
}
`;
