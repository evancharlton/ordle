import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useWord, useWords } from "../App/Setup/DataLoader";
import { useGuess, useGuesses } from ".";

export const useEndState = () => {
  const [guesses] = useGuesses();
  const word = useWord();

  if (guesses.includes(word)) {
    return "found-word";
  }

  if (guesses.length === 6) {
    return "no-guesses";
  }

  return undefined;
};

export const useNewGame = () => {
  const setGuesses = useGuesses()[1];
  const { clear } = useGuess();
  const navigate = useNavigate();
  const { lang } = useParams();
  const words = useWords();

  return useCallback(() => {
    setGuesses([]);
    clear();
    const rand = Math.floor(Math.random() * words.length);
    navigate(`/${lang}/${rand}`);
  }, [navigate, lang, words, clear, setGuesses]);
};
