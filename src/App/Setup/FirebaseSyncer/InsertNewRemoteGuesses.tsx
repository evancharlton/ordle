import { useCallback, useEffect } from "react";
import { useGuesses } from "../../../Game";
import firebase from "../../../sync";

type Props = {
  children: React.ReactNode;
  node: string;
};

const InsertNewRemoteGuesses = ({ children, node }: Props) => {
  const setGuesses = useGuesses()[1];

  const onNewGuess = useCallback(
    (snap: firebase.database.DataSnapshot) => {
      const { key } = snap;
      if (!key) {
        return;
      }

      setGuesses((g) => {
        if (g[key]) {
          return g;
        }
        return { ...g, [key]: snap.val() };
      });
    },
    [setGuesses]
  );

  useEffect(() => {
    const ref = firebase.database().ref(node);
    ref.on("child_added", onNewGuess);
    return () => {
      ref.off("child_added", onNewGuess);
    };
  }, [node, onNewGuess]);

  return <>{children}</>;
};

export default InsertNewRemoteGuesses;
