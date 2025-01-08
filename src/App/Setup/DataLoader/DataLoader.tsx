import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import classes from "./DataLoader.module.css";
import { MdErrorOutline } from "react-icons/md";
import { Context } from "./context";
import Loading from "../../../Loading";

type Props = {
  children: React.ReactNode;
};

const DataLoader = ({ children }: Props) => {
  const { lang } = useParams();
  const [words, setWords] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`https://lister.evanc.no/ordle/${lang}/words.json`)
      .then((res) => res.json())
      .then((words) => setWords(words))
      .catch((e) => setError(e));
  }, [lang]);

  if (error) {
    return (
      <div className={classes.center}>
        <h1>
          <Link to="/">
            <MdErrorOutline />
          </Link>
        </h1>
      </div>
    );
  }

  if (!words || words.length === 0) {
    return <Loading />;
  }

  const wordMap: Record<string, true> = {};
  for (let i = 0; i < words.length; i += 1) {
    wordMap[words[i]] = true;
  }

  return (
    <Context.Provider value={{ wordList: words, wordMap }}>
      {children}
    </Context.Provider>
  );
};

export default DataLoader;
