import type { Props as SegmentProps } from "../Accordion/Segment";
import Segment from "../Accordion/Segment";
import { useSettings, useUpdateSettings } from "../Game";
import classes from "./SettingsSegment.module.css";

const SettingsSegment = (props: Pick<SegmentProps, "id">) => {
  const { strict } = useSettings();
  const updateSettings = useUpdateSettings();

  return (
    <Segment {...props} title="Valg">
      <div className={classes.row}>
        <div className={classes.info}>
          <label className={classes.toggleLabel} htmlFor="strict-mode">
            Streng modus
          </label>
          <p>Oppdaget bokstaver må brukes</p>
        </div>
        <input
          className={classes.toggle}
          type="checkbox"
          id="strict-mode"
          onChange={() => {
            updateSettings({ strict: !strict });
          }}
          checked={strict}
        />
      </div>
    </Segment>
  );
};

export default SettingsSegment;
