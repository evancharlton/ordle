import { useMemo } from "react";
import { createPortal } from "react-dom";
import Dialog from "../Dialog";
import Accordion from "../Accordion";
import UserSegment from "./UserSegment";
import SettingsSegment from "./SettingsSegment";

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
      </Dialog>
    );
  }, [onClose]);

  const portal = createPortal(modal, document.body);

  return <>{portal}</>;
};

export default SettingsDialog;
