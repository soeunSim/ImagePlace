import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.jsx";
import Loading from "./component/Loading.jsx";
import UrlDelivery from "./component/UrlDelivery.jsx";
import "./index.css";
import "./static/fonts/font.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/delivery/:id"
          element={<UrlDelivery />}
        />
        <Route
          path="/loading"
          element={<Loading />}
        />
        <Route
          path="/"
          element={<App />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
