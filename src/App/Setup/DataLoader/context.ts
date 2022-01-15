import { createContext, useContext } from "react";

type WordsContext = {
  wordList: string[];
  wordMap: Record<string, true>;
  gameNumber: number;
};

export const Context = createContext<WordsContext>({
  wordList: [],
  wordMap: {},
  gameNumber: -1,
});

export const useWords = () => {
  const { wordList: words } = useContext(Context);
  return words;
};

export const useDictionary = () => {
  return useContext(Context).wordMap;
};

export const useGameNumber = () => {
  return useContext(Context).gameNumber;
};

export const useWord = () => {
  const { wordList, gameNumber } = useContext(Context);
  return wordList[gameNumber];
};
