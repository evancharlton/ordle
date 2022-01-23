import { useGuessAdded } from "../../../custom-events";
import firebase from "../../../sync";

type Props = {
  children: React.ReactNode;
  node: string;
};

const UploadNewLocalGuesses = ({ children, node }: Props) => {
  const ref = firebase.database().ref(node);

  useGuessAdded(({ guess, when, source }) => {
    if (source !== "local") {
      return;
    }

    ref.child(guess).set(when.getTime());
  });

  return <>{children}</>;
};

export default UploadNewLocalGuesses;
