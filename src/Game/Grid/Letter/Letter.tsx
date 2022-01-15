import classes from "./Letter.module.css";

type Props = {
  letter: string;
  mode: "yes" | "maybe" | "no" | "unknown";
} & Pick<React.HTMLAttributes<HTMLDivElement>, "className">;

const Letter = ({ letter, mode, className }: Props) => {
  return (
    <div
      className={[
        className,
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
