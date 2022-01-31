import { useLogin } from "../../../sync";
import UploadInitialLocalStorage from "./UploadInitialLocalStorage";
import UploadNewLocalGuesses from "./UploadNewLocalGuesses";
import InsertNewRemoteGuesses from "./InsertNewRemoteGuesses";
import UploadSettings from "./UploadSettings";
import InsertSettings from "./InsertSettings";
import { useStorageKey } from "../StateLoader";
import { useParams } from "react-router";

type Props = {
  children: React.ReactNode;
};

const FirebaseSyncer = ({ children }: Props) => {
  const { lang } = useParams();
  const wordKey = useStorageKey();
  const { userId } = useLogin();

  if (!userId) {
    return <>{children}</>;
  }

  const wordPath = `/users/${userId}/${wordKey}`;
  const settingsPath = `/users/${userId}/ordle/${lang}/_settings`;

  // TODO: In the future, consider inlining each of these into their respective
  // components. That is, until things have been uploaded, don't download the
  // remote set. And don't watch for new words until the initial set has been
  // downloaded. Etc.
  return (
    <UploadInitialLocalStorage node={wordPath}>
      <UploadNewLocalGuesses node={wordPath}>
        <InsertNewRemoteGuesses node={wordPath}>
          <UploadSettings node={settingsPath}>
            <InsertSettings node={settingsPath}>
              <>{children}</>
            </InsertSettings>
          </UploadSettings>
        </InsertNewRemoteGuesses>
      </UploadNewLocalGuesses>
    </UploadInitialLocalStorage>
  );
};

export default FirebaseSyncer;
