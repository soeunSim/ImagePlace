import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.jsx";
import GoogleAnalyticsTracker from "./components/GoogleAnalyticsTracker.jsx";
import Loading from "./components/Loading.jsx";
import UrlDelivery from "./components/UrlDelivery.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleAnalyticsTracker />
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
