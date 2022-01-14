import Help from "./Help";
import Random from "./Random";
import classes from "./Header.module.css";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

type Props = {} & Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "style" | "className"
>;

export const Header = (props: Props) => {
  const { lang } = useParams();
  return (
    <div
      {...props}
      className={[props.className, classes.header].filter(Boolean).join(" ")}
    >
      <Help />
      <h1>
        <Link to={`/${lang}`}>Ordle</Link>
      </h1>
      <Random />
    </div>
  );
};
