import { useMemo } from "react";
import { useWords } from "../../../App/Setup/DataLoader";
import { useWord } from "../../../App/Setup/GameLoader";
import { getLegality } from "../../../utils";
import { useGuesses, useSettings } from "../../guess";
import classes from "./Remainder.module.css";

const format = (v: number) => {
  if (v < 1_000) {
    return v;
  }
  const thousands = Math.floor(v / 1000);
  const hundreds = `000${v % 1000}`.substr(-3);
  return `${thousands}${String.fromCharCode(0xa0)}${hundreds}`;
};

export const usePossibilities = (guesses: string[]) => {
  const { showRemaining } = useSettings();

  const words = useWords();
  const word = useWord();
  return useMemo(() => {
    if (!showRemaining) {
      return {
        remainders: [],
        formattedCount: format(0),
      };
    }

    let filtered = [...words];
    guesses.forEach((guess) => {
      const test = getLegality(word, guess);
      filtered = filtered.filter((w) => test(w) === "yes");
    });
    return { remainders: filtered, formattedCount: format(filtered.length) };
  }, [guesses, showRemaining, word, words]);
};

const Remainder = () => {
  const [guessMap] = useGuesses();
  const guesses = Object.keys(guessMap);
  const { remainders, formattedCount } = usePossibilities(guesses);
  if (!remainders || remainders.length === 0) {
    return null;
  }

  return (
    <div className={classes.message}>
      mulige ord: <span className={classes.count}>{formattedCount}</span>
    </div>
  );
};

export default Remainder;
