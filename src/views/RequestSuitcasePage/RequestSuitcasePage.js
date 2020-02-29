//import React, { Component } from "react";
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

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
import classNames from "classnames";
//creates dropdown
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import Badge from 'components/Badge/Badge.js';
// datetime dropdown
import Datetime from "react-datetime";
// material-ui components
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/bg7.jpg";
// Checkbox Radio Switch
import RadioAgreement from "./RadioAgreement.js";
import * as ROUTES from 'constants/routes';
// Custom hooksLibs
import { useFormFields } from "libs/hooksLibs";
// Authorization
import { AuthUserContext, withAuthorization, helpers } from 'components/Session';
// Firebase
import { withFirebase } from 'components/Firebase';

const useStyles = makeStyles(styles);

function RequestSuitcasePage(props) {
  const [checked, setChecked] = React.useState([24, 22]);
  const classes = useStyles();
  const { ...rest } = props;
  const wrapperDiv = classNames(
    classes.checkboxAndRadio,
    classes.checkboxAndRadioHorizontal
  );
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  /*const handleToggle = value => {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  }; */
  const initialState = {
    destination: "",
    comments: ""
  }
  const [fields, handleFieldChange, resetFields] = useFormFields(initialState);
  const [error, setError] = useState(null);
  const [chapterList, setChapterList] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("Select a Chapter");

  useEffect(() => {
    props.firebase.getChapters().onSnapshot(snapshot => {
      let chapterList = [];
      snapshot.forEach(doc => chapterList.push({ ...doc.data(), uid: doc.id }));
      setChapterList(chapterList);
      console.log(chapterList);
    });
  }, []);

  function validateForm() {
    return (
      fields.destination.length > 0 &&
      fields.comments.length > 0
    );
  }

  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  function onSubmit(e) {
    const { destination, flightno, willingToCarry, whyTakeSuitcase, hearAboutNJT, comments } = fields;
    const chapterId = chapterList.filter(chapter => chapter.name === selectedChapter)[0].uid;
    /*props.firebase
      .then({
        .set({
          destination,
          flightno,
          willingToCarry,
          whyTakeSuitcase,
          hearAboutNJT,
          comments
        })
      })
      .catch(error => {
        setError(null)
        setError(error)
        console.log(error)
      });
    e.preventDefault();*/
  }


  return (
  <AuthUserContext.Consumer>{ authUser => (
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
                  <h4>Request a Suitcase</h4>
                  <div className={classes.socialLine}>
                  </div>
                </CardHeader>
                <CardBody>
                  <p>Please select which chapter you belong to</p>
                    <div>
                      <CustomDropdown
                        buttonText={selectedChapter}
                        dropdownList={chapterList.map(chapter => chapter.name)}
                        onClick={(value) => {
                          setSelectedChapter(value);
                        }}
                      />
                    </div>
                    <br />
                    <div>
                    <p>Please indicate your departure date and time</p>
                      <FormControl fullWidth>
                        <Datetime
                          inputProps={{ placeholder: "Select departure date and time..." }}
                        />
                      </FormControl>
                    </div>
                    <br />
                    <div>
                    <p>Please indicate your return date and time</p>
                      <FormControl fullWidth>
                        <Datetime
                          inputProps={{ placeholder: "Select return date and time..." }}
                        />
                      </FormControl>
                    </div>
                  <CustomInput
                    value={fields.destination}
                    labelText="Destination..."
                    id="destination"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: (e) => handleFieldChange(e),
                      type: "text",
                      autoComplete: "off"
                    }}
                  />
                  <CustomInput
                      value={fields.comments}
                      labelText="Comments/Questions?"
                      id="comments"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: (e) => handleFieldChange(e),
                        type: "password",
                        autoComplete: "off"
                      }}
                    />
                  <br />
                  <br />
                  <h6>I accept the terms of the Traveller Agreement </h6>
                  <p>
                  1) By submitting this form and accepting a suitcase, the traveller assumes full responsibility for the suitcase. The traveller must unpack their suitcase, inspect the contents and repack them. The traveller must not add to or remove anything from the suitcase.
                  </p>
                  <p>
                  2)The suitcase must be taken to a small clinic and cannot be delivered to anyone other then the destination clinic. The doctor receiving the suitcase must sign a letter indicating delivery.
                  </p>
                  <p>
                  3) Not Just Tourists is a non-political organization, no claims or implications shall be made for the delivery of the suitcases other than for humanitarian purposes. The traveller agrees to do so with impartiality, neutrality, independence and voluntary service. The traveller will not discriminate on the basis of nationality, race, religion, gender or political affiliation.
                  </p>
                  <p>
                  4) Not Just Tourists will not reimburse travellers for additional baggage charges, delays or any other damages resulting from delivering a suitcase.The traveller is responsible for knowing applicable laws and regulations in delivering medical supplies to the host country.
                  </p>
                  <p>
                  5) The traveller acknowledges and agrees to indemnify and hold harmless Not Just Tourists Toronto together with all respective directors, officers, volunteers, employees and agents from all liability, all manner of actions, causes of action, suits, demands and costs, including but not limited to those brought by a third party arising from any actions related in any way to accepting/delivering a suitcase.
                  </p>
                  <p>
                  6) Any photos received by Not Just Tourists become the property of the organization and can be used for marketing and promotional purposes.
                  </p>
                  <RadioAgreement />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button
                    disabled={!validateForm()}
                    color="primary" size="lg"
                    onClick={onSubmit}
                    href={ROUTES.HOME}>
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
  )}
  </ AuthUserContext.Consumer>
  );
}

export default withFirebase(RequestSuitcasePage);
