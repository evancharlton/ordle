import { useMemo } from "react";
import { createPortal } from "react-dom";
import Dialog from "../Dialog";
import Accordion from "../Accordion";
import UserSegment from "./UserSegment";
import SettingsSegment from "./SettingsSegment";
import classes from "./SettingsDialog.module.css";

type Props = {
  onClose: () => void;
};

const SettingsDialog = ({ onClose }: Props) => {
  const modal = useMemo(() => {
    return (
      <Dialog title="Innstillinger" onClose={onClose}>
        <Accordion initial={["login", "settings"]} mode="multiple">
          <SettingsSegment id="settings" />
          <UserSegment id="login" />
        </Accordion>
        <div className={classes.version}>
          versjon <code>{import.meta.env.VITE_RELEASE ?? "development"}</code>
        </div>
      </Dialog>
    );
  }, [onClose]);

  const portal = createPortal(modal, document.body);

  return <>{portal}</>;
};

export default SettingsDialog;
