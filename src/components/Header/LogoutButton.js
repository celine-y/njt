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

const useStyles = makeStyles(styles);


const LogoutButton = ({ firebase }) => {
  const classes = useStyles();

  return (
      <ListItem className={classes.listItem}>
        <Button
          className={classes.registerNavLink}
          color="primary"
          onClick={firebase.doSignOut}
          round>
        Logout
        </Button>
      </ListItem>
  );
}

export default withFirebase(LogoutButton);
