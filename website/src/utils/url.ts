export type AssetsOptions = {
  absolute?: boolean;
};

/**
 * get assets path
 * @param path
 * @param opts.absolute If true, return an absolute path. If false, return a relative path. If undefined, return a relative path.
 * @returns
 */
export const assets = (
  path: string,
  { absolute = false }: AssetsOptions = {}
): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${absolute ? process.env.ORIGIN || '' : ''}/assets${normalizedPath}`;
};
