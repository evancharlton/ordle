import { useWord } from "../../../App/Setup/GameLoader";
import Random from "../../../Random";
import { ShareButton } from "../../../spa-components/ShareButton";
import { useEndState } from "../../control";
import classes from "./EndOverlay.module.css";
import { useCurrentUrl, useShareText } from "../../useShareText";

const Word = ({ word }: { word: string }) => (
  <h2>
    <a
      href={`https://naob.no/søk?q=${word}`}
      target="naob"
      rel="noreferrer noopener"
    >
      {word}
    </a>
  </h2>
);

const EMOJIS = {
  "no-guesses": "😔",
  "found-word": "🎉",
} as const;

const EndOverlay = () => {
  const state = useEndState();
  const word = useWord();
  const text = useShareText();
  const url = useCurrentUrl();

  if (!state) {
    return null;
  }

  const emoji = EMOJIS[state];
  if (!emoji) {
    return null;
  }

  return (
    <div className={classes.overlay}>
      <div className={classes.column}>
        <div className={classes.emoji}>{emoji}</div>
      </div>
      <div className={classes.column}>
        <Word word={word} />
        <div className={classes.actions}>
          <Random />
          <ShareButton shareText={[text, "", url].join("\n")} />
        </div>
      </div>
    </div>
  );
};

export default EndOverlay;
