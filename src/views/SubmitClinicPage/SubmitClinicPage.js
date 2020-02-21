import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
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
// datetime dropdown
import Datetime from "react-datetime";
//checkbox
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// material-ui components
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
//import styles2 from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";
import image from "assets/img/bg2.jpg";
import * as ROUTES from 'constants/routes';
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
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
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
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: "off"
                    }}
                  />
                  <CustomInput
                    labelText="Street Name..."
                    id="first"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>
                          lock_outline
                        </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Street Number..."
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Country..."
                    id="pass"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: "off"
                    }}
                  />
                  <CustomInput
                    labelText="Province..."
                    id="text"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: "off"
                    }}
                  />
                  <CustomInput
                      labelText="Additional Comments"
                      id="text"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
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
      </div>
    <Footer whiteFont />
    </div>
  </div>
  );
}
