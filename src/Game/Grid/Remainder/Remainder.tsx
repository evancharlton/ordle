import { useMemo } from "react";
import { useWord, useWords } from "../../../App/Setup/DataLoader";
import { useSettings } from "../../guess";
import { useColumns } from "../../Keyboard";
import classes from "./Remainder.module.css";

const usePossibilities = () => {
  const { strict, showRemaining } = useSettings();

  const words = useWords();
  const word = useWord();

  const columns = useColumns();

  return useMemo(() => {
    if (!(strict && showRemaining)) {
      return 0;
    }

    const regex = (() => {
      const groups = word
        .split("")
        .map((_, i) => {
          const column = columns[i];
          const out: string[] = [];
          column.forEach((val) => out.push(val));
          return `[${out.join("")}]`;
        })
        .join("");
      return new RegExp(`^${groups}$`);
    })();

    return words.filter((w) => regex.test(w)).length;
  }, [columns, showRemaining, strict, word, words]);
};

const format = (v: number) => {
  if (v < 1_000) {
    return v;
  }
  const thousands = Math.floor(v / 1000);
  const hundreds = v % 1000;
  return `${thousands}${String.fromCharCode(0xa0)}${hundreds}`;
};

const Remainder = () => {
  const count = usePossibilities();
  if (!count) {
    return null;
  }

  return (
    <div className={classes.message}>
      gjenstår ord: <span className={classes.count}>{format(count)}</span>
    </div>
  );
};

export default Remainder;
