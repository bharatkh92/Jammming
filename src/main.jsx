import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import HomeLayout from "./containers/HomeLayout.jsx";
import LandingPageContainer from "./containers/LandingPageContainer.jsx";
import Callback from "./Callback.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />} >
        <Route index element={<LandingPageContainer />} />
        <Route path="app" element={<App />} />
        <Route path="callback" element={<Callback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
