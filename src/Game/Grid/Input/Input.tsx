import { useMemo } from "react";
import { useGuess } from "../..";
import Letter from "../Letter";
import classes from "./Input.module.css";

const Input = () => {
  const { word } = useGuess();

  const letters = useMemo(() => {
    const out = [];
    for (let i = 0; i < 5; i += 1) {
      out.push(<Letter mode="unknown" key={i} letter={word[i] ?? " "} />);
    }
    return out;
  }, [word]);

  return <div className={classes.input}>{letters}</div>;
};

export default Input;
