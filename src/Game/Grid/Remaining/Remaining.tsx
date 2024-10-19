import classes from "./Remaining.module.css";
import Letter from "../Letter";
import { useWord } from "../../../App/Setup/GameLoader";
import { useMemo } from "react";

const Remaining = () => {
  const word = useWord();

  const children = useMemo(() => {
    const out = [];
    for (let i = 0; i < word.length; i += 1) {
      out.push(<Letter key={`filler-${i}`} mode="unknown" letter=" " />);
    }
    return out;
  }, [word.length]);

  return <div className={classes.remaining}>{children}</div>;
};

export default Remaining;
