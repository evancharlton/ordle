import Letter from "./Letter";
import classes from "./Row.module.css";
import Enter from "./Enter";
import Delete from "./Delete";

type Props = {
  row: string;
  final: boolean;
};

const Row = ({ row, final }: Props) => {
  const letters = row.split("");
  return (
    <div className={classes.row}>
      {final && <Enter />}
      {letters.map((letter) => (
        <Letter key={letter} letter={letter} />
      ))}
      {final && <Delete />}
    </div>
  );
};

export default Row;
