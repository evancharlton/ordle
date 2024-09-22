import { useEffect } from "react";
import { useStorageKey } from "./hooks";
import { GuessMap, useGuesses } from "../../../Game";

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
        return {};
      }

      const stored = localStorage.getItem(key);
      if (!stored) {
        return {};
      }

      const parsed = (() => {
        try {
          return JSON.parse(stored);
        } catch {
          return {};
        }
      })();

      if (!parsed) {
        return {};
      }

      const keys = Object.keys(parsed);
      if (keys.length === 0) {
        return {};
      }

      if (
        !keys.every((item) => typeof item === "string" && item.length === 5)
      ) {
        return {};
      }

      return parsed as GuessMap;
    })();

    setGuesses(guesses);
  }, [key, setGuesses]);

  return <>{children}</>;
};

export default StateLoader;
