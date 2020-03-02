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

// import {Client} from "@googlemaps/google-maps-services-js";
import Script from 'react-load-script';

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
    comments: "",
    placeId: ""
  }

  const [fields, handleFieldChange, setFields] = useFormFields(initialState);
  const [error, setError] = useState(null);

  var autocomplete = null

  function handleScriptLoad(){
    // Declare Options For Autocomplete
    const options = {
      types: ['establishment'],
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('clinicName'),
      options
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    autocomplete.setFields(['place_id', 'formatted_address', 'address_components', 'name']);

    // Fire Event when a suggested name is selected
    autocomplete.addListener('place_changed', handlePlaceSelect);
  }

  function handlePlaceSelect(){
    // Extract City From Address Object
    const addressObject = autocomplete.getPlace();
    if (addressObject) {
      const components = addressObject.address_components;
      const newFields = {
        clinicName: addressObject.name,
        street: getAddressComponent(components, "route"),
        country: getAddressComponent(components, "country"),
        province: getAddressComponent(components, "locality"),
        comments: fields.comments,
        placeId: addressObject.place_id
      }
      setFields(newFields)
    }
  }

  function getAddressComponent(components, componentName) {
    var filtered_array = components.filter(function(address_component){
        return address_component.types.includes(componentName);
    });
    return filtered_array.length > 0 ? filtered_array[0].long_name : ""
  }

  function onSubmit(e) {
    console.log(fields);
    e.preventDefault();
  }

  function getGoogleURL(){
    return ("https://maps.googleapis.com/maps/api/js?key=AIzaSyCooo1YO7bBY4v5a_x2HJGPyiEGxD6DJj0&libraries=places")
  }


  return (
    <div>
      <Script url={getGoogleURL()}
        onLoad={handleScriptLoad}
      />
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
                  onChange={handleFieldChange}
                />
                <AddressInput
                  fields={fields} />
                <CustomInput
                    labelText="Additional Comments"
                    id="comments"
                    value={fields.comments}
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
    </div>
  );
}
