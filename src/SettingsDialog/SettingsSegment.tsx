import type { Props as SegmentProps } from "../Accordion/Segment";
import Segment from "../Accordion/Segment";
import { useSettings, useUpdateSettings } from "../Game";
import classes from "./SettingsSegment.module.css";

const SettingsSegment = (props: Pick<SegmentProps, "id">) => {
  const { strict, showRemaining, hapticFeedback } = useSettings();
  const updateSettings = useUpdateSettings();

  return (
    <Segment {...props} title="Valg">
      <>
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
              updateSettings((old) => ({ ...old, strict: !old.strict }));
            }}
            checked={!!strict}
          />
        </div>
        <div className={classes.row}>
          <div className={classes.info}>
            <label className={classes.toggleLabel} htmlFor="show-count">
              Vis antall
            </label>
            <p>
              Vis hvor mange mulige ord som gjenstår
              <br />
              <em>
                (krever <strong>streng modus</strong>)
              </em>
            </p>
          </div>
          <input
            className={classes.toggle}
            type="checkbox"
            id="show-count"
            onChange={() => {
              updateSettings((old) => ({
                ...old,
                showRemaining: !old.showRemaining,
              }));
            }}
            checked={!!showRemaining}
          />
        </div>
        <div className={classes.row}>
          <div className={classes.info}>
            <label className={classes.toggleLabel} htmlFor="haptic-feedback">
              Fysisk tilbakemelding
            </label>
            <p>Vibrere når bokstaver trykkes</p>
          </div>
          <input
            className={classes.toggle}
            type="checkbox"
            id="haptic-feedback"
            onChange={() => {
              updateSettings((old) => ({
                ...old,
                hapticFeedback: !old.hapticFeedback,
              }));
            }}
            checked={!!hapticFeedback}
          />
        </div>
      </>
    </Segment>
  );
};

export default SettingsSegment;
