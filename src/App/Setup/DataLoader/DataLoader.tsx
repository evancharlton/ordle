import { Link } from "react-router";
import classes from "./DataLoader.module.css";
import { MdErrorOutline } from "react-icons/md";
import { Context } from "./context";
import Loading from "../../../Loading";
import { useLanguageData } from "../../../spa-components/DataProvider";

type Props = {
  children: React.ReactNode;
};

const DataLoader = ({ children }: Props) => {
  const { data: words, error } = useLanguageData<string[]>("words.json");

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

  if (!words?.length) {
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
