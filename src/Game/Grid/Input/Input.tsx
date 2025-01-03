import { useMemo } from "react";
import { useGuess } from "../..";
import Letter from "../Letter";
import classes from "./Input.module.css";
import { useWord } from "../../../App/Setup/GameLoader";

const Input = () => {
  const { word } = useGuess();
  const solution = useWord();

  const letters = useMemo(() => {
    const out = [];
    for (let i = 0; i < solution.length; i += 1) {
      out.push(<Letter mode="unknown" key={i} letter={word[i] ?? " "} />);
    }
    return out;
  }, [word, solution.length]);

  return (
    <>
      <div />
      <div className={classes.input}>{letters}</div>
      <div />
    </>
  );
};

export default Input;
