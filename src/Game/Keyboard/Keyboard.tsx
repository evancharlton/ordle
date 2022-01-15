import Row from "./Row";
import classes from "./Keyboard.module.css";
import ErrorMessage from "../../ErrorMessage";
import EndOverlay from "./EndOverlay";
import { useKeyboard } from "./hooks";

type Props = {} & Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "style" | "className"
>;

export const Keyboard = (props: Props) => {
  const keyboard = useKeyboard();
  return (
    <div
      {...props}
      className={[props.className, classes.keyboard].filter(Boolean).join(" ")}
    >
      {keyboard.map((row, i) => (
        <Row key={row} row={row} final={i === keyboard.length - 1} />
      ))}
      <ErrorMessage />
      <EndOverlay />
    </div>
  );
};