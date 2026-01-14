// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import LandingPage from "./LandingPage.jsx";
import CreateEpigram from "./CreateEpigram.jsx";
import ListEpigrams from "./ListEpigrams.jsx";
// import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <LandingPage />
    <br></br>
    <Signup />
    <br></br>
    <Login />
    <br></br>
    <CreateEpigram />
    <br></br>
    <ListEpigrams />
  </StrictMode>
);
