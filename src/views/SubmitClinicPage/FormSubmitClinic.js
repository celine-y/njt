import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

//gives image at the top
import Parallax from "components/Parallax/Parallax.js";
import classNames from "classnames";

// material-ui components
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import { useFormFields } from "libs/hooksLibs";

import AddressItem from 'components/Address/AddressItem';
import AddressInput from 'components/Address/AddressInput';
import * as ROUTES from 'constants/routes';

import {Client} from "@googlemaps/google-maps-services-js";

const useStyles = makeStyles(styles);
export default function FormSubmitClinic(props){
  const classes = useStyles();
  const { ...rest } = props;
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const initialState = {
    clinicName: "",
    street: "",
    country: "",
    province: "",
    comments: ""
  }

  const [fields, handleFieldChange, setFields] = useFormFields(initialState);
  const [error, setError] = useState(null);

  const client = new Client({});

  function changeQuery(q){
      if(q) {
        client
        .textSearch({
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000/"
          },
          params: {
            query: [q],
            fields: 'place_id',
            key: process.env.GOOGLE_MAPS_API_KEY,
          },
          timeout: 1000 // milliseconds
        })
        .then(r => {
          console.log(r.data.results);
        })
        .catch(e => {
          console.log(e);
        });
      }
  }


  function onSubmit(e) {
    console.log(fields);
    e.preventDefault();
  }



  return (
      <GridContainer justify="center">
        <GridItem xs={12}>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>Submit a Clinic</h4>
                <div className={classes.socialLine}>
                </div>
              </CardHeader>
              <CardBody>
              <p>Please fill out the following information regarding the clinic</p>
                <AddressItem
                  labelText="Clinic Name..."
                  id="clinicName"
                  onChange={changeQuery}
                />
                <AddressInput
                  onChange={handleFieldChange}
                 />
                <CustomInput
                    labelText="Additional Comments"
                    id="comments"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: (e) => handleFieldChange(e),
                      type: "text"
                    }}
                  />
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button color="primary" size="lg"
                  onClick={onSubmit}>
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
  );
}
