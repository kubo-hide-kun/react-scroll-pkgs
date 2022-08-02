import { useEffect, useMemo, useState } from "react";
import { throttle } from "../utils/throttle";

type Options = {
  waitingMs?: number;
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
  signal?: AbortSignal;
};

export const useWindowSize = (options: Options = {}) => {
  const [state, setState] = useState<{ width: number; height: number }>({
    width: typeof window !== "undefined" ? window.innerWidth : Infinity,
    height: typeof window !== "undefined" ? window.innerHeight : Infinity,
  });

  const resizeEffect = useMemo(() => {
    return throttle(() => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, options.waitingMs || 0);
  }, [options.waitingMs]);

  useEffect(() => {
    window.addEventListener("scroll", resizeEffect, options);
    return () => {
      window.removeEventListener("scroll", resizeEffect);
    };
  }, [options, resizeEffect]);

  return state;
};
