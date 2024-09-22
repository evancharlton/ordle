import { useCallback, useRef } from "react";
import { atom, useRecoilState } from "recoil";

const error = atom<string>({
  key: "error",
  default: "",
});

export const useError = () => {
  const timeoutRef = useRef<number>();
  const [value, setError] = useRecoilState(error);
  const callback = useCallback(
    (errorString: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setError(errorString);
      timeoutRef.current = +setTimeout(() => {
        setError("");
      }, 3000);
    },
    [setError]
  );
  return {
    error: value,
    setError: callback,
  };
};
