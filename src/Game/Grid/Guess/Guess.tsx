import classes from "./Guess.module.css";
import { useMemo } from "react";
import Letter from "../Letter";
import { useWord } from "../../../App/Setup/DataLoader";

type Props = {
  guess: string;
};

const Guess = ({ guess }: Props) => {
  const word = useWord();

  const letters = useMemo(() => {
    const out = new Array(0);

    const letters = word
      .split("")
      .reduce<Record<string, number>>(
        (acc, l) => ({ ...acc, [l]: (acc[l] || 0) + 1 }),
        {}
      );

    // Find everything that's correct.
    for (let i = 0; i < 5; i += 1) {
      if (guess[i] !== word[i]) {
        continue;
      }

      out[i] = <Letter key={i} mode="yes" letter={guess[i]} />;
      letters[guess[i]] -= 1;
    }

    // Find everything that's right, but in the wrong spot.
    for (let i = 0; i < 5; i += 1) {
      if (out[i]) {
        continue;
      }

      if (!letters[guess[i]]) {
        continue;
      }
      out[i] = <Letter key={i} mode="maybe" letter={guess[i]} />;
      letters[guess[i]] -= 1;
    }

    // Everything else is wrong
    for (let i = 0; i < 5; i += 1) {
      if (out[i]) {
        continue;
      }

      out[i] = <Letter key={i} mode="no" letter={guess[i]} />;
    }

    return out;
  }, [word, guess]);

  return <div className={classes.guess}>{letters}</div>;
};

export default Guess;
