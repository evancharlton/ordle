import { useCallback, useEffect, useRef } from "react";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import { useGuess, useSettings } from "../../../guess";
import classes from "../Row.module.css";

const Enter = () => {
  const { word, commit } = useGuess();
  const { hapticFeedback } = useSettings();
  const enoughLetters = useRef(false);
  enoughLetters.current = word.length === 5;

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== "Enter") {
        return;
      }

      if (!enoughLetters.current) {
        return;
      }

      commit();

      try {
        // @ts-expect-error
        document.activeElement?.blur();
      } catch {}
    },
    [commit]
  );

  const onClick = useCallback(() => {
    if (!enoughLetters.current) {
      return;
    }

    commit();
    if (hapticFeedback) {
      navigator.vibrate(10);
    }
  }, [commit, hapticFeedback]);

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
        enoughLetters.current ? classes.yes : classes.no,
      ].join(" ")}
      role="button"
      onClick={onClick}
    >
      <MdOutlineKeyboardReturn />
    </div>
  );
};

export default Enter;
