import { useEffect } from "react";
import { GuessMap, isGuessMap } from "../../../Game";
import firebase, { useLogin } from "../../../sync";

type Props = {
  children: React.ReactNode;
  node: string;
};

const UploadInitialLocalStorage = ({ children, node }: Props) => {
  const { path } = useLogin();

  useEffect(() => {
    if (!path) {
      return;
    }

    const values: Record<string, GuessMap> = {};
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (!key) {
        continue;
      }

      if (!key.startsWith("ordle/")) {
        continue;
      }

      const parts = key.split("/");
      const word = parts[2];
      if (!word) {
        continue;
      }

      if (word.length !== 5) {
        // This is not a pointer to a game.
        continue;
      }

      const value = localStorage.getItem(key);
      if (!value) {
        continue;
      }

      const parsed = (() => {
        try {
          return JSON.parse(value);
        } catch (ex) {
          console.error(ex);
          return {};
        }
      })();

      if (!isGuessMap(parsed)) {
        continue;
      }

      if (Object.keys(parsed).length === 0) {
        continue;
      }

      values[key] = parsed;
    }

    if (Object.keys(values).length === 0) {
      return;
    }

    firebase.database().ref(path).update(values);
  }, [path]);

  return <>{children}</>;
};

export default UploadInitialLocalStorage;
