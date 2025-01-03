import { Link } from "react-router";
import classes from "./LanguageOptions.module.css";

const LanguageOptions = () => {
  return (
    <div className={classes.container}>
      <Link to="/nb-no">bokmål</Link>
      <Link to="/nn-no">nynorsk</Link>
    </div>
  );
};

export default LanguageOptions;
