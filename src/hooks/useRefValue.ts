import { useEffect, useMemo, useRef, useState } from 'react';

type Options = {
  refreshIntervalMs?: number;
};

const DEFAULT_OPTIONS: Options = {
  refreshIntervalMs: 1000,
} as const;

export const useRefValue = <T>(targetRef: React.RefObject<T>, options?: Options) => {
  const [value, setValue] = useState<T | null>(null);
  const _options = useMemo(() => ({ ...DEFAULT_OPTIONS, ...options }), [options]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const target = targetRef.current;
      setValue((prev) => (prev === target ? prev : target));
    }, _options.refreshIntervalMs);
    return () => clearInterval(intervalId);
  }, [_options, targetRef]);

  return value;
};
