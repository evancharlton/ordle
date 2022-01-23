import { useGuessAdded } from "../../../custom-events";
import type { GuessInfo } from "../../../custom-events";
import { useCallback } from "react";
import firebase from "../../../sync";

type Props = {
  children: React.ReactNode;
  node: string;
};

const UploadNewLocalWords = ({ children, node }: Props) => {
  const onGuessAdded = useCallback(
    ({ guess, when, source }: GuessInfo) => {
      if (source !== "local") {
        return;
      }

      firebase
        .database()
        .ref(node)
        .update({
          [guess]: when,
        });
    },
    [node]
  );

  useGuessAdded(onGuessAdded);

  return <>{children}</>;
};

export default UploadNewLocalWords;
