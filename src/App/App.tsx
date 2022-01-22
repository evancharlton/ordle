import { HashRouter, Routes, Route } from "react-router-dom";
import LocalStorageUpgrader from "./LocalStorageUpgrader";
import Setup from "./Setup";

const Root = () => (
  <LocalStorageUpgrader>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Setup />} />
        <Route path="/:lang" element={<Setup />} />
        <Route path="/:lang/:gameId" element={<Setup />} />
      </Routes>
    </HashRouter>
  </LocalStorageUpgrader>
);

export default Root;
