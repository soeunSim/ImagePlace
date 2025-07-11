import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.jsx";
import GoogleAnalyticsTracker from "./components/common/GoogleAnalyticsTracker.jsx";
import UrlDeliveryContainer from "./components/image/UrlDeliveryContainer.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleAnalyticsTracker />
      <Routes>
        <Route
          path="/delivery/:id"
          element={<UrlDeliveryContainer />}
        />
        <Route
          path="/"
          element={<App />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
