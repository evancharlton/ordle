import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import classes from "./DataLoader.module.css";
import { MdErrorOutline } from "react-icons/md";
import { Context } from "./context";
import Loading from "../../../Loading";
import { store } from "../../../storage";

type Props = {
  children: React.ReactNode;
};

const DataLoader = ({ children }: Props) => {
  const { lang } = useParams();
  const [words, setWords] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const url = [import.meta.env.BASE_URL, lang ?? "", "words.json"]
    .join("/")
    .replace(/\/+/g, "/");

  useEffect(() => {
    store
      .getItem<string[]>(url)
      .then(async (cachedValue: typeof words | null) => {
        if (cachedValue) {
          setWords(cachedValue);
        }

        if (window.navigator.onLine) {
          try {
            const fetchedValue = await fetch(url).then((resp) => resp.json());
            setWords(fetchedValue);
            await store.setItem(url, fetchedValue);
          } catch (e) {
            if (e instanceof Error) {
              setError(e);
            }
          }
        }
      });
  }, [lang, setWords, url]);

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
