import React, { useState } from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import UserInfo from "./UserInfo";
import TripCard from "./TripCard";

// Authorization
import { AuthUserContext, withAuthorization, helpers } from 'components/Session';
// firebase
import { withFirebase } from 'components/Firebase';

import * as ROUTES from 'constants/routes';

import styles from "assets/jss/material-kit-react/views/profilePage.js";

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

  function hasTrips(authUser){
    // TODO: implement
    return false;
  }

  function displayTrips(authUser){
    if(!hasTrips(authUser)){
      return (
        <p>You do not have any trips right now.
        To request a suitcase follow  this {" "}
          <Link
            to={ROUTES.REQUEST_SUITCASE}>
            link
          </Link>.
        </p>
      )
    } else {
      return (
        <p>hasTrips</p>
      )
    }
  }

  return (
    <AuthUserContext.Consumer>
      { authUser => (
          <GridContainer justify="center" spacing={2}>
            <GridItem xs={12}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                  <UserInfo />
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <GridContainer>
                    <GridItem xs={12}>
                      <div className={classes.cardTitle}>
                        <h3>Trips</h3>
                      </div>
                    </GridItem>
                    <GridItem xs={12}>
                      {displayTrips(authUser)}
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

export default withFirebase(Traveller);
