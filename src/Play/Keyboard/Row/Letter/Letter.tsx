import { useCallback, useEffect } from "react";
import { useGuess } from "../../../../state";
import classes from "./Letter.module.css";

type Props = {
  letter: string;
};

const Letter = ({ letter }: Props) => {
  const { add } = useGuess();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        return;
      }

      if (e.key.toLocaleLowerCase() !== letter) {
        return;
      }

      add(letter);
    },
    [add, letter]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return <div className={classes.letter}>{letter}</div>;
};

export default Letter;
