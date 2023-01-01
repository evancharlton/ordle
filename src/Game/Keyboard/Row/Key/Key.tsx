import { useCallback, useEffect, useRef } from "react";
import { useLetterMap } from "../..";
import { useGuess } from "../../..";
import classes from "./Key.module.css";
import buttonClasses from "../Row.module.css";

type Props = {
  letter: string;
  enabled: boolean;
};

const Key = ({ letter, enabled }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { add } = useGuess();

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
      ref.current?.focus();
    },
    [add, letter, enabled]
  );

  const onClick = useCallback(() => {
    if (!enabled) {
      return;
    }

    add(letter);
    navigator.vibrate(10);
  }, [add, letter, enabled]);

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
        enabled && state === "yes" && buttonClasses.yes,
        enabled && state === "maybe" && buttonClasses.maybe,
        state === "no" && buttonClasses.no,
        enabled && state === "unknown" && buttonClasses.unknown,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      role="button"
      ref={ref}
      tabIndex={0}
    >
      {letter}
    </div>
  );
};

export default Key;
