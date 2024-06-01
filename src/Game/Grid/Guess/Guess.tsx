import classes from "./Guess.module.css";
import { useMemo } from "react";
import Letter from "../Letter";
import { useWord } from "../../../App/Setup/GameLoader";
import { MdOpenInNew } from "react-icons/md";

type Props = {
  guess: string;
  Icon?: typeof MdOpenInNew;
  onClick?: () => void;
};

const Guess = ({ guess, Icon = MdOpenInNew, onClick }: Props) => {
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
    for (let i = 0; i < word.length; i += 1) {
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

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (onClick) {
      return (
        <div className={classes.guess} onClick={onClick}>
          {children}
        </div>
      );
    }
    return (
      <a
        href={`https://naob.no/søk?q=${guess}`}
        target="_blank"
        rel="noreferrer noopener"
        className={classes.guess}
        onClick={onClick}
      >
        {children}
      </a>
    );
  };

  return (
    <Wrapper>
      <div className={classes.spacer}></div>
      {letters}
      <div className={classes.spacer}>
        <Icon />
      </div>
    </Wrapper>
  );
};

export default Guess;
