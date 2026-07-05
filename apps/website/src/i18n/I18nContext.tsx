import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  DEFAULT_LOCALE,
  Locale,
  LOCALES,
  Translation,
  translations,
} from './translations';

const STORAGE_KEY = 'react-scroll-pkgs.locale';

const isLocale = (value: string | null): value is Locale =>
  value != null && (LOCALES as string[]).includes(value);

const detectInitialLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) {
    return stored;
  }

  const preferred = window.navigator.language.toLowerCase();
  if (preferred.startsWith('ja')) {
    return 'ja';
  }

  return DEFAULT_LOCALE;
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Translation;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  // NOTE: SSG 時は必ず DEFAULT_LOCALE で描画し、マウント後にクライアント側の
  // 判定へ切り替えることで hydration の不一致を防ぐ。
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    setLocaleState(detectInitialLocale());
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = translations[locale].htmlLang;
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'ja' : 'en');
  }, [locale, setLocale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t: translations[locale],
    }),
    [locale, setLocale, toggleLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);
  if (context == null) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
