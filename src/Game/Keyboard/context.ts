import { createContext, useContext } from "react";

export type KeyboardContextType = {
  letterMap: Record<string, "yes" | "maybe" | "no" | "unknown">;
};

export const KeyboardContext = createContext<KeyboardContextType>({
  letterMap: {},
});

export const useKeyboardContext = () => {
  return useContext(KeyboardContext);
};
