import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const gameNumber = atom<number>({
  key: "gameNumber",
  default: -1,
});

const wordBank = atom<string[]>({
  key: "wordBank",
  default: [],
});

const wordLookup = selector<Record<string, true>>({
  key: "wordLookup",
  get: ({ get }) => {
    const words = get(wordBank);
    const lookup: Record<string, true> = {};
    words.forEach((word) => {
      lookup[word] = true;
    });
    return lookup;
  },
});

const guesses = atom<string[]>({
  key: "guesses",
  default: [],
});

const guess = atom({
  key: "guess",
  default: "",
});

const KEYBOARDS = {
  "nb-no": ["qwertyuiopå", "asdfghjkløæ", "zxcvbnm"],
  "nn-no": ["qwertyuiopå", "asdfghjkløæ", "zxcvbnm"],
} as const;

export const useKeyboard = (): string[] => {
  const { lang } = useParams();
  // @ts-expect-error
  return KEYBOARDS[lang] ?? [];
};

export const useAlphabet = () => {
  const keyboard = useKeyboard();
  return new Set(keyboard.join("").split(""));
};

export const useGameNumber = () => {
  return useRecoilState(gameNumber);
};

export const useWordBank = () => {
  return useRecoilState(wordBank);
};

export const useGuesses = () => {
  return useRecoilValue(guesses);
};

export const useWord = () => {
  const words = useRecoilValue(wordBank);
  const number = useRecoilValue(gameNumber);
  return words[number];
};

export const useGuess = () => {
  const [guessV, setGuessV] = useRecoilState(guess);
  const setGuesses = useSetRecoilState(guesses);
  const alphabet = useAlphabet();
  const dictionary = useRecoilValue(wordLookup);
  const { setError } = useError();
  const finished = !!useEndState();

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

      setGuesses((g) => [...g, guessV]);
      setGuessV("");
    },
  };
};

export const useNewGame = () => {
  const setGuesses = useSetRecoilState(guesses);
  const setGuess = useSetRecoilState(guess);
  const navigate = useNavigate();
  const { lang } = useParams();

  return useCallback(() => {
    setGuesses([]);
    setGuess("");
    navigate(`/${lang}/${Date.now()}`);
  }, [navigate, lang, setGuess, setGuesses]);
};

const error = atom<string>({
  key: "error",
  default: "",
});

export const useError = () => {
  const [value, setError] = useRecoilState(error);
  const callback = useCallback(
    (errorString) => {
      setError(errorString);
      setTimeout(() => {
        setError("");
      }, 3000);
    },
    [setError]
  );
  return {
    error: value,
    setError: callback,
  };
};

export const useEndState = () => {
  const guesses = useGuesses();
  const word = useWord();

  if (guesses.includes(word)) {
    return "found-word";
  }

  if (guesses.length === 6) {
    return "no-guesses";
  }

  return undefined;
};
