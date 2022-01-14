import Header from "./Header";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import classes from "./Play.module.css";

const Play = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Grid />
      <Keyboard />
    </div>
  );
};

export default Play;
