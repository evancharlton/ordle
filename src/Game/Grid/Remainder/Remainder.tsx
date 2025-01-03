import { useGameNumber } from "../../../App/Setup/GameLoader";
import { useGuesses } from "../../guess";
import classes from "./Remainder.module.css";
import { usePossibilities } from "./usePossibilities";

const Remainder = () => {
  const [guessMap] = useGuesses();
  const guesses = Object.keys(guessMap);
  const { remainders, formattedCount } = usePossibilities(guesses);
  const gameNumber = useGameNumber();

  return (
    <>
      <div />{" "}
      <div className={classes.container}>
        <div className={classes.message}>
          {remainders?.length > 0 ? (
            <>
              mulige ord:{" "}
              <span className={classes.count}>{formattedCount}</span>
            </>
          ) : null}
        </div>
        <span className={classes.gameNumber}># {gameNumber}</span>
      </div>
      <div />
    </>
  );
};

export default Remainder;
