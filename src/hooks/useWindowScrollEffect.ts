import { useEffect, useMemo } from 'react';

import { throttle } from '../utils/throttle';

type Options = {
  waitingMs?: number;
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
  signal?: AbortSignal;
};

/**
 * Custom Hook that calls a callback function each time a scroll event occurs
 * @param effect callback function
 * @param options.waitingMs Waiting time after function execution
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
    window.addEventListener('scroll', scrollEffect, options);
    return () => {
      window.removeEventListener('scroll', scrollEffect);
    };
  }, [options, scrollEffect]);
};
