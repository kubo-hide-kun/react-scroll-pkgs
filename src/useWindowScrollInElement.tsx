import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mapValues } from "./utils/object";
import { useRefValue } from "./hooks/useRefValue";
import { useWindowScrollEffect } from "./hooks/useWindowScrollEffect";
import { useWindowSize } from "./hooks/useWindowSize";

const DEFAULT_OPTIONS = {
  disableValueChangesOffscreen: false,
  scrollStartPosition: "window-top",
  scrollEndPosition: "window-top",
} as const;

const FALLBACK_VALUES = {
  position: { top: 0, bottom: 0 },
  fraction: { top: 0, bottom: 0 },
  isInside: false,
};

/**
 * 対象エレメントから見て window がどれくらいスクロールしたかを取得するHooks
 * @param targetElmRef 対象エレメント
 * @param opts
 * @returns result
 * @returns result.position window の「上辺/下辺」が対象エレメント内で 何px の位置にあるかを取得
 * @returns result.position.top 上辺
 * @returns result.position.bottom 下辺
 * @returns result.fraction 対象エレメントのスクロール可能領域の高さを100%として window の「上辺/下辺」が対象エレメント内で 何% の位置にあるかを取得
 * @returns result.fraction.top 上辺
 * @returns result.fraction.bottom 下辺
 * @returns result.isFraction window が対象エレメントのスクロール可能領域内にいるか？
 */
export const useWindowScrollInElement = (
  targetElmRef: React.RefObject<HTMLElement>,
  opts: {
    disableValueChangesOffscreen?: boolean;
    scrollStartPosition?: "window-top" | "window-center" | "window-bottom";
    scrollEndPosition?: "window-top" | "window-center" | "window-bottom";
    waitingMs?: number;
  } = {}
) => {
  const options = useMemo(() => ({ ...DEFAULT_OPTIONS, ...opts }), [opts]);
  const currentTargetElm = useRefValue(targetElmRef);

  const [position, setPosition] = useState<{
    top: number | null;
    bottom: number | null;
  }>({
    top: null,
    bottom: null,
  });

  const { height: windowHeight } = useWindowSize();

  const effect = useCallback(() => {
    const targetElm = targetElmRef.current;
    if (!targetElm) {
      return;
    }

    const positionTop =
      options.scrollStartPosition === "window-top"
        ? targetElm.getBoundingClientRect().top * -1
        : options.scrollStartPosition === "window-center"
        ? windowHeight / 2 - targetElm.getBoundingClientRect().top
        : windowHeight - targetElm.getBoundingClientRect().top;

    setPosition({ top: positionTop, bottom: positionTop + windowHeight });
  }, [targetElmRef, windowHeight]);

  useEffect(effect, [effect]);
  useWindowScrollEffect(effect, { waitingMs: options.waitingMs });

  const scrollableHeight = useMemo(() => {
    if (!currentTargetElm) {
      return NaN;
    }

    const { scrollStartPosition, scrollEndPosition } = options;

    switch (scrollStartPosition) {
      case "window-top":
        switch (scrollEndPosition) {
          case "window-top":
            return currentTargetElm.getBoundingClientRect().height;
          case "window-center":
            return (
              currentTargetElm.getBoundingClientRect().height - windowHeight / 2
            );
          case "window-bottom":
            return (
              currentTargetElm.getBoundingClientRect().height - windowHeight
            );
        }
      // eslint-disable-next-line no-fallthrough
      case "window-center":
        switch (scrollEndPosition) {
          case "window-top":
            return (
              currentTargetElm.getBoundingClientRect().height + windowHeight / 2
            );
          case "window-center":
            return currentTargetElm.getBoundingClientRect().height;
          case "window-bottom":
            return (
              currentTargetElm.getBoundingClientRect().height - windowHeight / 2
            );
        }
      // eslint-disable-next-line no-fallthrough
      case "window-bottom":
        switch (scrollEndPosition) {
          case "window-top":
            return (
              currentTargetElm.getBoundingClientRect().height + windowHeight
            );
          case "window-center":
            return (
              currentTargetElm.getBoundingClientRect().height + windowHeight / 2
            );
          case "window-bottom":
            return currentTargetElm.getBoundingClientRect().height;
        }
    }
  }, [currentTargetElm, options, windowHeight]);

  const isInside = useMemo(
    () =>
      position.top !== null &&
      0 < position.top + 1 &&
      position.top - 1 < scrollableHeight,
    [position.top, scrollableHeight]
  );

  if (options.disableValueChangesOffscreen && !isInside) {
    return FALLBACK_VALUES;
  }

  const _position = mapValues(position, (v) => v || 0);

  return {
    position: _position,
    fraction: mapValues(_position, (v) => v / scrollableHeight || 0),
    isInside,
  };
};
