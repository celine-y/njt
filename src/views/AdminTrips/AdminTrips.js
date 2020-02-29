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
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import { cardTitle } from "assets/jss/material-kit-react.js";

// Authorization
import * as ROLES from 'constants/roles';
import { AuthUserContext } from 'components/Session';

import profile from "assets/img/faces/christian.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

const cardStyles = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  }
};

export default function AdminTrips(props) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const { ...rest } = props;
  return (
    <AuthUserContext.Consumer>
      {authUser => authUser && authUser.roles[ROLES.ADMIN] && (
        <div>
          <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
              <div className={classes.container}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={6}>
                    <div>
                      <h3 className={classes.title}>Logs</h3>
                    </div>
                    {/* filtered cards by chapter */}
                    <Card style={{ width: "100%" }}>
                      <CardBody>
                        <h4 className={classes.cardTitle}>Traveller Name</h4>
                        <p>
                          Traveller's status: requested
                    </p>
                        <p>
                          Country:
                  </p>
                        <Button color="primary">View Details</Button>
                      </CardBody>
                    </Card>
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
