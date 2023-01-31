import { useMemo } from "react";
import { useGuesses } from "..";
import { useWord } from "../../App/Setup/GameLoader";
import { useKeyboardContext } from "./context";

type Keyboard = string[];

export const KEYBOARD: Readonly<Keyboard> = [
  "qwertyuiopå",
  "asdfghjkløæ",
  "zxcvbnm",
] as const;

export const ALPHABET: Record<string, true> = {
  a: true,
  b: true,
  c: true,
  d: true,
  e: true,
  f: true,
  g: true,
  h: true,
  i: true,
  j: true,
  k: true,
  l: true,
  m: true,
  n: true,
  o: true,
  p: true,
  q: true,
  r: true,
  s: true,
  t: true,
  u: true,
  v: true,
  w: true,
  x: true,
  y: true,
  z: true,
  æ: true,
  ø: true,
  å: true,
} as const;

export const useLetterMap = (letter: string) => {
  const { letterMap } = useKeyboardContext();
  return letterMap[letter] ?? "unknown";
};

export const useForbiddenLetters = (word: string, guesses: string[]) => {
  return useMemo(() => {
    const rightLetters = new Set([...word.split("")]);
    const invalidLetters = new Set();
    for (let i = 0; i < guesses.length; i += 1) {
      const guess = guesses[i];
      guess.split("").forEach((letter) => {
        if (!rightLetters.has(letter)) {
          invalidLetters.add(letter);
        }
      });
    }
    return invalidLetters;
  }, [guesses, word]);
};

export const useColumns = () => {
  const word = useWord();
  const alphabet = KEYBOARD.join("")
    .split("")
    .sort((a, b) => a.localeCompare(b));
  const [guessMap] = useGuesses();
  const guesses = Object.keys(guessMap);

  const forbidden = useForbiddenLetters(word, guesses);

  return word.split("").map((known, i) => {
    const guessedValues = new Set();
    guesses.forEach((guess) => {
      guessedValues.add(guess[i]);
    });

    const allowed = new Set<string>();

    if (guessedValues.has(known)) {
      // They found it already!
      allowed.add(known);
      return allowed;
    }

    // Otherwise, _everything_ that hasn't been guessed is allowed.
    alphabet.forEach((letter) => {
      if (!guessedValues.has(letter) && !forbidden.has(letter)) {
        allowed.add(letter);
      }
    });

    return allowed;
  });
};
