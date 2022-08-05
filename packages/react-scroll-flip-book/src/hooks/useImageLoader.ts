import { useCallback, useEffect, useRef } from 'react';

import { TargetEncode } from '../types/encode';
import { loadImage as utilsLoadImage } from '../utils/loadImage';
import { getSupportedEncodes } from '../utils/supportsEncode';

// 軽量化用のHooks
export const useImageLoader = () => {
  const loadedImagesRef = useRef<{ [url: string]: HTMLImageElement }>({});
  const supportedEncodesRef = useRef<TargetEncode[] | null>(null);

  useEffect(() => {
    const fn = async () => {
      const supportedEncodes = await getSupportedEncodes();
      supportedEncodesRef.current = supportedEncodes;
    };
    fn();
  });

  const loadImage = useCallback(
    async (urls: { [encodeType in TargetEncode]?: string }) => {
      const supportedEncodes =
        supportedEncodesRef.current || (await getSupportedEncodes());
      const targetType =
        supportedEncodes.find((encodeType) => urls[encodeType]) || 'jpeg';
      const url = urls[targetType];
      if (!url) {
        return;
      }
      if (loadedImagesRef.current[url]) {
        return loadedImagesRef.current[url];
      }

      return await utilsLoadImage(url).then((resolve) => {
        loadedImagesRef.current = {
          ...loadedImagesRef.current,
          [url]: resolve,
        };
        return resolve;
      });
    },
    []
  );

  const preloadImage = useCallback(
    async (urls: { [encodeType in TargetEncode]?: string }) => {
      const supportedEncodes =
        supportedEncodesRef.current || (await getSupportedEncodes());
      const targetType =
        supportedEncodes.find((encodeType) => urls[encodeType]) || 'jpeg';
      const url = urls[targetType];
      if (!url) {
        return;
      }
      if (loadedImagesRef.current[url]) {
        return;
      }
      return await utilsLoadImage(url).then((resolve) => {
        loadedImagesRef.current = {
          ...loadedImagesRef.current,
          [url]: resolve,
        };
      });
    },
    []
  );

  return { loadImage, preloadImage };
};
