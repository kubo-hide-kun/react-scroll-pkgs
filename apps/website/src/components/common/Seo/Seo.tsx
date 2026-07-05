import NextHead from 'next/head';
import React from 'react';

import {
  absoluteUrl,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  SITE_KEYWORDS,
  SITE_NAME,
  TWITTER_HANDLE,
} from '../../../constants/site';
import { useI18n } from '../../../i18n';

export type SeoProps = {
  /** ページ固有のタイトル。未指定なら i18n の `meta.title` を使う。 */
  title?: string;
  /** ページ固有の説明文。未指定なら i18n の `meta.description` を使う。 */
  description?: string;
  /** ページのパス（先頭スラッシュ付き）。canonical / og:url に使う。 */
  path?: string;
  /** OGP 画像パス。 */
  image?: string;
  /** JSON-LD 構造化データ（`JSON.stringify` 済みの文字列）。 */
  structuredData?: string;
};

/**
 * ページ共通の <head> メタ情報を出力する再利用可能なコンポーネント。
 *
 * - canonical URL
 * - Open Graph / Twitter Card
 * - robots（AI クローラーを含む）
 * - hreflang / og:locale による多言語シグナル
 * - JSON-LD 構造化データ（SEO のリッチリザルト・AIO 双方向け）
 */
export const Seo = ({
  title,
  description,
  path = '/',
  image = OG_IMAGE_PATH,
  structuredData,
}: SeoProps): React.ReactElement => {
  const { t, locale } = useI18n();

  const resolvedTitle = title ?? t.meta.title;
  const resolvedDescription = description ?? t.meta.description;
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const ogLocale = locale === 'ja' ? 'ja_JP' : 'en_US';
  const ogLocaleAlt = locale === 'ja' ? 'en_US' : 'ja_JP';

  return (
    <NextHead>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="keywords" content={SITE_KEYWORDS.join(', ')} />
      <meta name="author" content={SITE_NAME} />
      <link rel="canonical" href={canonical} />

      {/* 検索エンジン / AI クローラー向けのインデックス許可 */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
      <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
      <meta property="og:image:alt" content={resolvedTitle} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlt} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={resolvedTitle} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />

      {/* 多言語シグナル: このページは同一 URL で en / ja を出し分ける */}
      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="ja" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {structuredData && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}
    </NextHead>
  );
};
