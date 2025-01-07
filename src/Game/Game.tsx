import Grid from "./Grid";
import Keyboard from "./Keyboard";
import classes from "./Game.module.css";
import burgerClasses from "./Burger.module.css";
import { Action, HamburgerMenu } from "../spa-components/HamburgerMenu";
import {
  MdInfoOutline,
  MdOutlineAutorenew,
  MdOutlineLink,
  MdSettings,
} from "react-icons/md";
import { ComponentProps, useState } from "react";
import { useEndState, useNewGame } from "./control";
import { ShareDialog } from "../spa-components/ShareDialog";
import { useGameNumber } from "../App/Setup/GameLoader";
import { OtherApps } from "../spa-components/HamburgerMenu/OtherApps";
import SettingsDialog from "../SettingsDialog";
import { Modal } from "../spa-components/Modal";
import { useCurrentUrl, useShareText } from "./useShareText";

const useSharingText = () => {
  const endState = useEndState();
  const shareText = useShareText();
  const gameNumber = useGameNumber();

  if (!endState) {
    // They're still playing
    return `Jeg prøver å løse Ordle #${gameNumber}!`;
  }

  return shareText;
};

const Burger = () => {
  const [dialog, setDialog] = useState<
    "hamburger" | "share" | "settings" | "about" | undefined
  >(undefined);

  const newGame = useNewGame();
  const shareText = useSharingText();

  return (
    <>
      <HamburgerMenu
        open={dialog === "hamburger"}
        onClose={() => setDialog((v) => (v === "hamburger" ? undefined : v))}
        onOpen={() => setDialog("hamburger")}
      >
        <Action
          icon={MdOutlineLink}
          text="Del puslespill"
          onClick={() => {
            setDialog("share");
          }}
        />
        <div className={burgerClasses.filler}>{/* TODO */}</div>
        <Action
          icon={MdOutlineAutorenew}
          text="Nytt puslespill"
          onClick={() => {
            newGame();
            setDialog(undefined);
          }}
        />
        <Action
          icon={MdSettings}
          text="Instillinger"
          onClick={() => setDialog("settings")}
        />
        <Action
          icon={MdInfoOutline}
          text="Om Ordle"
          onClick={() => setDialog("about")}
        />
        <OtherApps />
      </HamburgerMenu>
      <ShareDialog
        open={dialog === "share"}
        onClose={() => setDialog((v) => (v === "share" ? undefined : v))}
        shareText={shareText}
        url={useCurrentUrl()}
      />
      <SettingsDialog
        open={dialog === "settings"}
        onClose={() => setDialog((v) => (v === "settings" ? undefined : v))}
      />
      <AboutDialog
        open={dialog === "about"}
        onClose={() => setDialog((v) => (v === "about" ? undefined : v))}
      />
    </>
  );
};

const AboutDialog = (
  props: Pick<ComponentProps<typeof Modal>, "open" | "onClose">
) => {
  return (
    <Modal title="Om Ordle" {...props}>
      <p>
        <strong>Ordle</strong> er et ordspill som ble inspirert av{" "}
        <a
          href="https://www.nytimes.com/games/wordle/index.html"
          target="_blank"
          rel="noopener nofollow noreferer"
        >
          Wordle
        </a>
        . Det er kun for gøy og for lære norsk.
      </p>
      <p>
        Dette er et{" "}
        <a
          href="https://github.com/evancharlton/ordle"
          target="_blank"
          rel="noopener noreferer nofollow"
        >
          åpen kildekode-program
        </a>{" "}
        fra{" "}
        <a href="https://evancharlton.com" target="_blank">
          Evan Charlton.
        </a>{" "}
        Bidrag velkommen!
      </p>
      <p>
        Spørsmål?{" "}
        <a href="mailto:evancharlton@gmail.com?subject=Ordle">
          evancharlton@gmail.com
        </a>
      </p>
    </Modal>
  );
};

const Game = () => {
  return (
    <div className={classes.container}>
      <Burger />
      <Grid />
      <Keyboard />
    </div>
  );
};

export default Game;
