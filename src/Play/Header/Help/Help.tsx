import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { MdInfoOutline } from "react-icons/md";
import classes from "./Help.module.css";
import Dialog from "../../../Dialog";
import Letter from "../../Grid/Letter";

const Help = () => {
  const [showing, setShowing] = useState(false);

  const modal = useMemo(() => {
    if (showing) {
      return (
        <Dialog title="Om Ordle" onClose={() => setShowing(false)}>
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
              . Det er bare for gøy og å lære norsk.
            </p>
            <hr />
            <p>
              Hver spill har et ord som fem karakterer. Du får seks forsøk for å
              finne det riktige ord.
            </p>
            <p>
              Hvis en bokstav ser ut som dette, du har funnet da det er den
              riktige bokstaven i den riktige plassen. Bra!
              <Letter letter="ø" mode="yes" />
            </p>
            <p>
              Hvis en bokstav ser ut som dette, du har funnet en riktig bokstav,
              men plassen er feil.
              <Letter letter="ø" mode="maybe" />
            </p>
            <p>
              Hvis en bokstav ser ut som dette, bokstaven er ikke i ordet.
              <Letter letter="ø" mode="no" />
            </p>
          </div>
        </Dialog>
      );
    }
    return null;
  }, [showing, setShowing]);

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
