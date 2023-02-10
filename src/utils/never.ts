export const never = <T>(v: never, defaultValue?: T) => {
  if (defaultValue !== undefined) {
    return defaultValue;
  }
  throw new Error(`Impossible situation: ${v}`);
};
