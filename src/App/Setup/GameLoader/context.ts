import { createContext, useContext, useMemo } from "react";
import { useWords } from "../DataLoader";

type GameContext = {
  word?: string;
  gameNumber: number;
};

export const Context = createContext<GameContext>({
  gameNumber: -1,
});

export const useGameNumber = () => {
  return useContext(Context).gameNumber;
};

export const useWord = () => {
  const words = useWords();
  const { gameNumber, word } = useContext(Context);
  const firstWord = words[0];

  const chosenWord = word ?? words[gameNumber];

  return useMemo(() => {
    const filler = new Array(firstWord.length).fill(" ").join("");
    return `${chosenWord}${filler}`.substring(0, firstWord.length);
  }, [chosenWord, firstWord.length]);
};
