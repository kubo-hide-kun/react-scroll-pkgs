import { useEffect, useState } from 'react';

export const useWindowInitialSize = (
  initialWidth = Infinity,
  initialHeight = Infinity
) => {
  const [size, setSize] = useState<{ width: number; height: number }>(
    typeof window !== 'undefined'
      ? {
          width: window.innerWidth,
          height: window.innerHeight,
        }
      : {
          width: initialWidth,
          height: initialHeight,
        }
  );

  useEffect(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return size;
};
