import type { AppProps } from 'next/app';
import React from 'react';

import { GlobalStyle } from '../constants/style';

function MyApp({
  Component,
  pageProps,
}: AppProps): React.ReactElement<AppProps> {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
