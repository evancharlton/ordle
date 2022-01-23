import firebase, { useLogin } from "../sync";
import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { FaGoogle as GoogleIcon, FaGithub as GithubIcon } from "react-icons/fa";
import Dialog from "../Dialog";
import classes from "./UserDialog.module.css";
import Loading from "../Loading";

type Props = {
  onClose: () => void;
};

const UserDialog = ({ onClose }: Props) => {
  const { userId } = useLogin();
  const [signingIn, setSigningIn] = useState(false);

  const performLogin = useCallback((provider: firebase.auth.AuthProvider) => {
    setSigningIn(true);
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(console.error)
      .finally(() => setSigningIn(false));
  }, []);

  const modal = useMemo(() => {
    if (signingIn) {
      return (
        <Dialog title="Logger på &hellip;">
          <Loading />
        </Dialog>
      );
    }

    if (userId) {
      return (
        <Dialog title="Din konto" onClose={onClose}>
          <div className={classes.info}>
            Du er nå logget inn -- fremgangen din er lagret og vil være
            tilgjengelig på andre enheter hvor du er logget inn. Hvis du logger
            ut, fremgangen din vil bli lagret til neste gang.
          </div>
          <div className={classes.buttons}>
            <button
              className={classes.logout}
              onClick={() =>
                firebase
                  .auth()
                  .signOut()
                  .finally(() => setSigningIn(false))
              }
            >
              Logg ut
            </button>
          </div>
        </Dialog>
      );
    }

    return (
      <Dialog title="Lagre fremgangen" onClose={onClose}>
        <div className={classes.info}>
          Hvis du logger på, er det mulig å løse puslespillet på flere enheter.
          Finn ord på mobil på bussen, og fortsett spille hjemme på
          datamaskinen!
        </div>
        <div className={classes.buttons}>
          <button
            className={classes.login}
            onClick={() => performLogin(new firebase.auth.GoogleAuthProvider())}
          >
            <GoogleIcon />
          </button>
          <button
            className={classes.login}
            onClick={() => performLogin(new firebase.auth.GithubAuthProvider())}
          >
            <GithubIcon />
          </button>
        </div>
      </Dialog>
    );
  }, [onClose, performLogin, signingIn, userId]);

  const portal = createPortal(modal, document.body);

  return <>{portal}</>;
};

export default UserDialog;
