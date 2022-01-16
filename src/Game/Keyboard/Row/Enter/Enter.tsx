import { useCallback, useEffect } from "react";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import { useGuess } from "../../..";
import classes from "../Row.module.css";

const Enter = () => {
  const { commit } = useGuess();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== "Enter") {
        return;
      }

      commit();
    },
    [commit]
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
        commit();
        navigator.vibrate(10);
      }}
    >
      <MdOutlineKeyboardReturn />
    </div>
  );
};

export default Enter;
