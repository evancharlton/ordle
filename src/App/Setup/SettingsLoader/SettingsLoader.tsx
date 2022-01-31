import { useEffect } from "react";
import { useParams } from "react-router";
import { useSettings, useUpdateSettings } from "../../../Game";

const SettingsLoader = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams();
  const localStorageKey = ["ordle", lang, "_settings"].join("/");
  const updateSettings = useUpdateSettings();
  const settings = useSettings();

  useEffect(() => {
    const storedSettingsString = localStorage.getItem(localStorageKey);
    if (!storedSettingsString) {
      return;
    }

    const parsedSettings = (() => {
      try {
        return JSON.parse(storedSettingsString);
      } catch (ex) {
        console.warn("Could not parse store settings", ex);
        return null;
      }
    })();

    if (!parsedSettings) {
      return;
    }

    updateSettings(parsedSettings);
  }, [localStorageKey, updateSettings]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(settings));
  }, [localStorageKey, settings]);

  return <>{children}</>;
};

export default SettingsLoader;
