import { useEffect, useRef, useMemo } from "react";
import { throttle } from "../utils/throttle";

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
export const useWindowScrollEffect = (
  effect: (scrollY?: number) => void,
  options: Options = {}
) => {
  const scrollEffect = useMemo(() => {
    return throttle(() => {
      effect(window.scrollY);
    }, options.waitingMs || 0);
  }, [effect, options.waitingMs]);

  useEffect(() => {
    window.addEventListener("scroll", scrollEffect, options);
    return () => {
      window.removeEventListener("scroll", scrollEffect);
    };
  }, [options, scrollEffect]);
};
