import { TargetEncode } from '../types/encode';

/**
 * @see https://avif.io/blog/tutorials/css/
 */

function checkAvifSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    avif.onload = function () {
      resolve(true);
    };
    avif.onerror = function () {
      resolve(false);
    };
  });
}

function checkWebPSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = function () {
      const result = img.width > 0 && img.height > 0;
      resolve(result);
    };
    img.onerror = function () {
      resolve(false);
    };
    img.src =
      'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
  });
}

export const getSupportedEncodes = async (): Promise<TargetEncode[]> => {
  return [
    ...((await checkAvifSupport()) ? (['avif'] as const) : []),
    ...((await checkWebPSupport()) ? (['webp'] as const) : []),
    'jpeg',
  ];
};
