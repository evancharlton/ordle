import { useParams, useHref } from "react-router";
import { useGameNumber, useWord } from "../App/Setup/GameLoader";
import { useGuesses } from "./guess";

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

export const useCurrentUrl = () => {
  const number = useGameNumber();
  const { lang } = useParams();

  const href = useHref(`/${lang}/${number}`);
  return `${location.protocol}//${location.host}/${href}`;
};

export const useShareText = () => {
  const emojis = useEmojiGrid();
  const gameNumber = useGameNumber();

  return [`Ordle #${gameNumber}`, "", emojis].join("\n");
};
