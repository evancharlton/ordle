import { useParams } from "react-router-dom";
import { useWord } from "../GameLoader";

export const useLanguageKey = () => {
  const { lang } = useParams();
  return ["ordle", lang].join("/");
};

export const useStorageKey = () => {
  const { lang } = useParams();
  const word = useWord();
  return ["ordle", lang, word].join("/");
};
