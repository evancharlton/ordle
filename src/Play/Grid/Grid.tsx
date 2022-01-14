import { useMemo } from "react";
import { useGuesses } from "../../state";
import Input from "./Input";
import Guess from "./Guess";
import Remaining from "./Remaining";
import EndOverlay from "./EndOverlay";
import classes from "./Grid.module.css";

type Props = {} & Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "style" | "className"
>;

export const Grid = (props: Props) => {
  const guesses = useGuesses();

  const grid = useMemo(() => {
    const out = guesses.map((guess, i) => (
      <Guess key={`guess-${i}`} guess={guess} />
    ));
    out.push(<Input key="input" />);
    for (let i = 0; i < 5; i += 1) {
      out.push(<Remaining key={`remaining-${i}`} />);
    }
    return out.slice(0, 6);
  }, [guesses]);

  return (
    <div
      {...props}
      className={[props.className, classes.grid].filter(Boolean).join(" ")}
    >
      {grid}
      <EndOverlay />
    </div>
  );
};
