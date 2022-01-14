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
        return (
          <div>
            <h1>😔</h1>
            <p>Ordet var:</p>
            <Word word={word} />
          </div>
        );
      case "found-word":
        return (
          <div>
            <h1>🎉</h1>
            <p>Bra jobbet! Du funnet ordet:</p>
            <Word word={word} />
          </div>
        );
      default:
        return null;
    }
  }, [state, word]);

  if (!content) {
    return null;
  }

  return (
    <div className={classes.overlay}>
      {content}
      <button onClick={newGame} className={classes.newGame}>
        Nytt spill
      </button>
    </div>
  );
};

export default EndOverlay;
