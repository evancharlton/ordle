import { useParams } from "react-router-dom";
import { useGameNumber } from "../DataLoader";

export const useStorageKey = () => {
  const { lang } = useParams();
  const number = useGameNumber();
  return Number.isNaN(number) ? "" : ["ordle", lang, number].join("/");
};
