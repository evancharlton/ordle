import { useCallback, useEffect } from "react";
import { useGuess } from "../../../../state";

const Delete = () => {
  const { remove } = useGuess();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== "Backspace") {
        return;
      }

      remove();
    },
    [remove]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return <div>Delete</div>;
};

export default Delete;
