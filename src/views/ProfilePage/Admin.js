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

const useStyles = makeStyles(styles);

function Admin(props) {
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
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.profile}>
                <div>
                <img src={profile} alt="..." className={imageClasses} />
                </div>
                <div className={classes.name}>
                  <h3 className={classes.title}>{helpers.getFullName(authUser)}</h3>
                  <h6>ADMIN</h6>
                </div>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.description}>
                <p>
                  An artist of considerable range, Chet Faker — the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                  and records all of his own music, giving it a warm, intimate
                  feel with a solid groove structure.{" "}
                </p>
              </div>
            </GridItem>
          </GridContainer>
      )}
    </AuthUserContext.Consumer>
  );
}

export default Admin;
