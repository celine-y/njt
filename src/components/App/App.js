import React, { useState, useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import * as ROUTES from 'constants/routes';

import "assets/scss/material-kit-react.scss?v=1.8.0";

// Firebase
// import Firebase, { FirebaseContext } from 'components/Firebase';

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

// Firebase
import { withFirebase } from 'components/Firebase';
import { AuthUserContext } from 'components/Session';

var hist = createBrowserHistory();

const dashboardRoutes = [];

const App = (props) => {
  const [state, setState] = useState(
    () => {
      const user = props.firebase.auth.currentUser
      return { initializing: !user, user, }
    })

  useEffect(() => {
    const unsubscribe = props.firebase.auth.onAuthStateChanged(
      authUser => {
        if (authUser) {
          console.log(authUser)
          setState({ initializing: false, authUser })
        } else {
          setState({ authUser: null })
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthUserContext.Provider value={state.authUser}>
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
    </AuthUserContext.Provider>
  )
}

export default withFirebase(App);
