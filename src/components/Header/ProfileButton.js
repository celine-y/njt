import React from 'react';
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar"

// Firebase
import { withFirebase } from 'components/Firebase';

// core components
import Button from "components/CustomButtons/Button.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import * as ROUTES from 'constants/routes';
import { AuthUserContext } from 'components/Session';

const useStyles = makeStyles(styles);

const ProfileButton = (props) => {
  const classes = useStyles();
  const { initials } = props;
  return (
    <ListItem className={classes.listItem}>
      <CustomDropdown
        noLiPadding
        left
        caret={false}
        hoverColor="black"
        buttonText={
          <Avatar
            className={classes.img, classes.avatar}
            alt="profile">
            {initials}
          </Avatar>
        }
        buttonProps={{
          className:
            classes.navLink + " " + classes.imageDropdownButton,
          color: "transparent"
        }}
        dropdownList={[
          <Link to={ROUTES.ACCOUNT} className={classes.dropdownLink}>
            Profile
            </Link>,
          <AuthUserContext.Consumer>
            {authUser => authUser && authUser.roles.admin && <Link to={ROUTES.ADMIN_TRIPS} className={classes.dropdownLink}>Admin Logs</Link>}
          </AuthUserContext.Consumer>,
          <Link
            to="#"
            onClick={props.firebase.doSignOut}
            className={classes.dropdownLink}
            color="transparent">
            Sign Out
            </Link>
        ]}
      />
    </ListItem>
  );
}

export default withFirebase(ProfileButton);
