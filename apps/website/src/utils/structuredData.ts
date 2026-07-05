import {
  absoluteUrl,
  AUTHOR_NAME,
  AUTHOR_URL,
  OG_IMAGE_PATH,
  PACKAGES,
  REPO_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from '../constants/site';

/**
 * NOTE: schema.org の JSON-LD を組み立てる。
 * 検索エンジンのリッチリザルトだけでなく、AI / 回答エンジン（AIO）が
 * 「これは何のライブラリで、どこから入手でき、誰が作ったのか」を
 * 機械的に理解できるようにするのが目的。
 */

type JsonLd = Record<string, unknown>;

const author: JsonLd = {
  '@type': 'Person',
  '@id': `${AUTHOR_URL}#person`,
  name: AUTHOR_NAME,
  url: AUTHOR_URL,
};

const website: JsonLd = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  alternateName: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  inLanguage: ['en', 'ja'],
  image: absoluteUrl(OG_IMAGE_PATH),
  author,
  publisher: author,
};

const softwareApplications: JsonLd[] = PACKAGES.map((pkg) => ({
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#${pkg.name}`,
  name: pkg.name,
  description: pkg.description,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  programmingLanguage: 'TypeScript',
  url: absoluteUrl(pkg.path),
  downloadUrl: pkg.npmUrl,
  codeRepository: REPO_URL,
  license: 'https://opensource.org/licenses/MIT',
  author,
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}));

const breadcrumb = (items: { name: string; path: string }[]): JsonLd => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

/** トップページ用の構造化データグラフ。 */
export const homeStructuredData = (): string =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [website, author, ...softwareApplications],
  });

/**
 * 個別パッケージページ用の構造化データグラフ。
 * 対象パッケージの SoftwareApplication とパンくずを含める。
 */
export const packageStructuredData = (packageName: string): string => {
  const app = softwareApplications.find((entry) =>
    (entry['@id'] as string).endsWith(`#${packageName}`)
  );

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      website,
      author,
      ...(app ? [app] : []),
      breadcrumb([
        { name: SITE_NAME, path: '/' },
        { name: packageName, path: `/${packageName}` },
      ]),
    ],
  });
};
