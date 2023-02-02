import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import {
  MdRemoveCircleOutline,
  MdOutlineArrowBack,
  MdOutlineClear,
  MdKeyboardReturn,
} from "react-icons/md";
import Guess from "../../../Game/Grid/Guess";
import { ALPHABET } from "../../../Game/Keyboard";
import { Context } from "../../Setup/GameLoader";
import { reducer } from "./reducer";
import classes from "./Builder.module.css";
import { usePossibilities } from "../../../Game/Grid/Remainder";

const Blank: typeof MdRemoveCircleOutline = () => <></>;

export const Builder = () => {
  const [state, dispatch] = useReducer(reducer, {
    mode: "solution",
    solution: "",
    guess: "",
    guesses: [],
    valid: false,
    error: "",
  });
  const { solution, guesses, guess, error, mode, valid } = state;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        return;
      }

      if (e.code === "Enter") {
        dispatch({ mode: "commit" });
        return;
      }

      if (e.code === "Backspace") {
        dispatch({ mode: "remove-letter" });
        return;
      }

      const letter = e.key.toLocaleLowerCase();
      if (!ALPHABET[letter]) {
        return;
      }
      dispatch({ mode: "add-letter", letter });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const onGuessClick = useCallback(
    (guess: string) => () => {
      dispatch({ mode: "remove-guess", guess });
    },
    []
  );

  const renderedGuesses = useMemo(() => {
    return guesses.map((g, i) => (
      <Guess
        key={`${g}-${i}`}
        guess={g}
        onClick={onGuessClick(g)}
        Icon={MdRemoveCircleOutline}
      />
    ));
  }, [guesses, onGuessClick]);

  const filler = useMemo(() => {
    if (guesses.length === 5) {
      return null;
    }

    const out: React.ReactNode[] = [];
    for (let i = 0; i < 4 - guesses.length; i += 1) {
      out.push(
        <Guess key={`filler-${i}`} guess={""} onClick={() => {}} Icon={Blank} />
      );
    }
    return out;
  }, [guesses.length]);

  return (
    <Context.Provider value={{ word: solution, gameNumber: -1 }}>
      <div className={classes.container}>
        <div className={classes.grid}>
          <div className={classes.info}>
            <h1>Ordle puslespillbygger</h1>
            <ol>
              <li>Skriv et ord som er løsningen</li>
              <li>Skriv ord som er gjetninger</li>
              <li>Vis mulige løsninger på den høyre siden</li>
            </ol>
          </div>
          {error && <span style={{ textAlign: "center" }}>{error}</span>}
          {renderedGuesses}
          <Guess
            guess={guess}
            Icon={
              mode === "guess"
                ? valid
                  ? MdKeyboardReturn
                  : MdOutlineArrowBack
                : Blank
            }
            onClick={() => {
              if (valid && guess.length === 5) {
                dispatch({ mode: "commit" });
              } else {
                dispatch({ mode: "reset-guess" });
              }
            }}
          />
          {filler}
          <Guess
            guess={solution}
            Icon={
              mode === "solution"
                ? valid
                  ? MdKeyboardReturn
                  : MdOutlineArrowBack
                : MdOutlineClear
            }
            onClick={() => {
              if (mode === "solution" && valid) {
                dispatch({ mode: "commit" });
              } else {
                dispatch({ mode: "reset" });
              }
            }}
          />
        </div>
        <Remainder guesses={guesses} />
      </div>
    </Context.Provider>
  );
};

const Remainder = ({ guesses }: { guesses: string[] }) => {
  const { remainders: possibilities, formattedCount } =
    usePossibilities(guesses);

  const list = useMemo(() => {
    if (possibilities.length > 3000) {
      return (
        <div style={{ textAlign: "center" }}>
          <em>(masse ord)</em>
        </div>
      );
    }
    return (
      <ul>
        {possibilities.sort().map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
    );
  }, [possibilities]);

  return (
    <div className={classes.words}>
      <h2>{formattedCount} mulige</h2>
      {list}
    </div>
  );
};
