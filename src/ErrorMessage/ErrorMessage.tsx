import { useError } from "../state";
import classes from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  const { error } = useError();

  if (!error) {
    return null;
  }

  return (
    <div className={classes.container}>
      <div className={classes.message}>{error}</div>
    </div>
  );
};

export default ErrorMessage;
