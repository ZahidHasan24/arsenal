import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Resources/css/app.css";


import Routes from "./routes";
import { firebase } from "./firebase";

const App = (props) => {
  return <Routes {...props} />;
};

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(<App user={user} />, document.getElementById("root"));
});
