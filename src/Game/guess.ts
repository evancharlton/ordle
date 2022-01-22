import { atom, useRecoilState } from "recoil";
import { useDictionary } from "../App/Setup/DataLoader";
import { useStorageKey } from "../App/Setup/StateLoader";
import { useError } from "../ErrorMessage";
import { useAlphabet } from "./Keyboard";
import { useEndState } from "./control";

export type GuessMap = Record<string, number>;

const guesses = atom<GuessMap>({
  key: "guesses",
  default: {},
});

const guess = atom({
  key: "guess",
  default: "",
});

export const useGuesses = () => {
  return useRecoilState(guesses);
};

export const useGuess = () => {
  const [guessV, setGuessV] = useRecoilState(guess);
  const [guessesV, setGuesses] = useGuesses();
  const alphabet = useAlphabet();
  const dictionary = useDictionary();
  const { setError } = useError();
  const finished = !!useEndState();
  const key = useStorageKey();

  return {
    word: guessV,
    add: (letter: string) => {
      if (finished) {
        return;
      }

      const l = letter.toLocaleLowerCase();
      if (!alphabet.has(l)) {
        return;
      }

      setGuessV((v) => `${v}${l}`.substring(0, 5));
    },
    remove: () => {
      if (finished) {
        return;
      }
      setGuessV((v) => v.substring(0, Math.max(0, v.length - 1)));
    },
    commit: () => {
      if (finished) {
        return;
      }

      if (!guessV) {
        return;
      }

      if (guessV.length !== 5) {
        setError("For kort (nøyaktig fem bokstaver)");
        return;
      }

      if (!dictionary[guessV]) {
        setError("Ukjent ord");
        return;
      }

      if (guessesV[guessV]) {
        setError("Allerede prøvde");
        return;
      }

      setGuesses((g) => {
        const next = {
          ...g,
          [guessV]: Date.now(),
        };
        if (key) {
          localStorage.setItem(key, JSON.stringify(next));
        }
        return next;
      });
      setGuessV("");
    },
    clear: () => setGuessV(""),
  };
};
