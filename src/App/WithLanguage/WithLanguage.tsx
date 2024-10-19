import { Route, Routes, useParams } from "react-router-dom";
import Game from "../Setup";
import DataLoader from "../Setup/DataLoader";
import React, { Suspense } from "react";

const LazyBuilder = React.lazy(() => import("./Builder"));

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
