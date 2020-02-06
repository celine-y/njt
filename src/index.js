import React from "react";
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

var hist = createBrowserHistory();

const dashboardRoutes = [];


ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Router history={hist}>
      <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="NJT"
        rightLinks={<HeaderLinks />}
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
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
