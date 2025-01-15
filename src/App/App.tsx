import { HashRouter, Routes, Route, Outlet } from "react-router";
import LocalStorageUpgrader from "./LocalStorageUpgrader";
import { RecoilRoot } from "recoil";
import SettingsLoader from "./Setup/SettingsLoader";
import WithLanguage from "./WithLanguage";
import { Header } from "../spa-components/Header";
import { LanguageProvider } from "../spa-components/LanguageSelector";
import PwaContainer from "../spa-components/PwaContainer";
import classes from "./Page.module.css";
import Help from "../Game/Header/Help";

const Page = () => {
  return (
    <div className={classes.container}>
      <Header logo="/logo.svg" title="Ordle">
        <Help />
      </Header>
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
};

const Root = () => (
  <PwaContainer appId="ordle">
    <LocalStorageUpgrader>
      <RecoilRoot>
        <SettingsLoader>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Page />}>
                <Route
                  path=""
                  element={
                    <div className={classes.languages}>
                      <LanguageProvider />
                    </div>
                  }
                />
                <Route
                  path="/:lang/*"
                  element={
                    <LanguageProvider>
                      <WithLanguage />
                    </LanguageProvider>
                  }
                />
              </Route>
            </Routes>
          </HashRouter>
        </SettingsLoader>
      </RecoilRoot>
    </LocalStorageUpgrader>
  </PwaContainer>
);

export default Root;
