import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import LandingPage from "./LandingPage.jsx";
import CreateEpigram from "./CreateEpigram.jsx";
import ListEpigrams from "./ListEpigrams.jsx";

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
