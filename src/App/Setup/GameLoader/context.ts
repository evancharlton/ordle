import { createContext, useContext } from "react";
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
  return word ?? words[gameNumber];
};
