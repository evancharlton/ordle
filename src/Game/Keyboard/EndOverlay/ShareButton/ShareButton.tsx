import { useCallback, useMemo, useState } from "react";
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

  const url = `${window.location.protocol}//${window.location.host}/#/${lang}/${gameNumber}`;
  const text = [`Ordle #${gameNumber}`, ``, emojis].join("\n");
  const payload = useMemo(() => ({ text, url }), [text, url]);

  const [shareMode, setShareMode] = useState<"share" | "copy" | null>(() => {
    if (!!navigator.share && navigator.canShare(payload)) {
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
          .share(payload)
          .catch(() => setShareMode("copy"))
          .finally(() => {
            setState("done");
          });
        break;
      }

      case "copy": {
        setState("pending");
        navigator.clipboard
          .writeText([payload.text, "", url].join("\n"))
          .catch(() => setShareMode(null))
          .finally(() => {
            setState("done");
          });
        break;
      }
    }
  }, [shareMode, payload, url]);

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
