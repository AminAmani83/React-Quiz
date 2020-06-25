import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./css/bootstrap.min.css";
import "./css/styles.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router basename={process.env.REACT_APP_RELATIVE_PATH}>
    <Route component={App} />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
