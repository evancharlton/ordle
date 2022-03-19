import firebase from "../../../sync";
import { useCallback, useEffect } from "react";
import { useUpdateSettings } from "../../../Game";

const InsertSettings = ({
  node,
  children,
}: {
  node: string;
  children: React.ReactNode;
}) => {
  const updateSettings = useUpdateSettings();

  const onSettingsChanged = useCallback(
    (snap) => {
      const value = snap.val();
      if (!value) {
        console.warn("Remote settings were deleted");
        return;
      }

      updateSettings(value);
    },
    [updateSettings]
  );

  useEffect(() => {
    const ref = firebase.database().ref(node);
    ref.on("value", onSettingsChanged);
    return () => {
      ref.off("value", onSettingsChanged);
    };
  }, [node, onSettingsChanged]);

  return <>{children}</>;
};

export default InsertSettings;
