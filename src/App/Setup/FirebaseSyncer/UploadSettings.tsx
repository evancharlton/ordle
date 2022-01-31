import firebase from "firebase";
import { useEffect } from "react";
import { useSettings } from "../../../Game";

const UploadSettings = ({
  node,
  children,
}: {
  node: string;
  children: React.ReactNode;
}) => {
  const ref = firebase.database().ref(node);
  const settings = useSettings();

  useEffect(() => {
    ref.set(settings);
  }, [settings, ref]);

  return <>{children}</>;
};

export default UploadSettings;
