import { Link } from "react-router-dom";
import classes from "./LanguageOptions.module.css";

const LanguageOptions = () => {
  return (
    <div className={classes.container}>
      <Link to="/nb-no">Norsk (bokmål)</Link>
      <Link to="/nn-no">Norsk (nynorsk)</Link>
    </div>
  );
};

export default LanguageOptions;
