import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
// import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

import * as ROUTES from 'constants/routes';

// Sections for this page
import JoinUsSection from "./Sections/JoinUsSection.js";
import SupplyMapSection from "./Sections/SupplyMapSection.js";
import SeenOnSection from "./Sections/SeenOnSection.js";

// const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Take a suitecase, change a life.</h1>
              <h4>
              Our project is about love. Through the work of volunteers, we aspire to:
              change the way people travel by starting the journey for
              ordinary tourists to become humanitarians; and prevent
              the waste of usable medical supplies and get them
              to those in most need
              </h4>
              <br />
              <Button
                color="primary"
                size="lg"
                href={ROUTES.REQUEST_SUITCASE}
                target="_blank"
                rel="noopener noreferrer"
              >Take a Suitcase
              </Button>
              <Button
                size="lg"
                href={ROUTES.PACK_SUPPLIES}
                target="_blank"
                rel="noopener noreferrer"
              >How we Pack Supplies
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <JoinUsSection />
          <SupplyMapSection />
          <SeenOnSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
