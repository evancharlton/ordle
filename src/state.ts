import { useParams } from "react-router";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const hashCode = (str: string) => {
  return str.split("").reduceRight((acc, c) => acc + c.charCodeAt(0) * 31, 0);
};

const gameKey = atom({
  key: "gameKey",
  default: "",
});

const language = atom({
  key: "lang",
  default: "nb-no",
});

const wordBank = selector<string[]>({
  key: "wordBank",
  get: async ({ get }) => {
    const lang = get(language);
    const data = await fetch(
      [process.env.PUBLIC_URL, lang, "words.json"].join("/")
    ).then((resp) => resp.json());
    return data;
  },
});

const wordLookup = selector<Record<string, true>>({
  key: "wordLookup",
  get: async ({ get }) => {
    const words = await get(wordBank);
    const lookup: Record<string, true> = {};
    words.forEach((word) => {
      lookup[word] = true;
    });
    return lookup;
  },
});

export const guesses = atom<string[]>({
  key: "guesses",
  default: [],
});

const guess = atom({
  key: "guess",
  default: "",
});

export const useLanguage = () => {
  return useRecoilValue(language);
};

const KEYBOARDS = {
  "nb-no": ["qwertyuiopå", "asdfghjkløæ", "zxcvbnm"],
  "nn-no": ["qwertyuiopå", "asdfghjkløæ", "zxcvbnm"],
} as const;

export const useKeyboard = (): string[] => {
  const lang = useRecoilValue(language);
  // @ts-expect-error
  return KEYBOARDS[lang] ?? [];
};

export const useAlphabet = () => {
  const keyboard = useKeyboard();
  return new Set(keyboard.join("").split(""));
};

export const useGameKey = () => {
  return useRecoilState(gameKey);
};

export const useWords = () => {
  return useRecoilValue(wordLookup);
};

export const useWord = () => {
  const bank = useRecoilValue(wordBank) ?? [];
  const { gameId } = useParams();
  const hash = hashCode(gameId ?? "");
  return bank[hash % bank.length];
};

export const useGuess = () => {
  const [guessV, setGuessV] = useRecoilState(guess);
  const setGuesses = useSetRecoilState(guesses);
  const alphabet = useAlphabet();
  const dictionary = useWords();

  return {
    word: guessV,
    letters: new Set(guessV.split("").map((l) => l.toLocaleLowerCase())),
    add: (letter: string) => {
      const l = letter.toLocaleLowerCase();
      if (!alphabet.has(l)) {
        return;
      }
      setGuessV((v) => `${v}${l}`.substring(0, 5));
    },
    remove: () => setGuessV((v) => v.substring(0, Math.max(0, v.length - 1))),
    commit: () => {
      if (!guessV) {
        return;
      }

      if (guessV.length !== 5) {
        return;
      }

      setGuesses((g) => [...g, guessV]);
      setGuessV("");
    },
  };
};
