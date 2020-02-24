import React from "react";
import ReactDOM from "react-dom";
import App from "components/App/App.js"
//
// // Firebase
import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
