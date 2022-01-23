import { useEffect } from "react";

const FOUND_WORD = "found-word";

export type GuessInfo = {
  guess: string;
  when: Date;
  source: "local" | "remote";
};

export class NewGuess extends CustomEvent<GuessInfo> {
  constructor(guess: string, when: Date, source: GuessInfo["source"]) {
    super(FOUND_WORD, {
      detail: { guess, when, source },
    });
  }
}

export const useGuessAdded = (callback: (guessInfo: GuessInfo) => void) => {
  useEffect(() => {
    const wrapper = (e: Event) => {
      const { detail: info } = e as CustomEvent<GuessInfo>;
      callback(info);
    };

    window.addEventListener(FOUND_WORD, wrapper);
    return () => {
      window.removeEventListener(FOUND_WORD, wrapper);
    };
  }, [callback]);
};
