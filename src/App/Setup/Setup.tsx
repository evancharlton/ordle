import { useNavigate, useParams } from "react-router";
import { RecoilRoot } from "recoil";
import DataLoader from "./DataLoader";
import StateLoader from "./StateLoader";
import LanguageOptions from "./LanguageOptions";

type Props = {
  children?: React.ReactNode;
};

const Setup = ({ children }: Props) => {
  const { lang, gameId } = useParams();
  const navigate = useNavigate();

  if (!lang) {
    return <LanguageOptions />;
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

  return (
    <RecoilRoot>
      <DataLoader>
        <StateLoader>{children}</StateLoader>
      </DataLoader>
    </RecoilRoot>
  );
};

export default Setup;
