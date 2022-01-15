import { HashRouter, Routes, Route } from "react-router-dom";
import Setup from "./Setup";

const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Setup />} />
      <Route path="/:lang" element={<Setup />} />
      <Route path="/:lang/:gameId" element={<Setup />} />
    </Routes>
  </HashRouter>
);

export default Root;
