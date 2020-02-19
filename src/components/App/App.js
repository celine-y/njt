import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import * as ROUTES from 'constants/routes';

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";
import RequestSuitcasePage from "views/RequestSuitcasePage/RequestSuitcasePage.js";

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

// Firebase
import { withAuthentication } from 'components/Session';

var hist = createBrowserHistory();

const dashboardRoutes = [];

const App = (props) => {

  return (
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
<<<<<<< HEAD
            <Route path={ROUTES.REQUEST_SUITCASE} component={RequestSuitcasePage} />
=======
>>>>>>> a556b33ade90b117c5793053d74892e82e4f906e
          </Switch>
        </div>
      </Router>
  )
}

export default withAuthentication(App);
