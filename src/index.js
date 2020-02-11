import React from "react";
import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch } from "react-router-dom";
// import * as ROUTES from 'constants/routes';
//
// import "assets/scss/material-kit-react.scss?v=1.8.0";
//
// // pages for this product
// import LandingPage from "views/LandingPage/LandingPage.js";
// import ProfilePage from "views/ProfilePage/ProfilePage.js";
// import LoginPage from "views/LoginPage/LoginPage.js";
// import SignupPage from "views/SignupPage/SignupPage.js";
//
// import Header from "components/Header/Header.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";

import App from "components/App/App.js"
//
// // Firebase
import Firebase, { FirebaseContext } from './components/Firebase';
// import { withFirebase } from 'components/Firebase';
// import { AuthUserContext } from 'components/Session';
//
// var hist = createBrowserHistory();
//
// const dashboardRoutes = [];
//
// const App = (props) => {
//   const [authUser, setAuthUser] = useState(null);
//   const { ...rest } = props;
//
//   function onAuthStateChange(setAuthUser) {
//     return firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         console.log("The user is logged in");
//         setAuthUser(user)
//       } else {
//         console.log("The user is not logged in");
//         setAuthUser(null)
//       }
//     });
//   }
//
//   useEffect(() => {
//     const unsubscribe = onAuthStateChange(setAuthUser);
//     return () => {
//       unsubscribe();
//     };
//   }, []);
//
//   return (
//     <AuthUserContext.Provider value={authUser}>
//       <Router history={hist}>
//         <div>
//         <Header
//           color="transparent"
//           routes={dashboardRoutes}
//           brand="NJT"
//           rightLinks={<HeaderLinks authUser={authUser}/>}
//           fixed
//           changeColorOnScroll={{
//             height: 400,
//             color: "white"
//           }}
//         />
//           <Switch>
//             <Route exact path={ROUTES.HOME} component={LandingPage} />
//             <Route path={ROUTES.ACCOUNT} component={ProfilePage} />
//             <Route path={ROUTES.LOGIN} component={LoginPage} />
//             <Route path={ROUTES.SIGN_UP} component={SignupPage} />
//           </Switch>
//         </div>
//       </Router>
//     </AuthUserContext.Provider>
//   )
// }
//
// export default withFirebase(App);

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
