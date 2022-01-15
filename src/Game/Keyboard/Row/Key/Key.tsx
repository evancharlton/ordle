import { useCallback, useEffect } from "react";
import { useGuess } from "../../..";
import classes from "./Key.module.css";

type Props = {
  letter: string;
};

const Key = ({ letter }: Props) => {
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

  const onClick = useCallback(() => {
    add(letter);
  }, [add, letter]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div className={classes.letter} onClick={onClick} role="button">
      {letter}
    </div>
  );
};

export default Key;
