import { useCallback, useEffect } from "react";
import { useLetterMap } from "../..";
import { useGuess } from "../../..";
import classes from "./Key.module.css";

type Props = {
  letter: string;
};

const Key = ({ letter }: Props) => {
  const { add } = useGuess();

  const state = useLetterMap(letter);

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
    <div
      className={[
        classes.letter,
        state === "yes" && classes.yes,
        state === "maybe" && classes.maybe,
        state === "no" && classes.no,
        state === "unknown" && classes.unknown,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      role="button"
    >
      {letter}
    </div>
  );
};

export default Key;
