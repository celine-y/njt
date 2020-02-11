import React from 'react';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// Firebase
import { withFirebase } from 'components/Firebase';

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import * as ROUTES from 'constants/routes';

const useStyles = makeStyles(styles);

const ProfileButton = ({ firebase }) => {
  const classes = useStyles();

  return (
    <div>
      <ListItem className={classes.listItem}>
        <Button
          href={ROUTES.ACCOUNT}
          className={classes.registerNavLink}
          color="primary">
        Account
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          className={classes.registerNavLink}
          color="transparent"
          onClick={firebase.doSignOut}>
        Logout
        </Button>
      </ListItem>
    </div>
  );
}

export default withFirebase(ProfileButton);
