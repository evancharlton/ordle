import { useCallback, useState } from "react";
import { useGuesses } from "../../..";
import { MdOutlineShare, MdContentCopy } from "react-icons/md";
import { useGameNumber, useWord } from "../../../../App/Setup/DataLoader";
import classes from "./ShareButton.module.css";
import { useParams } from "react-router";

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
    .reduce<Record<string, number>>(
      (acc, l) => ({ ...acc, [l]: (acc[l] || 0) + 1 }),
      {}
    );

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

const ShareButton = () => {
  const emojis = useEmojiGrid();
  const gameNumber = useGameNumber();
  const { lang } = useParams();

  const url = [
    window.location.origin,
    window.location.pathname.replace(/\/$/, ""),
    `/#/${lang}/${gameNumber}`,
  ].join("");

  const text = [`Ordle #${gameNumber}`, "", emojis, "", url].join("\n");

  const [shareMode, setShareMode] = useState<"share" | "copy" | null>(() => {
    if (!!navigator.share && navigator.canShare({ text })) {
      return "share";
    }

    if (navigator.clipboard) {
      return "copy";
    }

    return null;
  });

  const [state, setState] = useState<"never" | "pending" | "done">("never");

  const onClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
    switch (shareMode) {
      case "share": {
        setState("pending");
        navigator
          .share({ text })
          .catch(() => setShareMode("copy"))
          .finally(() => {
            setState("done");
          });
        break;
      }

      case "copy": {
        setState("pending");
        navigator.clipboard
          .writeText(text)
          .catch(() => setShareMode(null))
          .finally(() => {
            setState("done");
          });
        break;
      }
    }
  }, [shareMode, text]);

  if (!shareMode) {
    return null;
  }

  return (
    <div
      className={[
        classes.shareIcon,
        state === "never" && classes.never,
        state === "pending" && classes.pending,
        state === "done" && classes.done,
      ]
        .filter(Boolean)
        .join(" ")}
      role="button"
      onClick={onClick}
    >
      {shareMode === "copy" && <MdContentCopy />}
      {shareMode === "share" && <MdOutlineShare />}
    </div>
  );
};

export default ShareButton;
