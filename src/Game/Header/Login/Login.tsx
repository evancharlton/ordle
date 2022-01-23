import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import classes from "./Login.module.css";
import UserDialog from "../../../UserDialog";

const Login = () => {
  const [showing, setShowing] = useState(false);
  const onClose = useCallback(() => {
    setShowing(false);
  }, []);

  const modal = useMemo(() => {
    if (!showing) {
      return null;
    }

    return <UserDialog onClose={onClose} />;
  }, [onClose, showing]);

  const portal = createPortal(modal, document.body);

  return (
    <div
      className={classes.icon}
      role="button"
      onClick={() => setShowing(true)}
    >
      <MdOutlineAccountCircle />
      {portal}
    </div>
  );
};

export default Login;
