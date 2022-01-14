import { useCallback, useEffect } from "react";
import { useGuess } from "../../../../state";

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

  return <div>Enter</div>;
};

export default Enter;
