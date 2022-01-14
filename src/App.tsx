import { Suspense, useEffect } from "react";
import { RecoilRoot } from "recoil";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import Play from "./Play";

const Today = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const now = new Date();

    const today = [
      now.getFullYear(),
      `0${now.getMonth() + 1}`.substr(-2),
      `0${now.getDate()}`.substr(-2),
    ].join("-");
    navigate(`/${today}`);
  }, [navigate]);
  return null;
};

const Root = () => (
  <RecoilRoot>
    <Suspense fallback={<div>Loading ...</div>}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/:gameId" element={<Play />} />
        </Routes>
      </HashRouter>
    </Suspense>
  </RecoilRoot>
);

export default Root;
