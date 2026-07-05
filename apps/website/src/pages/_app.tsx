import type { AppProps } from 'next/app';
import React from 'react';

import { GlobalStyle } from '../constants/style';
import { I18nProvider } from '../i18n';

function MyApp({
  Component,
  pageProps,
}: AppProps): React.ReactElement<AppProps> {
  return (
    <I18nProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </I18nProvider>
  );
}

export default MyApp;
