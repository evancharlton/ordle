import { useWord } from "../../../App/Setup/DataLoader";
import { useEndState, useNewGame } from "../../control";
import classes from "./EndOverlay.module.css";

const Word = ({ word }: { word: string }) => (
  <h2>
    <a
      href={`https://naob.no/søk/${word}`}
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
  const newGame = useNewGame();

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
        <button onClick={newGame} className={classes.newGame}>
          Nytt spill
        </button>
      </div>
    </div>
  );
};

export default EndOverlay;
