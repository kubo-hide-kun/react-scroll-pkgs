import throttle from 'just-throttle';
import { useEffect, useMemo } from 'react';

type Options = {
  waitingMs?: number;
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
  signal?: AbortSignal;
};

/**
 * スクロールイベントが発生するたびにコールバック関数を呼び出すカスタムHook
 * @param effect コールバック関数
 * @param options.waitingMs 関数実行後の待機時間
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters
 */
export const useWindowResizeEffect = (
  effect: (size?: { width: number; height: number }) => void,
  { waitingMs = 50, ...options }: Options = {}
) => {
  const scrollEffect = useMemo(
    () =>
      throttle(() => {
        effect({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, waitingMs),
    [effect, waitingMs]
  );

  useEffect(() => {
    window.addEventListener('resize', scrollEffect, options);
    return () => {
      window.removeEventListener('resize', scrollEffect);
    };
  }, [options, scrollEffect]);
};
