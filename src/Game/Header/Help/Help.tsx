import { useState, useCallback } from "react";
import { MdOutlineHelpOutline } from "react-icons/md";
import classes from "./Help.module.css";
import Letter from "../../Grid/Letter";
import Accordion from "../../../Accordion";
import Segment from "../../../Accordion/Segment";
import { Modal } from "../../../spa-components/Modal";

const Help = () => {
  const key = ["ordle", "help-dialog"].join("/");
  const [showing, setShowing] = useState(() => {
    const shownTimestamp = localStorage.getItem(key);
    return !shownTimestamp;
  });

  const onClose = useCallback(() => {
    setShowing(false);
    localStorage.setItem(key, String(Date.now()));
  }, [key]);

  return (
    <>
      <button onClick={() => setShowing(true)}>
        <MdOutlineHelpOutline />
      </button>
      <Modal open={showing} title="Ordle" onClose={onClose}>
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
          <Accordion initial="rules" mode="single">
            <Segment id="rules" title="Reglene">
              <div className={classes.section}>
                Hver omgang har et hemmelig ord som består av fem bokstaver. Du
                har seks forsøk på å finne det riktige ordet. Lykke til!
              </div>
              <hr />
              <div className={classes.section}>
                <Letter letter="ø" mode="yes" />
                <p>
                  Hvis en bokstav ser ut som dette, er den riktige bokstaven på
                  den riktige plassen. Bra!
                </p>
              </div>
              <div className={classes.section}>
                <Letter letter="ø" mode="maybe" />
                <p>
                  Hvis en bokstav ser ut som dette, har du funnet en riktig
                  bokstav, men plassen er feil.
                </p>
              </div>
              <div className={classes.section}>
                <Letter letter="ø" mode="no" />
                <p>
                  Hvis en bokstav ser ut som dette, er ikke bokstaven i ordet.
                </p>
              </div>
            </Segment>
            <Segment id="words" title="«Hva er disse ordene?»">
              <p>
                Ordene som brukes i app-en kommer fra{" "}
                <a
                  href="https://nb.no"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nasjonalbibliotekets ordbank
                </a>
                .{" "}
              </p>
              <blockquote>
                Fullformslisten inneholder alle mulige bøyde former av
                oppslagsordene i tråd med gjeldende rettskrivning. Denne
                tabellen inneholder også former som er tenkelige, men i praksis
                brukes sjelden eller aldri.
              </blockquote>
            </Segment>
          </Accordion>
        </div>
      </Modal>
    </>
  );
};

export default Help;
