import { Link, useParams } from "react-router-dom";
import { useGameNumber } from "../../../state";
import classes from "./Title.module.css";

const Title = () => {
  const { lang } = useParams();
  const [gameNumber] = useGameNumber();
  return (
    <div className={classes.container}>
      <h1>
        <Link to={`/${lang}`}>Ordle</Link>
      </h1>
      <span className={classes.gameNumber}># {gameNumber}</span>
    </div>
  );
};

export default Title;
