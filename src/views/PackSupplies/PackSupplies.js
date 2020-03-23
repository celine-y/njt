import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import * as ROLES from 'constants/roles';

import styles from "assets/jss/material-kit-react/views/infoPages.js";
import styles2 from "assets/jss/material-kit-react/views/landingPage.js";

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);
function PackSupplies(props) {
  const classes = useStyles();
  const classes2 = useStyles2();

  const { ...rest } = props;
  return (
    <div>
      <Parallax small filter image={require("assets/img/profile-bg.jpg")}>
        <div className={classes2.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h2 className={classes2.title}>How we Pack Supplies</h2>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={6}>
                <div>
                  {/* <h3 className={classes.title}>Donate Medical Supplies</h3> */}
                  <br />
                </div>

                <h4 className={classes.subtitle}>Packing Party Instructions</h4>
                <div className={classes.description}>
                <ul>
                  <li>Most supplies should be sorted into sealed plastic bags within the suitcase, with breakable items protected with bubble wrap</li>
                  <li>After packing is complete, each suitcase must be checked before being closed</li>
                  <li>Decisions about sorting, organizing, and storing donations are made by the volunteer in charge</li>
                  <li>The total weight of all the suitcases packed that day must&nbsp;be recorded</li>
                  <li>Each&nbsp;suitcase should contain:</li>
                </ul>
                </div>

              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PackSupplies;
