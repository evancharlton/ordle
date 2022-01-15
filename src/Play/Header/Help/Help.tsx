import { useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { MdInfoOutline } from "react-icons/md";
import classes from "./Help.module.css";
import Dialog from "../../../Dialog";
import Letter from "../../Grid/Letter";
import { useParams } from "react-router";

const Help = () => {
  const { lang } = useParams();
  const key = ["ordle", lang, "help-dialog"].join("/");
  const [showing, setShowing] = useState(() => {
    const shownTimestamp = localStorage.getItem(key);
    return !shownTimestamp;
  });

  const onClose = useCallback(() => {
    setShowing(false);
    localStorage.setItem(key, String(Date.now()));
  }, [key]);

  const modal = useMemo(() => {
    if (showing) {
      return (
        <Dialog title="Ordle" onClose={onClose}>
          <div>
            <p>
              <strong>Ordle</strong> er en norsk variant av{" "}
              <a
                href="https://www.powerlanguage.co.uk/wordle/"
                target="wordle"
                rel="noreferrer noopener"
              >
                Wordle
              </a>
              . Det er bare for gøy og for å lære norsk.
            </p>
            <hr />
            <div className={classes.section}>
              Hver spill har et hemmelig ord som har fem karakterer. Du får seks
              forsøk for å finne det riktige ord. Lykke til!
            </div>
            <hr />
            <div className={classes.section}>
              <Letter letter="ø" mode="yes" />
              <p>
                Hvis en bokstav ser ut som dette, du har funnet da det er den
                riktige bokstaven i den riktige plassen. Bra!
              </p>
            </div>
            <div className={classes.section}>
              <Letter letter="ø" mode="maybe" />
              <p>
                Hvis en bokstav ser ut som dette, du har funnet en riktig
                bokstav, men plassen er feil.
              </p>
            </div>
            <div className={classes.section}>
              <Letter letter="ø" mode="no" />
              <p>
                Hvis en bokstav ser ut som dette, bokstaven er ikke i ordet.
              </p>
            </div>
          </div>
        </Dialog>
      );
    }
    return null;
  }, [showing, onClose]);

  const portal = createPortal(showing ? modal : null, document.body);

  return (
    <div
      className={classes.helpIcon}
      role="button"
      onClick={() => setShowing(true)}
    >
      <MdInfoOutline />
      {portal}
    </div>
  );
};

export default Help;
