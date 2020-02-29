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
import { AuthUserContext, withAuthorization } from 'components/Session';

import profile from "assets/img/faces/BabbuMann.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

import * as ROUTES from 'constants/routes';

import Collapsible from 'react-collapsible';

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
    <div>
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                </div>
              </GridItem>
            </GridContainer>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                  <h4 className={classes.cardTitle}>1. Request</h4>
                  //Get data from database

                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                  <h4 className={classes.cardTitle}>2. Set Time</h4>
                  //Get data from database

                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                  <h4 className={classes.cardTitle}>3. Pickup</h4>
                  //Get data from database

                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                  <h4 className={classes.cardTitle}>4. Print</h4>
                  //Get data from database

                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                  <h4 className={classes.cardTitle}>5. Delivered</h4>
                  <p>
                    Which clinic did you deliver to?
                  </p>
                  <p>
                    Clinic you delivered not in the list?
                  </p><Button
                    color="primary"
                    size="sm"
                    href={ROUTES.SUBMIT_CLINIC}
                    target="_blank"
                    rel="noopener noreferrer"
                  >Add New Clinic
                  </Button>

                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                  <h4 className={classes.cardTitle}>6. Feedback</h4>
                  //Get data from database

                </CardBody>
              </Card>
            </div>


            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>


      <Footer />
    </div >
  );

}
