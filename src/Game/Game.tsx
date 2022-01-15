import Header from "./Header";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import classes from "./Game.module.css";

const Game = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Grid />
      <Keyboard />
    </div>
  );
};

export default Game;
