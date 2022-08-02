export const throttle = (fn: VoidFunction, interval: number): VoidFunction => {
  let lastInvokeTime = Date.now();

  const invokeFn = (fn: VoidFunction): void => {
    const time = Date.now();
    const timeSinceLastInvoke = time - lastInvokeTime;

    const shouldInvoke = timeSinceLastInvoke > interval;
    if (!shouldInvoke) {
      return;
    }

    lastInvokeTime = time;
    return fn();
  };

  return () => invokeFn(fn);
};
