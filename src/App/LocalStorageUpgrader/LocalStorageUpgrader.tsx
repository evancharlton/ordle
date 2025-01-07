import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

// 1: Array-based guesses
// 2: guess -> timestamp
const CURRENT_VERSION = 2;
const VERSION_KEY = "ordle/storageVersion";

const LocalStorageUpgrader = ({ children }: Props) => {
  const [storageVersion, setStorageVersion] = useState(
    () => +(localStorage.getItem(VERSION_KEY) ?? 1),
  );

  useEffect(() => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("ordle/"))
      .forEach((key) => {
        const value = localStorage.getItem(key);
        if (!value) {
          return;
        }

        const parsed = (() => {
          try {
            return JSON.parse(value);
          } catch (ex) {
            return [];
          }
        })();

        if (!parsed) {
          return;
        }

        if (parsed.length === 0) {
          return;
        }

        if (!Array.isArray(parsed)) {
          return;
        }

        const updatedValue = parsed
          .filter((item) => typeof item === "string" && item.length === 5)
          .reduce(
            (acc, guess, i) => ({
              ...acc,
              [guess]: 1_000_000 + i * 10,
            }),
            {},
          );

        localStorage.setItem(`backup/${key}`, value);
        localStorage.setItem(key, JSON.stringify(updatedValue));
      });

    setStorageVersion(CURRENT_VERSION);
    localStorage.setItem(VERSION_KEY, String(CURRENT_VERSION));
  }, [storageVersion]);

  if (storageVersion !== CURRENT_VERSION) {
    return null;
  }

  return <>{children}</>;
};

export default LocalStorageUpgrader;
