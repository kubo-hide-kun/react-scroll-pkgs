export const throttle = (fn: Function, interval: number) => {
  let lastInvokeTime = Date.now();

  const invokeFn = (fn: Function) => {
    const time = Date.now();
    const timeSinceLastInvoke = time - lastInvokeTime;

    const shouldInvoke = timeSinceLastInvoke > interval;
    if (!shouldInvoke) {
      return;
    }

    fn();
    lastInvokeTime = time;
  };

  return () => invokeFn(fn);
};
