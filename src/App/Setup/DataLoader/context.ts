import { createContext, useContext } from "react";

type WordsContext = {
  wordList: string[];
  wordMap: Record<string, true>;
};

export const Context = createContext<WordsContext>({
  wordList: [],
  wordMap: {},
});

export const useWords = () => {
  const { wordList: words } = useContext(Context);
  return words;
};

export const useDictionary = () => {
  return useContext(Context).wordMap;
};
