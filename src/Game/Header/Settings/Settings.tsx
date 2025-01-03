import { useCallback, useState } from "react";
import { MdOutlineSettings } from "react-icons/md";
import UserDialog from "../../../SettingsDialog";

const Settings = () => {
  const [showing, setShowing] = useState(false);
  const onClose = useCallback(() => {
    setShowing(false);
  }, []);

  return (
    <>
      <button onClick={() => setShowing(true)}>
        <MdOutlineSettings />
      </button>
      <UserDialog open={showing} onClose={onClose} />
    </>
  );
};

export default Settings;
