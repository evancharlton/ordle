import classes from "./Remaining.module.css";
import Letter from "../Letter";

const Remaining = () => {
  return (
    <div className={classes.remaining}>
      <Letter mode="unknown" letter=" " />
      <Letter mode="unknown" letter=" " />
      <Letter mode="unknown" letter=" " />
      <Letter mode="unknown" letter=" " />
      <Letter mode="unknown" letter=" " />
    </div>
  );
};

export default Remaining;
