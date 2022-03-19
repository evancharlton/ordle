import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import classes from "./DataLoader.module.css";
import { MdErrorOutline } from "react-icons/md";
import { Context } from "./context";
import Loading from "../../../Loading";

type Props = {
  gameId: string;
  children: React.ReactNode;
};

const hashCode = (str: string) => {
  return str
    .split("")
    .reduceRight((acc, c, i) => acc + c.charCodeAt(0) * Math.pow(31, i), 0);
};

const DataLoader = ({ gameId, children }: Props) => {
  const { lang } = useParams();
  const [words, setWords] = useState<string[]>([]);
  const [gameNumber, setGameNumber] = useState(-1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let unmounted = false;

    fetch([process.env.PUBLIC_URL, lang ?? "", "words.json"].join("/"))
      .then((resp) => resp.json())
      .then((words) => {
        if (unmounted) {
          return;
        }
        setWords(words);
      })
      .catch((e) => setError(e));

    return () => {
      unmounted = true;
    };
  }, [lang, setWords]);

  useEffect(() => {
    if (gameId === undefined) {
      return;
    }

    if (!words.length) {
      return;
    }

    let number = +gameId;
    if (Number.isNaN(number)) {
      number = hashCode(gameId);
    }

    const max = words.length;
    // JS supports negative mods, so ensure that we're always positive.
    let gameNumber = ((number % max) + max) % max;

    const potentialWord = words[gameNumber];
    if (potentialWord) {
      setGameNumber(gameNumber);
    } else {
      // This word has been removed; go to another random index that has a word.

      let safety = 5;
      do {
        gameNumber = Math.ceil(Math.random() * words.length);
        if (words[gameNumber]) {
          navigate(`/${lang}/${gameNumber}`, { replace: true });
          return;
        }
      } while (--safety > 0);
      navigate(`/${lang}`, { replace: true });
    }
  }, [words, gameId, setGameNumber, navigate, lang]);

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

  if (gameNumber < 0 || Number.isNaN(gameNumber)) {
    return <Loading />;
  }

  const wordMap: Record<string, true> = {};
  for (let i = 0; i < words.length; i += 1) {
    wordMap[words[i]] = true;
  }

  return (
    <Context.Provider value={{ wordList: words, wordMap, gameNumber }}>
      {children}
    </Context.Provider>
  );
};

export default DataLoader;
