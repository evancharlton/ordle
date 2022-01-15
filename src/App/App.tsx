import { RecoilRoot } from "recoil";
import { HashRouter, Routes, Route } from "react-router-dom";
import Play from "../Play";
import Setup from "./Setup";

const Root = () => (
  <RecoilRoot>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Setup />} />
        <Route path="/:lang" element={<Setup />} />
        <Route
          path="/:lang/:gameId"
          element={
            <Setup>
              <Play />
            </Setup>
          }
        />
      </Routes>
    </HashRouter>
  </RecoilRoot>
);

export default Root;
