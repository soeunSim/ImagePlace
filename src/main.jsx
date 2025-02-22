import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import App from "./App.jsx";
import Loding from "./component/Loding.jsx";
import UrlDelivery from "./component/UrlDelivery.jsx";
import "./index.css";
import "./static/fonts/font.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route
          path="/delivery/:id"
          element={<UrlDelivery />}
        />
        <Route
          path="/loding"
          element={<Loding />}
        />
        <Route
          path="/"
          element={<App />}
        />
      </Routes>
    </HashRouter>
  </StrictMode>
);
