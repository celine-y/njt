/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import LoginButton from "components/Header/LoginButton.js";
import ProfileButton from "components/Header/ProfileButton.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

import * as ROUTES from 'constants/routes';
import { AuthUserContext, helpers } from 'components/Session';

function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href={ROUTES.ABOUT_US}
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >About Us
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          left
          buttonText="Volunteer"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          dropdownList={[
            <Link to={ROUTES.REQUEST_SUITCASE} className={classes.dropdownLink}>
              Take a Suitcase
            </Link>,
            <a
              href={ROUTES.VOLUNTEER}
              target="_blank"
              className={classes.dropdownLink}
            >
              Help Pack Supplies
            </a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href={ROUTES.DONATE}
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >Donate
        </Button>
      </ListItem>

      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          left
          buttonText="Submit a Clinic"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          dropdownList={[
            <Link to={ROUTES.SUBMIT_CLINIC} className={classes.dropdownLink}>
              Submit a Clinic
            </Link>,
            <a
              href={ROUTES.CLINIC_MAP}
              target="_blank"
              className={classes.dropdownLink}
            >
              List of Clinics for Delivery
            </a>
          ]}
        />
      </ListItem>

      <ListItem className={classes.listItem}>
        <Button
          href={ROUTES.START_CHAPTER}
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >Start a Chapter
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href={ROUTES.CONTACT_US}
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >Contact
        </Button>
      </ListItem>
      <AuthUserContext.Consumer>
      { authUser =>
        authUser ? <ProfileButton initials={helpers.getInitials(authUser)}/>: <LoginButton />
      }
      </AuthUserContext.Consumer>
    </List>
  );
}

export default HeaderLinks;
