import { useParams } from "react-router";
import { useGameNumber, useWord } from "../../../App/Setup/GameLoader";
import Random from "../../../Random";
import { ShareButton } from "../../../spa-components/ShareButton";
import { useEndState } from "../../control";
import { useGuesses } from "../../guess";
import classes from "./EndOverlay.module.css";

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

const useShareText = () => {
  const emojis = useEmojiGrid();
  const gameNumber = useGameNumber();
  const { lang } = useParams();

  const url = [
    window.location.origin,
    window.location.pathname.replace(/\/$/, ""),
    `/#/${lang}/${gameNumber}`,
  ].join("");

  const text = [`Ordle #${gameNumber}`, "", emojis, "", url].join("\n");
  return text;
};

const EndOverlay = () => {
  const state = useEndState();
  const word = useWord();
  const text = useShareText();

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
          <ShareButton shareText={text} />
        </div>
      </div>
    </div>
  );
};

const useEmojiGrid = () => {
  const [guessMap] = useGuesses();
  const word = useWord();
  const guesses = Object.entries(guessMap)
    .sort(([_wordA, timeA], [_wordB, timeB]) => timeA - timeB)
    .map(([guess]) => getEmojis(word, guess).join(""));
  return guesses.join("\n");
};

const getEmojis = (word: string, guess: string) => {
  const out = new Array(0);

  const letters = word
    .split("")
    .reduce<
      Record<string, number>
    >((acc, l) => ({ ...acc, [l]: (acc[l] || 0) + 1 }), {});

  // Find everything that's correct.
  for (let i = 0; i < 5; i += 1) {
    if (guess[i] !== word[i]) {
      continue;
    }
    out[i] = "🟩";
    letters[guess[i]] -= 1;
  }

  // Find everything that's right, but in the wrong spot.
  for (let i = 0; i < 5; i += 1) {
    if (out[i]) {
      continue;
    }

    if (!letters[guess[i]]) {
      continue;
    }
    out[i] = "🟨";
    letters[guess[i]] -= 1;
  }

  // Everything else is wrong
  for (let i = 0; i < 5; i += 1) {
    if (out[i]) {
      continue;
    }

    out[i] = "⬛";
  }

  return out;
};

export default EndOverlay;
