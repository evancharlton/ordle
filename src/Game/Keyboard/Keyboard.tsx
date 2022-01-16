import Row from "./Row";
import classes from "./Keyboard.module.css";
import ErrorMessage from "../../ErrorMessage";
import EndOverlay from "./EndOverlay";
import { useKeyboard } from "./hooks";
import { KeyboardContext, KeyboardContextType } from "./context";
import { useMemo } from "react";
import { useGuesses } from "..";
import { useWord } from "../../App/Setup/DataLoader";

type Props = {} & Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "style" | "className"
>;

export const Keyboard = (props: Props) => {
  const keyboard = useKeyboard();
  const [guesses] = useGuesses();
  const word = useWord();

  const letterMap: KeyboardContextType["letterMap"] = useMemo(() => {
    const letterMap: KeyboardContextType["letterMap"] = {};

    for (let i = 0; i < guesses.length; i += 1) {
      const guess = guesses[i];
      for (let j = 0; j < guess.length; j += 1) {
        const letter = guess[j];

        // Right place, right letter
        if (letter === word[j]) {
          letterMap[letter] = "yes";
          continue;
        }

        if (letterMap[letter] === "yes") {
          // We've already processed this; and we don't want to overwrite this
          // with something less-accurate
          continue;
        }

        // Right letter, wrong place
        if (word.includes(letter)) {
          letterMap[letter] = "maybe";
          continue;
        }

        if (letterMap[letter] === "maybe") {
          // We've already processed this; and we don't want to overwrite this
          // with something less-accurate
          continue;
        }

        letterMap[letter] = "no";
      }
    }

    return letterMap;
  }, [guesses, word]);

  return (
    <KeyboardContext.Provider value={{ letterMap }}>
      <div
        {...props}
        className={[props.className, classes.keyboard]
          .filter(Boolean)
          .join(" ")}
      >
        {keyboard.map((row, i) => (
          <Row key={row} row={row} final={i === keyboard.length - 1} />
        ))}
        <ErrorMessage />
        <EndOverlay />
      </div>
    </KeyboardContext.Provider>
  );
};
