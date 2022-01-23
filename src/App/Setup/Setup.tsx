import { useParams } from "react-router";
import { RecoilRoot } from "recoil";
import DataLoader from "./DataLoader";
import StateLoader from "./StateLoader";
import LanguageOptions from "./LanguageOptions";
import Game from "../../Game";
import FirebaseSyncer from "./FirebaseSyncer";

const Setup = () => {
  const { lang, gameId } = useParams();

  if (!lang) {
    return <LanguageOptions />;
  }

  let sanitizedGameId = gameId ?? "";
  if (!gameId) {
    const now = new Date();

    sanitizedGameId = [
      now.getFullYear(),
      `0${now.getMonth() + 1}`.substr(-2),
      `0${now.getDate()}`.substr(-2),
    ].join("-");
  }

  return (
    <RecoilRoot>
      <DataLoader gameId={sanitizedGameId}>
        <FirebaseSyncer>
          <StateLoader>
            <Game />
          </StateLoader>
        </FirebaseSyncer>
      </DataLoader>
    </RecoilRoot>
  );
};

export default Setup;
