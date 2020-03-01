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
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//gives imaage at the top
import Parallax from "components/Parallax/Parallax.js";
import classNames from "classnames";
//creates dropdown
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import Badge from 'components/Badge/Badge.js';

// material-ui components
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/bg2.jpg";
import * as ROUTES from 'constants/routes';


const useStyles = makeStyles(styles);
export default function FormSubmitClinic(props){
  const classes = useStyles();
  const { ...rest } = props;
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  return (
    <GridContainer justify="center">
      <GridItem xs={24} sm={24} md={11}>
        <Card className={classes[cardAnimaton]}>
          <form className={classes.form}>
            <CardHeader color="primary" className={classes.cardHeader}>
              <h4>Submit a Clinic</h4>
              <div className={classes.socialLine}>
              </div>
            </CardHeader>
            <CardBody>
            <p>Please fill out the following information regarding the clinic</p>
              <CustomInput
                labelText="Clinic Name..."
                id="text"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  autoComplete: "off"
                }}
              />
              <CustomInput
                labelText="Street Name and Number..."
                id="first"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                }}
              />
              <CustomInput
                labelText="Country..."
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  autoComplete: "on"
                }}
              />
              <CustomInput
                labelText="Province..."
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  autoComplete: "off"
                }}
              />
              <CustomInput
                  labelText="Additional Comments"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    autoComplete: "off"
                  }}
                />
            </CardBody>
            <CardFooter className={classes.cardFooter}>
              <Button color="primary" size="lg"
                href={ROUTES.LOGIN}>
                Submit
              </Button>
            </CardFooter>
          </form>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
