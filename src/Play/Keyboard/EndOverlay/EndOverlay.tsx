import { useMemo } from "react";
import { useEndState, useNewGame, useWord } from "../../../state";
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

const EndOverlay = () => {
  const state = useEndState();
  const word = useWord();
  const newGame = useNewGame();

  const content = useMemo(() => {
    switch (state) {
      case "no-guesses":
        return {
          emoji: "😔",
          message: "Ordet var:",
        };
      case "found-word":
        return {
          emoji: "🎉",
          message: "Bra jobbet! Du har funnet ordet:",
        };
      default:
        return null;
    }
  }, [state]);

  if (!content) {
    return null;
  }

  return (
    <div className={classes.overlay}>
      <div className={classes.column}>
        <div className={classes.emoji}>{content.emoji}</div>
        <button onClick={newGame} className={classes.newGame}>
          Nytt spill
        </button>
      </div>
      <div className={classes.column}>
        <p>{content.message}</p>
        <Word word={word} />
      </div>
    </div>
  );
};

export default EndOverlay;
