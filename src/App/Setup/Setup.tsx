import { useNavigate, useParams } from "react-router";
import DataLoader from "./DataLoader";

type Props = {
  children?: React.ReactNode;
};

const Setup = ({ children }: Props) => {
  const { lang, gameId } = useParams();
  const navigate = useNavigate();

  if (!lang) {
    return (
      <div>
        <a href="/#/nb-no">nb-no</a>
      </div>
    );
  }

  if (!gameId) {
    const now = new Date();

    const today = [
      now.getFullYear(),
      `0${now.getMonth() + 1}`.substr(-2),
      `0${now.getDate()}`.substr(-2),
    ].join("-");

    navigate(`/${lang}/${today}`);

    return null;
  }

  return <DataLoader>{children}</DataLoader>;
};

export default Setup;
