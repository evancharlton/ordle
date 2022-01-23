import { useLogin } from "../../../sync";
import UploadInitialLocalStorage from "./UploadInitialLocalStorage";
import UploadNewLocalGuesses from "./UploadNewLocalGuesses";
import InsertNewRemoteGuesses from "./InsertNewRemoteGuesses";
import { useStorageKey } from "../StateLoader";

type Props = {
  children: React.ReactNode;
};

const FirebaseSyncer = ({ children }: Props) => {
  const key = useStorageKey();
  const { userId } = useLogin();

  if (!userId) {
    return <>{children}</>;
  }

  const path = `/users/${userId}/${key}`;

  // TODO: In the future, consider inlining each of these into their respective
  // components. That is, until things have been uploaded, don't download the
  // remote set. And don't watch for new words until the initial set has been
  // downloaded. Etc.
  return (
    <UploadInitialLocalStorage node={path}>
      <UploadNewLocalGuesses node={path}>
        <InsertNewRemoteGuesses node={path}>
          <>{children}</>
        </InsertNewRemoteGuesses>
      </UploadNewLocalGuesses>
    </UploadInitialLocalStorage>
  );
};

export default FirebaseSyncer;
