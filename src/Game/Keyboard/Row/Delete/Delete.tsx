import { useCallback, useEffect } from "react";
import { MdOutlineBackspace } from "react-icons/md";
import { useGuess } from "../../..";
import classes from "../Row.module.css";

const Delete = () => {
  const { remove } = useGuess();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== "Backspace") {
        return;
      }

      remove();
      e.preventDefault();
    },
    [remove]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div
      className={classes.actionKey}
      role="button"
      onClick={() => {
        remove();
        navigator.vibrate(10);
      }}
    >
      <MdOutlineBackspace />
    </div>
  );
};

export default Delete;
