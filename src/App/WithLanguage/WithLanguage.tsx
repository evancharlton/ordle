import { Route, Routes, useParams } from "react-router";
import Game from "../Setup";
import DataLoader from "../Setup/DataLoader";
import { lazy, Suspense } from "react";

const LazyBuilder = lazy(() => import("./Builder"));

export const WithLanguage = () => {
  const { lang } = useParams();
  return (
    <Suspense key={lang} fallback={null}>
      <DataLoader>
        <Routes>
          <Route path="/builder" element={<LazyBuilder />} />
          <Route path="/" element={<Game />} />
          <Route path="/:gameId" element={<Game />} />
        </Routes>
      </DataLoader>
    </Suspense>
  );
};
