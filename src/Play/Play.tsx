import Header from "./Header";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import ErrorMessage from "../ErrorMessage";
import classes from "./Play.module.css";

const Play = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Grid />
      <Keyboard />
      <ErrorMessage />
    </div>
  );
};

export default Play;
