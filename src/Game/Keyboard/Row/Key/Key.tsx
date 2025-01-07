import { useCallback, useEffect } from "react";
import { useLetterMap } from "../..";
import { useGuess, useSettings } from "../../../guess";
import classes from "./Key.module.css";
import buttonClasses from "../Row.module.css";

type Props = {
  letter: string;
  enabled: boolean;
};

const Key = ({ letter, enabled }: Props) => {
  const { add } = useGuess();
  const { hapticFeedback } = useSettings();
  const state = useLetterMap(letter);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) {
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        return;
      }

      if (e.key.toLocaleLowerCase() !== letter) {
        return;
      }

      add(letter);
    },
    [add, letter, enabled],
  );

  const onClick = useCallback(() => {
    if (!enabled) {
      return;
    }

    add(letter);
    if (hapticFeedback) {
      navigator.vibrate(10);
    }
  }, [add, letter, enabled, hapticFeedback]);

  useEffect(() => {
    window.addEventListener("keypress", onKeyDown);
    return () => {
      window.removeEventListener("keypress", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div
      className={[
        classes.letter,
        enabled && state === "yes" && buttonClasses.yes,
        enabled && state === "maybe" && buttonClasses.maybe,
        state === "no" && buttonClasses.no,
        enabled && state === "unknown" && buttonClasses.unknown,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {letter}
    </div>
  );
};

export default Key;
