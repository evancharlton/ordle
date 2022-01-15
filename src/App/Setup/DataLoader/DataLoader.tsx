import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import classes from "./DataLoader.module.css";
import { MdErrorOutline } from "react-icons/md";
import { Context } from "./context";

type Props = {
  children: React.ReactNode;
};

const hashCode = (str: string) => {
  return str.split("").reduceRight((acc, c) => acc + c.charCodeAt(0) * 31, 0);
};

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className={classes.center}>{children}</div>
);

const DataLoader = ({ children }: Props) => {
  const { lang, gameId } = useParams();
  const [words, setWords] = useState<string[]>([]);
  const [gameNumber, setGameNumber] = useState(-1);
  const [error, setError] = useState(null);

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

    let number = +gameId;
    if (Number.isNaN(number)) {
      number = hashCode(gameId);
    }

    const max = words.length;

    setGameNumber(((number % max) + max) % max);
  }, [words, gameId, setGameNumber]);

  if (error) {
    return (
      <Container>
        <h1>
          <Link to="/">
            <MdErrorOutline />
          </Link>
        </h1>
      </Container>
    );
  }

  if (!words || words.length === 0) {
    return (
      <Container>
        <div className={classes.loader}></div>
      </Container>
    );
  }

  if (gameNumber < 0 || Number.isNaN(gameNumber)) {
    return (
      <Container>
        <div className={classes.loader}></div>
      </Container>
    );
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
