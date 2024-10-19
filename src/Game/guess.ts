import {
  atom,
  selector,
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
import { getLegality, never } from "../utils";
import { useWord } from "../App/Setup/GameLoader";

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

const lastGuess = selector<string>({
  key: "lastGuess",
  get: ({ get }) => {
    const guessesV = get(guesses);
    if (!guessesV) {
      return "";
    }

    const sorted = Object.entries(guessesV).sort(
      ([_guessA, timeA], [_guessB, timeB]) => {
        return timeB - timeA;
      }
    );
    if (sorted.length === 0) {
      return "";
    }

    const [[guess]] = sorted;
    return guess;
  },
});

const guess = atom({
  key: "guess",
  default: "",
});

export const useGuesses = () => {
  return useRecoilState(guesses);
};

export const useGuess = () => {
  const word = useWord();
  const [guessV, setGuessV] = useRecoilState(guess);
  const [guessesV, setGuesses] = useGuesses();
  const dictionary = useDictionary();
  const { setError } = useError();
  const finished = !!useEndState();
  const key = useStorageKey();
  const { strict } = useSettings();
  const lastGuessV = useRecoilValue(lastGuess);

  const N = word.length;

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

      setGuessV((v) => `${v}${l}`.substring(0, N));
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

      if (guessV.length !== N) {
        setError(`For kort (kreves nøyaktig ${N} bokstaver)`);
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

      if (strict && guessesV) {
        const judge = getLegality(word, lastGuessV);
        const legality = judge(guessV);
        if (legality !== "legal") {
          const { reason } = legality;
          switch (reason) {
            case "includes-known-no": {
              setError(
                `Må bruke ikke "${legality.letter.toLocaleUpperCase()}"`
              );
              break;
            }

            case "includes-same-maybe": {
              setError(
                `Må bruke ikke "${legality.letter.toLocaleUpperCase()}" i posisjon ${
                  legality.column
                }`
              );
              break;
            }

            case "missing-known-yes": {
              setError(`Må bruke "${legality.letter.toLocaleUpperCase()}"`);
              break;
            }

            case "missing-maybe": {
              setError(`Må bruke "${legality.letter.toLocaleUpperCase()}"`);
              break;
            }

            default: {
              never(reason);
            }
          }

          return;
        }
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
    hapticFeedback: true,
  },
});

export const useSettings = () => {
  return useRecoilValue(settings);
};

export const useUpdateSettings = () => {
  return useSetRecoilState(settings);
};
