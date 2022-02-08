import { MdOutlineAutorenew } from "react-icons/md";
import { useNewGame } from "../Game/control";
import classes from "./Random.module.css";

const Random = () => {
  const newGame = useNewGame();

  return (
    <div className={classes.randomIcon} role="button" onClick={newGame}>
      <MdOutlineAutorenew />
    </div>
  );
};

export default Random;
