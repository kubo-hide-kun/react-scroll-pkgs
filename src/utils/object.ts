export const mapValues = <TKey extends string, TValue, TNewValue = TValue>(
  obj: Record<TKey, TValue>,
  mapFn: (value: TValue, key: string) => TNewValue,
): Record<TKey, TNewValue> => {
  return Object.entries<TValue>(obj).reduce((prev, [key, value]) => {
    return {
      ...prev,
      [key]: mapFn(value, key),
    };
  }, {}) as Record<TKey, TNewValue>;
};
