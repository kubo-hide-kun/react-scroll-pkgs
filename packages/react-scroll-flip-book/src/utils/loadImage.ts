/**
 * 画像をロードする Promise を返す
 * @param src ロード画像のパス
 */
export const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    try {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (e) => {
        reject(e);
      };
    } catch (e) {
      reject(e);
    }
  });
};
