import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useDictionary } from "../App/Setup/DataLoader";
import { useStorageKey } from "../App/Setup/StateLoader";
import { useError } from "../ErrorMessage";
import { ALPHABET } from "./Keyboard";
import { useEndState } from "./control";
import { NewGuess } from "../custom-events";

export type GuessMap = Record<string, number>;

export const isGuessMap = (item: unknown): item is GuessMap => {
  if (!item) {
    return false;
  }

  if (Array.isArray(item)) {
    return false;
  }

  if (!(typeof item === "object")) {
    return false;
  }

  return Object.keys(item).every(
    (key) => typeof key === "string" && key.length === 5
  );
};

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

      const l = letter.toLocaleLowerCase() as keyof typeof ALPHABET;
      if (!ALPHABET[l]) {
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
      dispatchEvent(new NewGuess(guessV, new Date(), "local"));
    },
    clear: () => setGuessV(""),
  };
};

const settings = atom({
  key: "game-settings",
  default: {
    strict: true,
    showRemaining: true,
  },
});

export const useSettings = () => {
  return useRecoilValue(settings);
};

export const useUpdateSettings = () => {
  return useSetRecoilState(settings);
};
