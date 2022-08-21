export const ENCODES = ['avif', 'webp', 'jpg', 'png'] as const;
export type Encode = typeof ENCODES[number];

export const isAvailableEncode = (encode: Encode): encode is Encode => {
  return ENCODES.includes(encode);
};
