import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import HomeIcon from '@material-ui/icons/Home';

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
//import GridContainer from "components/Grid/GridContainer.js";
//import GridItem from "components/Grid/GridItem.js";
//import Button from "components/CustomButtons/Button.js";
//import Card from "components/Card/Card.js";
//import CardBody from "components/Card/CardBody.js";
//import CardHeader from "components/Card/CardHeader.js";
//import CardFooter from "components/Card/CardFooter.js";
//import CustomInput from "components/CustomInput/CustomInput.js";
import classNames from "classnames";

//creates dropdown
//import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
//import Badge from 'components/Badge/Badge.js';

// material-ui components
//import InputLabel from "@material-ui/core/InputLabel";
//import FormControl from "@material-ui/core/FormControl";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
//import styles2 from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

import image from "assets/img/bg2.jpg";
import * as ROUTES from 'constants/routes';

//import form section
import FormSubmitClinic from "./FormSubmitClinic.js";


const useStyles = makeStyles(styles);
export default function SubmitClinicPage(props) {
  const [checked, setChecked] = React.useState([24, 22]);
  const classes = useStyles();
  const wrapperDiv = classNames(
    classes.checkboxAndRadio,
    classes.checkboxAndRadioHorizontal
  );
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="NJT"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
      <div className={classes.container}>
        <FormSubmitClinic />
      </div>
    <Footer whiteFont />
    </div>
  </div>
  );
}
