import { useMemo } from "react";
import Input from "./Input";
import Guess from "./Guess";
import Remaining from "./Remaining";
import classes from "./Grid.module.css";
import { useGuesses } from "..";

type Props = {} & Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "style" | "className"
>;

export const Grid = (props: Props) => {
  const [guesses] = useGuesses();

  const grid = useMemo(() => {
    const out = Object.entries(guesses)
      .sort((a, b) => a[1] - b[1])
      .map(([guess, when]) => (
        <Guess key={`guess-${when}-${guess}`} guess={guess} />
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
    </div>
  );
};
