import { useParams } from "react-router";
import { Link } from "react-router-dom";
import classes from "./Language.module.css";

type Info = {
  name: string;
  flag: string;
  code: string;
};

const LANGUAGES = [
  { name: "bokmål", flag: "🇳🇴", code: "nb-no" },
  { name: "nynorsk", flag: "🇳🇴", code: "nn-no" },
] as const;

const LOOKUP: Record<string, Info> = LANGUAGES.reduce(
  (acc, lang) => ({ ...acc, [lang.code]: lang }),
  {}
);

const Language = () => {
  const { lang } = useParams();

  if (!lang) {
    return null;
  }

  const record = LOOKUP[lang];
  if (!record) {
    return null;
  }

  return (
    <Link className={classes.flag} to="/">
      {record.flag}
    </Link>
  );
};

export default Language;
