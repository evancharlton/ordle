import { MdOutlineAutorenew } from "react-icons/md";
import { useNewGame } from "../Game/control";

const Random = () => {
  const newGame = useNewGame();

  return (
    <button onClick={newGame}>
      <MdOutlineAutorenew />
    </button>
  );
};

export default Random;
