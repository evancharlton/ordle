import Help from "./Help";
import Random from "./Random";
import Title from "./Title";
import Language from "./Language";
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
      <Language />
      <Title />
      <div style={{ width: 50 }} />
      <Random />
    </div>
  );
};
