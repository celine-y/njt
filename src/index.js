import React, { useState } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import * as ROUTES from 'constants/routes';

import "assets/scss/material-kit-react.scss?v=1.8.0";

// Firebase
import Firebase, { FirebaseContext } from './components/Firebase';

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

// Firebase
import { withFirebase } from 'components/Firebase';

var hist = createBrowserHistory();

const App = (props) => {
  const [authUser, setAuthUser] = useState(null)

  function componentDidMount() {
    this.listener = props.firebase.auth.onAuthStateChanged(authedUser => {
      authedUser
        ? setAuthUser(authedUser)
        : setAuthUser(null);
      console.log(authedUser)
    });
  }

  function componentWillUnmount() {
    this.listener();
  }

  return (
    <Router history={hist}>
      <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="NJT"
        rightLinks={<HeaderLinks authUser={authUser}/>}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
      />
        <Switch>
          <Route exact path={ROUTES.HOME} component={LandingPage} />
          <Route path={ROUTES.ACCOUNT} component={ProfilePage} />
          <Route path={ROUTES.LOGIN} component={LoginPage} />
          <Route path={ROUTES.SIGN_UP} component={SignupPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default withFirebase(App);

const dashboardRoutes = [];

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
