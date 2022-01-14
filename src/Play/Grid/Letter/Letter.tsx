import classes from "./Letter.module.css";

type Props = {
  letter: string;
  mode: "yes" | "maybe" | "no" | "unknown";
};

const Letter = ({ letter, mode }: Props) => {
  return (
    <div
      className={[
        classes.letter,
        mode === "yes" && classes.yes,
        mode === "maybe" && classes.maybe,
        mode === "no" && classes.no,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {letter}
    </div>
  );
};

export default Letter;
