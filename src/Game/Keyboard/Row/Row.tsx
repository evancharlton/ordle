import Key from "./Key";
import classes from "./Row.module.css";
import Enter from "./Enter";
import Delete from "./Delete";
import { useGuess } from "../..";
import { useColumns } from "..";
import { useSettings } from "../../guess";

type Props = {
  row: string;
  final: boolean;
};

const Row = ({ row, final }: Props) => {
  const letters = row.split("");
  const { word: currentGuess } = useGuess();
  const col = currentGuess.length;
  const { [col]: allowedLetters } = useColumns();

  const { strict } = useSettings();

  return (
    <div className={classes.row}>
      {final && <Enter />}
      {letters.map((letter) => (
        <Key
          key={letter}
          letter={letter}
          enabled={strict ? allowedLetters?.has(letter) : true}
        />
      ))}
      {final && <Delete />}
    </div>
  );
};

export default Row;
