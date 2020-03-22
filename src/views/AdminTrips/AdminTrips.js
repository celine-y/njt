import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import AdminTripCards from "./AdminTripCards.js"

// Authorization
import * as ROLES from 'constants/roles';
import { AuthUserContext } from 'components/Session';

import profile from "assets/img/faces/christian.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import styles2 from "assets/jss/material-kit-react/views/landingPage.js";

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);

export default function AdminTrips(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const { ...rest } = props;

  return (
    <AuthUserContext.Consumer>
      {authUser => authUser && authUser.roles[ROLES.ADMIN] && (
        <div>
          <Parallax small filter image={require("assets/img/profile-bg.jpg")}>
            <div className={classes2.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <h2 className={classes2.title}>Requested Trips</h2>
                  <br />
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
              <div className={classes.container}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={6}>
                    <div>
                      <br />
                    </div>
                    <AdminTripCards authUser={authUser} />
                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </div>
          <Footer />
        </div >
      )}
    </AuthUserContext.Consumer>
  );
}
