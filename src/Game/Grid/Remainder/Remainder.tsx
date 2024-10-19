import { useGuesses } from "../../guess";
import classes from "./Remainder.module.css";
import { usePossibilities } from "./usePossibilities";

const Remainder = () => {
  const [guessMap] = useGuesses();
  const guesses = Object.keys(guessMap);
  const { remainders, formattedCount } = usePossibilities(guesses);
  if (!remainders || remainders.length === 0) {
    return null;
  }

  return (
    <div className={classes.message}>
      mulige ord: <span className={classes.count}>{formattedCount}</span>
    </div>
  );
};

export default Remainder;
