import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App.jsx";
import UrlDelivery from "./component/UrlDelivery .jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<App />}
        />
        <Route
          path="/delivery/:id"
          element={<UrlDelivery />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
