import { Suspense, useEffect } from "react";
import { RecoilRoot } from "recoil";
import { useParams } from "react-router";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import Play from "./Play";

const NoLanguage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/nb-no`);
  }, [navigate]);
  return null;
};

const Today = () => {
  const { lang } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const now = new Date();

    const today = [
      now.getFullYear(),
      `0${now.getMonth() + 1}`.substr(-2),
      `0${now.getDate()}`.substr(-2),
    ].join("-");
    navigate(`/${lang}/${today}`);
  }, [navigate, lang]);
  return null;
};

const Root = () => (
  <RecoilRoot>
    <Suspense fallback={<div>Loading ...</div>}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<NoLanguage />} />
          <Route path="/:lang" element={<Today />} />
          <Route path="/:lang/:gameId" element={<Play />} />
        </Routes>
      </HashRouter>
    </Suspense>
  </RecoilRoot>
);

export default Root;
