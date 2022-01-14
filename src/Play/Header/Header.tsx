import Help from "./Help";
import classes from "./Header.module.css";

type Props = {} & Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "style" | "className"
>;

export const Header = (props: Props) => {
  return (
    <div
      {...props}
      className={[props.className, classes.header].filter(Boolean).join(" ")}
    >
      <Help />
      <h1>Ordle</h1>
    </div>
  );
};
