type Size = {
  width: number;
  height: number;
};

type Offset = {
  top: number;
  left: number;
};

const calcAspectRatio = (size: Size) => size.width / size.height;

/**
 * canvas で object-fit: cover 実現するための offset, size を返す。
 * @param wrapperSize 外側の矩形
 * @param contentSize 内側の矩形
 */
export const calcCoverRect = (
  wrapperSize: Size,
  contentSize: Size
): {
  offset: Offset;
  size: Size;
} => {
  const wrapperAspectRatio = calcAspectRatio(wrapperSize);
  const contentAspectRatio = calcAspectRatio(contentSize);

  if (wrapperAspectRatio < contentAspectRatio) {
    const targetSize = {
      width: wrapperSize.height * contentAspectRatio,
      height: wrapperSize.height,
    };
    const targetOffset = {
      top: 0,
      left: (wrapperSize.width - targetSize.width) / 2,
    };
    return { offset: targetOffset, size: targetSize };
  } else {
    const targetSize = {
      width: wrapperSize.width,
      height: wrapperSize.width / contentAspectRatio,
    };
    const targetOffset = {
      top: (wrapperSize.height - targetSize.height) / 2,
      left: 0,
    };
    return { offset: targetOffset, size: targetSize };
  }
};

/**
 * 「canvasのHTML要素自体の大きさ」と「キャンバスサイズ（描画バッファサイズ）」の比率を返す
 * @param canvas 対象の canvas エレメント
 */
export const calcCanvasScale = (canvas: HTMLCanvasElement) => ({
  x: canvas.width / canvas.clientWidth,
  y: canvas.height / canvas.clientHeight,
});
