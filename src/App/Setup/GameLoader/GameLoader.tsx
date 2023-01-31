import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useWords } from "../DataLoader/context";
import { Context } from "./context";
import Loading from "../../../Loading";
import React from "react";

type Props = {
  gameId: string;
  children: React.ReactNode;
};

const hashCode = (str: string) => {
  return str
    .split("")
    .reduceRight((acc, c, i) => acc + c.charCodeAt(0) * Math.pow(31, i), 0);
};

export const GameLoader = ({ gameId, children }: Props) => {
  const { lang } = useParams();
  const [gameNumber, setGameNumber] = useState(-1);
  const navigate = useNavigate();
  const words = useWords();

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

  return <Context.Provider value={{ gameNumber }}>{children}</Context.Provider>;
};
