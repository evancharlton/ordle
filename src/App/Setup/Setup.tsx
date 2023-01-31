import { useParams } from "react-router";
import GameLoader from "./GameLoader";
import StateLoader from "./StateLoader";
import Game from "../../Game";
import FirebaseSyncer from "./FirebaseSyncer";

const Setup = () => {
  const { gameId } = useParams();

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
    <GameLoader gameId={sanitizedGameId}>
      <FirebaseSyncer>
        <StateLoader>
          <Game />
        </StateLoader>
      </FirebaseSyncer>
    </GameLoader>
  );
};

export default Setup;
