import React from "react";
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
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

// Authorization
import { AuthUserContext, withAuthorization, helpers } from 'components/Session';

import profile from "assets/img/faces/christian.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import * as ROUTES from 'constants/routes';

const useStyles = makeStyles(styles);

function Traveller(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <AuthUserContext.Consumer>
      { authUser => (
          <GridContainer justify="center" spacing={2}>
            <GridItem xs={12}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={3}>
                  <div>
                    <div className={classes.title}>
                      <h3>{helpers.getFullName(authUser)}</h3>
                    </div>
                    <div className={classes.description}>
                      <p>Email Address:</p>
                    </div>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <GridContainer>
                  <GridItem xs={12}>
                    <div className={classes.title}>
                      <h3>Trips</h3>
                    </div>
                    <br />
                    <Button
                      color="primary"
                      size="lg"
                      href={ROUTES.TRIP_DETAILS}
                      target="_blank"
                      rel="noopener noreferrer"
                    >Trip Details
                    </Button>
                  </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
      )}
    </AuthUserContext.Consumer>
  );
}

export default Traveller;
