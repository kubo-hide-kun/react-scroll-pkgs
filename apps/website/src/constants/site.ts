import { repoUrl } from './theme';

/**
 * NOTE: サイト全体で共有する SEO / AIO 用のメタ情報を一箇所に集約する。
 * SSG（`next export`）でビルドされるため、`ORIGIN` 環境変数が無い場合でも
 * 本番 URL にフォールバックし、canonical / OG / 構造化データが常に絶対 URL になるようにする。
 */
export const SITE_URL = (
  process.env.ORIGIN || 'https://react-scroll-pkgs.vercel.app'
).replace(/\/$/, '');

export const SITE_NAME = 'react-scroll-pkgs';

export const SITE_TAGLINE = 'Scroll-linked React UI libraries';

export const SITE_DESCRIPTION =
  'Turn the scrollbar into an animation timeline. Two tiny, zero-config React packages: use-window-scroll-in-element and react-scroll-flip-book.';

export const OG_IMAGE_PATH = '/og.png';

export const OG_IMAGE_WIDTH = 1200;

export const OG_IMAGE_HEIGHT = 630;

export const TWITTER_HANDLE = '@kubo_hide_kun';

export const AUTHOR_NAME = 'kubo-hide-kun';

export const AUTHOR_URL = 'https://github.com/kubo-hide-kun';

export const REPO_URL = repoUrl;

export const THEME_COLOR = '#05060a';

/** SEO / AIO 用のキーワード。検索エンジンと AI クローラー双方への手掛かりになる。 */
export const SITE_KEYWORDS = [
  'react scroll',
  'scroll animation',
  'scroll-linked animation',
  'react scroll hook',
  'scroll progress',
  'use-window-scroll-in-element',
  'react-scroll-flip-book',
  'scroll flipbook',
  'canvas scroll animation',
  'apple style scroll',
  'react ui library',
  'typescript',
];

/** 各 npm パッケージのメタ情報。sitemap / 構造化データ / llms.txt から参照する。 */
export type PackageInfo = {
  name: string;
  path: string;
  npmUrl: string;
  description: string;
};

export const PACKAGES: readonly PackageInfo[] = [
  {
    name: 'use-window-scroll-in-element',
    path: '/use-window-scroll-in-element',
    npmUrl: 'https://www.npmjs.com/package/use-window-scroll-in-element',
    description:
      'A zero-dependency React hook that reports how far the window has scrolled through a target element, as pixels and as a normalized 0 → 1 fraction.',
  },
  {
    name: 'react-scroll-flip-book',
    path: '/',
    npmUrl: 'https://www.npmjs.com/package/react-scroll-flip-book',
    description:
      'A React component that renders a sequence of numbered frames onto a canvas, one frame per scroll step, with smart preloading and responsive avif/webp/jpg sources.',
  },
] as const;

/**
 * サイト内の各ページ。sitemap.xml の生成やナビゲーションの拡張に利用できる。
 */
export type SitePage = {
  path: string;
  changefreq: string;
  priority: number;
};

export const SITE_PAGES: readonly SitePage[] = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  {
    path: '/use-window-scroll-in-element',
    changefreq: 'monthly',
    priority: 0.8,
  },
] as const;

/** パスを絶対 URL に変換する。 */
export const absoluteUrl = (path = '/'): string => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${
    normalized === '/' ? '' : normalized.replace(/\/$/, '')
  }`;
};
