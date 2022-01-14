import { useKeyboard } from "../../state";
import Row from "./Row";
import classes from "./Keyboard.module.css";
import { useCallback, useEffect } from "react";

type Props = {} & Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "style" | "className"
>;

export const Keyboard = (props: Props) => {
  const onKeyPress = useCallback((e) => {
    console.log(e);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [onKeyPress]);

  const keyboard = useKeyboard();
  return (
    <div
      {...props}
      className={[props.className, classes.keyboard].filter(Boolean).join(" ")}
    >
      {keyboard.map((row, i) => (
        <Row key={row} row={row} final={i === keyboard.length - 1} />
      ))}
    </div>
  );
};
