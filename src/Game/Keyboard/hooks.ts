import { useParams } from "react-router";

type Keyboard = string[];

const KEYBOARDS: Record<string, Keyboard> = {
  "nb-no": ["qwertyuiopå", "asdfghjkløæ", "zxcvbnm"],
  "nn-no": ["qwertyuiopå", "asdfghjkløæ", "zxcvbnm"],
};

export const useKeyboard = () => {
  const { lang } = useParams();
  if (!lang) {
    throw new Error("No language set yet");
  }

  const keyboard = KEYBOARDS[lang];
  if (!keyboard) {
    throw new Error(`Unknown language: ${lang}`);
  }

  return keyboard;
};

export const useAlphabet = () => {
  const keyboard = useKeyboard();
  return new Set(keyboard.join("").split(""));
};
