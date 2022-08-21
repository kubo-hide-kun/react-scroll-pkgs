import { ENCODES } from 'react-scroll-flip-book';
import type { Encode } from 'react-scroll-flip-book';

/**
 *
 * @param basePath
 * @param start zero-based index at which to start extraction.
 * @param end the index of the first element to exclude from the returned array.
 * @param targetEncode
 * @param options
 * @param options.padLength fill 0 until the specified length is reached.
 * @returns
 */
export const getFramePaths = (
  basePath: string,
  start: number,
  end: number,
  targetEncode: { [encodeType in Encode]?: boolean },
  options: {
    padLength?: number;
  } = {}
): { [encodeType in Encode]?: string }[] => {
  const result: { [encodeType in Encode]?: string }[] = [];
  for (let i = start; i < end; i++) {
    const framePath = ENCODES.reduce((acc, encode) => {
      const _acc = { ...acc };
      if (targetEncode[encode]) {
        _acc[encode] = `${basePath}/${String(i).padStart(
          options.padLength || 0,
          '0'
        )}.${encode}`;
      }
      return _acc;
    }, {} as { [encodeType in Encode]?: string });

    result.push(framePath);
  }
  return result;
};
