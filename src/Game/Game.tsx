import Grid from "./Grid";
import Keyboard from "./Keyboard";
import classes from "./Game.module.css";
import { ButtonsPortal } from "../spa-components/Header";
import Settings from "./Header/Settings";
import Random from "../Random";

const Game = () => {
  return (
    <div className={classes.container}>
      <ButtonsPortal>
        <>
          <Random />
          <Settings />
        </>
      </ButtonsPortal>
      <Grid />
      <Keyboard />
    </div>
  );
};

export default Game;
