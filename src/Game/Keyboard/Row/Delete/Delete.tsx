import { useCallback, useEffect, useRef } from "react";
import { MdOutlineBackspace } from "react-icons/md";
import { useGuess, useSettings } from "../../..";
import classes from "../Row.module.css";

const Delete = () => {
  const { word, remove } = useGuess();
  const { hapticFeedback } = useSettings();

  const hasLetters = useRef(false);
  hasLetters.current = word.length > 0;

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== "Backspace") {
        return;
      }

      if (!hasLetters.current) {
        return;
      }

      remove();
      e.preventDefault();
    },
    [remove],
  );

  const onClick = useCallback(() => {
    if (!hasLetters.current) {
      return;
    }

    remove();
    if (hapticFeedback) {
      navigator.vibrate(10);
    }
  }, [remove, hapticFeedback]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div
      className={[
        classes.actionKey,
        hasLetters.current ? classes.unknown : classes.no,
      ].join(" ")}
      role="button"
      onClick={onClick}
    >
      <MdOutlineBackspace />
    </div>
  );
};

export default Delete;
