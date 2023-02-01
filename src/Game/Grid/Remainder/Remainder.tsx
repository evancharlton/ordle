import { useMemo } from "react";
import { useWords } from "../../../App/Setup/DataLoader";
import { useWord } from "../../../App/Setup/GameLoader";
import { getLegality } from "../../../utils";
import { useGuesses, useSettings } from "../../guess";
import classes from "./Remainder.module.css";

const usePossibilities = () => {
  const { showRemaining } = useSettings();

  const words = useWords();
  const word = useWord();
  const [guesses] = useGuesses();
  return useMemo(() => {
    if (!showRemaining) {
      return [];
    }

    let filtered = [...words];
    Object.keys(guesses).forEach((guess) => {
      const test = getLegality(word, guess);
      filtered = filtered.filter((w) => test(w) === "yes");
    });
    return filtered;
  }, [guesses, showRemaining, word, words]);
};

const format = (v: number) => {
  if (v < 1_000) {
    return v;
  }
  const thousands = Math.floor(v / 1000);
  const hundreds = `000${v % 1000}`.substr(-3);
  return `${thousands}${String.fromCharCode(0xa0)}${hundreds}`;
};

const Remainder = () => {
  const remainders = usePossibilities();
  if (!remainders || remainders.length === 0) {
    return null;
  }

  return (
    <div className={classes.message}>
      mulige ord:{" "}
      <span className={classes.count}>{format(remainders.length)}</span>
    </div>
  );
};

export default Remainder;
