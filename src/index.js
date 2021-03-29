import React from "react";
import ReactDOM from "react-dom";
// React Router Dom
import { BrowserRouter as Router } from "react-router-dom";
// Recoil
import { RecoilRoot } from "recoil";
import RecoilLogger from "recoil-logger";
//Containers
import App from "./containers/App";
//gral styles
import "../src/styles/index.modules.css";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
        <Router>
      <RecoilLogger/>
          <App />
        </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
