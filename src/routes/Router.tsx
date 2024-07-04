import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "../pages/index";

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
