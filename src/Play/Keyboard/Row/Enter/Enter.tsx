import { useCallback, useEffect } from "react";
import { useGuess } from "../../../../state";
import { MdOutlineKeyboardReturn } from "react-icons/md";
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
    <div className={classes.actionKey} role="button" onClick={commit}>
      <MdOutlineKeyboardReturn />
    </div>
  );
};

export default Enter;