import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineSettings } from "react-icons/md";
import classes from "./Settings.module.css";
import UserDialog from "../../../SettingsDialog";

const Settings = () => {
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
      <MdOutlineSettings />
      {portal}
    </div>
  );
};

export default Settings;
