import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App.jsx";
import UrlDelivery from "./component/UrlDelivery .jsx";
import "./index.css";
import Loding from "./component/Loding.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </StrictMode>
);
