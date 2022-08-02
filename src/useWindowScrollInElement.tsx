import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRefValue } from './hooks/useRefValue';
import { useWindowScrollEffect } from './hooks/useWindowScrollEffect';
import { useWindowSize } from './hooks/useWindowSize';
import { mapValues } from './utils/object';

type Options = {
  disableValueChangesOffscreen: boolean;
  scrollStartPosition: 'window-top' | 'window-center' | 'window-bottom';
  scrollEndPosition: 'window-top' | 'window-center' | 'window-bottom';
  waitingMs?: number;
};

const DEFAULT_OPTIONS: Options = {
  disableValueChangesOffscreen: false,
  scrollStartPosition: 'window-top',
  scrollEndPosition: 'window-top',
} as const;

const FALLBACK_VALUES = {
  position: { top: 0, bottom: 0 },
  fraction: { top: 0, bottom: 0 },
  isInside: false,
};

/**
 * Hooks to get how much the window has scrolled from the target element.
 * @param targetElmRef target element
 * @param opts
 * @returns result
 * @returns result.position Get the position of the "top/bottom" of the window in px within the target element.
 * @returns result.position.top
 * @returns result.position.bottom
 * @returns result.fraction Get the position of the "top/bottom" of the window as a percentage of the target element's scrollable area with the height of the target element as 100%.
 * @returns result.fraction.top
 * @returns result.fraction.bottom
 * @returns result.isFraction window is within the scrollable area of the element * @returns result.isFraction window is within the scrollable area of the element?
 */
export const useWindowScrollInElement = (
  targetElmRef: React.RefObject<HTMLElement>,
  opts: Partial<Options> = {}
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
      options.scrollStartPosition === 'window-top'
        ? targetElm.getBoundingClientRect().top * -1
        : options.scrollStartPosition === 'window-center'
        ? windowHeight / 2 - targetElm.getBoundingClientRect().top
        : windowHeight - targetElm.getBoundingClientRect().top;

    setPosition({ top: positionTop, bottom: positionTop + windowHeight });
  }, [targetElmRef, options, windowHeight]);

  useEffect(effect, [effect]);
  useWindowScrollEffect(effect, { waitingMs: options.waitingMs });

  const scrollableHeight = useMemo(() => {
    if (!currentTargetElm) {
      return NaN;
    }

    const { scrollStartPosition, scrollEndPosition } = options;

    switch (scrollStartPosition) {
      case 'window-top':
        switch (scrollEndPosition) {
          case 'window-top':
            return currentTargetElm.getBoundingClientRect().height;
          case 'window-center':
            return (
              currentTargetElm.getBoundingClientRect().height - windowHeight / 2
            );
          case 'window-bottom':
            return (
              currentTargetElm.getBoundingClientRect().height - windowHeight
            );
        }
      // eslint-disable-next-line no-fallthrough
      case 'window-center':
        switch (scrollEndPosition) {
          case 'window-top':
            return (
              currentTargetElm.getBoundingClientRect().height + windowHeight / 2
            );
          case 'window-center':
            return currentTargetElm.getBoundingClientRect().height;
          case 'window-bottom':
            return (
              currentTargetElm.getBoundingClientRect().height - windowHeight / 2
            );
        }
      // eslint-disable-next-line no-fallthrough
      case 'window-bottom':
        switch (scrollEndPosition) {
          case 'window-top':
            return (
              currentTargetElm.getBoundingClientRect().height + windowHeight
            );
          case 'window-center':
            return (
              currentTargetElm.getBoundingClientRect().height + windowHeight / 2
            );
          case 'window-bottom':
            return currentTargetElm.getBoundingClientRect().height;
        }
    }
  }, [currentTargetElm, options, windowHeight]);

  const isInside = useMemo(
    () =>
      position.top !== null &&
      position.top + 1 > 0 &&
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
