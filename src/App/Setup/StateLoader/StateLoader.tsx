import { useEffect } from "react";
import { useGuesses, useStorageKey } from "../../../state";

type Props = {
  children: React.ReactNode;
};

const StateLoader = ({ children }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setGuesses] = useGuesses();
  const key = useStorageKey();

  useEffect(() => {
    const guesses = (() => {
      if (!key) {
        return [];
      }

      const stored = localStorage.getItem(key);
      if (!stored) {
        return [];
      }

      const parsed = (() => {
        try {
          return JSON.parse(stored);
        } catch (ex) {
          return [];
        }
      })();

      if (!parsed) {
        return [];
      }

      if (!Array.isArray(parsed)) {
        return [];
      }

      if (
        !parsed.every((item) => typeof item === "string" && item.length === 5)
      ) {
        return [];
      }

      return parsed;
    })();

    setGuesses(guesses);
  }, [key, setGuesses]);

  return <>{children}</>;
};

export default StateLoader;
