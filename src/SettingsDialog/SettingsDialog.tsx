import Accordion from "../Accordion";
import UserSegment from "./UserSegment";
import SettingsSegment from "./SettingsSegment";
import classes from "./SettingsDialog.module.css";
import { Modal } from "../spa-components/Modal";
import Segment from "../Accordion/Segment";
import { NavLink } from "react-router";
import { ComponentProps } from "react";

type Props = {
  onClose: () => void;
  open: boolean;
};

const className: ComponentProps<typeof NavLink>["className"] = ({
  isActive,
}) => (isActive ? classes.active : undefined);

const LanguageSegment = () => {
  return (
    <Segment id="languages" title="Språk">
      <div className={classes.languages}>
        <NavLink to="/nb" className={className}>
          bokmål
        </NavLink>
        <NavLink to="/nn" className={className}>
          nynorsk
        </NavLink>
      </div>
    </Segment>
  );
};

const SettingsDialog = ({ open, onClose }: Props) => {
  return (
    <Modal open={open} title="Innstillinger" onClose={onClose}>
      <Accordion initial={["login", "settings"]} mode="multiple">
        <SettingsSegment id="settings" />
        <UserSegment id="login" />
        <LanguageSegment />
      </Accordion>
      <div className={classes.version}>
        versjon <code>{import.meta.env.VITE_RELEASE ?? "development"}</code>
      </div>
    </Modal>
  );
};

export default SettingsDialog;
