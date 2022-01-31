import firebase, { useLogin } from "../sync";
import { useCallback, useState } from "react";
import { FaGoogle as GoogleIcon, FaGithub as GithubIcon } from "react-icons/fa";
import classes from "./SettingsDialog.module.css";
import Loading from "../Loading";
import Segment from "../Accordion/Segment";
import type { Props as SegmentProps } from "../Accordion/Segment";

const UserSegment = (props: Pick<SegmentProps, "id">) => {
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

  if (signingIn) {
    return (
      <Segment {...props} title="Logger på&hellip;">
        <Loading />
      </Segment>
    );
  }

  if (userId) {
    return (
      <Segment {...props} title="Logget på">
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
      </Segment>
    );
  }

  return (
    <Segment {...props} title="Logg på">
      <div className={classes.info}>
        Hvis du logger på, er det mulig å løse puslespillet på flere enheter.
        Finn ord på mobil på bussen, og fortsett spille hjemme på datamaskinen!
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
    </Segment>
  );
};

export default UserSegment;
