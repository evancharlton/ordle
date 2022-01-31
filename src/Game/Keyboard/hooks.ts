import { useParams } from "react-router";
import { useGuesses } from "..";
import { useWord } from "../../App/Setup/DataLoader";
import { useKeyboardContext } from "./context";

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

export const useLetterMap = (letter: string) => {
  const { letterMap } = useKeyboardContext();
  return letterMap[letter] ?? "unknown";
};

const useForbiddenLetters = (word: string, guesses: string[]) => {
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
};

export const useColumns = () => {
  const word = useWord();
  const keyboard = useKeyboard();
  const alphabet = keyboard
    .join("")
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

    const allowed = new Set();

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
