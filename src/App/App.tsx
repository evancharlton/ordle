import { HashRouter, Routes, Route } from "react-router-dom";
import LocalStorageUpgrader from "./LocalStorageUpgrader";
import { RecoilRoot } from "recoil";
import SettingsLoader from "./Setup/SettingsLoader";
import ChooseLanguage from "./ChooseLanguage";
import WithLanguage from "./WithLanguage";

const Root = () => (
  <LocalStorageUpgrader>
    <RecoilRoot>
      <SettingsLoader>
        <HashRouter>
          <Routes>
            <Route path="/" element={<ChooseLanguage />} />
            <Route path="/:lang/*" element={<WithLanguage />} />
          </Routes>
        </HashRouter>
      </SettingsLoader>
    </RecoilRoot>
  </LocalStorageUpgrader>
);

export default Root;
