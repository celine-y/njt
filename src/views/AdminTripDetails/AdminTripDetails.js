import React, { useEffect, useState } from "react";
import * as moment from 'moment';

// nodejs library that concatenates classes
import classNames from "classnames";
import { get } from 'lodash';
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import checkBoxStyles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";
import AvailableTimes from 'react-available-times';
import Datetime from "react-datetime";
import Badge from 'components/Badge/Badge.js';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import Button from "components/CustomButtons/Button.js";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// firebase
import { withFirebase } from 'components/Firebase';

// Authorization
import * as ROLES from 'constants/roles';
import { AuthUserContext } from 'components/Session';

import profile from "assets/img/faces/christian.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import styles3 from "assets/jss/material-kit-react/views/landingPage.js";

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(checkBoxStyles);
const useStyles3 = makeStyles(styles3);

function AdminTripDetails(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const classes3 = useStyles3();

  const { ...rest } = props;
  const wrapperDiv = classNames(
    classes2.checkboxAndRadio,
    classes2.checkboxAndRadioHorizontal
  );

  useEffect(() => {
    const tripId = get(props, 'match.params.id', "");
    props.firebase.getAdminTripDetails(tripId)
      .then((res) => {
        setLoading(false);
        setTripDetails(res);
      });
  }, []);

  const [tripDetails, setTripDetails] = useState({});
  const [loading, setLoading] = useState(true);
  var statusOrder = [
    {
      "key": "requested",
      "description": "Filled request to take a suitcase"
    },
    {
      "key": "availabilities",
      "description": "Filled availabilities"
    },
    {
      "key": "confirmed_time",
      "description": "Confirmed suitcase pick-up date"
    },
    {
      "key": "picked_up",
      "description": "Received suitcases from NJT"
    },
    {
      "key": "printed_forms",
      "description": "Printed all travelling documents associated with NJT"
    },
    {
      "key": "delivered",
      "description": "Suitcases has been delivered"
    },
    {
      "key": "feedback",
      "description": "Feedback on the trip and process has been submitted"
    }
  ];

  const toDateTime = secs => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const result = `${t.toLocaleDateString("en-US", options)} at ${t.toLocaleTimeString()}`;
    return result;
  };

  const appendConfirmTime = secs => {
    statusOrder[2].description = `Confirmed suitcase pick-up date: ${toDateTime(secs)}`;
  }

  const getAvailableTimes = (times) => {
    var availableTimes = times.map(time => {
      var st = new Date(1970, 0, 1); // Epoch
      st.setSeconds(time.start_time.seconds);
      var et = new Date(1970, 0, 1); // Epoch
      et.setSeconds(time.end_time.seconds);
      return { "start": st, "end": et };
    });
    return availableTimes;
  };

  // const [availableTimes, setavailableTimes] = useState([]);
  const [confirmedDate, setConfirmedDate] = useState(null);
  const [confirmedDateSuccess, setConfirmedDateSuccess] = useState(null);
  const [confirmedDateFail, setConfirmedDateFail] = useState(null);

  const handleConfirmTime = tripDetails => {
    var isValid = false;

    var availableTimes = getAvailableTimes(tripDetails.availabilities.time);
    availableTimes.forEach(date => {
      if (confirmedDate >= date.start && confirmedDate <= date.end) {
        isValid = true;
      }
    });

    if (confirmedDate && isValid) {
      // convert time to UTC for firebase
      const utcTime = confirmedDate.subtract({ 'hours': 4 });
      props.firebase.setConfirmedTime(tripDetails.tripUid, utcTime.toDate())
        .then((res) => {
          setConfirmedDateSuccess(true);
          setTripDetails(res);
        });
    } else {
      setConfirmedDateFail(true);
    }
  };

  const showConfirmationBlock = tripDetails => (
    <>
      <br />
      <span>
        <span style={{ "fontSize": "1.5625rem", "marginRight": "5px" }}>Confirm meet up time</span>
        <span style={{ "verticalAlign": "text-bottom" }}><Badge color="danger">Action Required</Badge></span>
      </span>
      <br />
      <p>{`Please refer to ${tripDetails.firstName}'s availabilities below.`}</p>
      <div>
        <Datetime
          inputProps={{ placeholder: "Pick a Date and Time here" }}
          onChange={e => setConfirmedDate(e)}
        />
        <Button color="primary" type="button" onClick={() => handleConfirmTime(tripDetails)}>Confirm Time</Button>
      </div>
      <br />
      {confirmedDateFail && (
        <SnackbarContent
          message={
            <span>
              <b>Error: </b>
              {`Please select a date and time that ${tripDetails.firstName} is available.`}
            </span>
          }
          color="danger"
          icon="info_outline"
        />
      )}
    </>
  );

  return (
    <AuthUserContext.Consumer>
      {authUser => authUser && authUser.roles[ROLES.ADMIN] && (
        <div>
          <Parallax small filter image={require("assets/img/profile-bg.jpg")}>
            <div className={classes3.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <h2 className={classes3.title}>Trip Details</h2>
                  <br />
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
              <div className={classes.container}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={8}>
                    {!loading ? <div style={{ "paddingBottom": "30px" }}>
                      <h3 className={classes.title}>{`${tripDetails.firstName} ${tripDetails.lastName}`}</h3>
                      {
                        get(tripDetails, 'availabilities.completed', false) && !get(tripDetails, 'confirmed_time.completed', false) ?
                          showConfirmationBlock(tripDetails) :
                          get(tripDetails, 'confirmed_time.completed', false) &&
                          appendConfirmTime(tripDetails.confirmed_time.time.seconds)
                      }
                      {confirmedDateSuccess && (
                        <SnackbarContent
                          message={
                            <span>
                              <b>SUCCESS: </b>{`You've confirmed suitcase pick up date and time`}
                            </span>
                          }
                          close
                          color="success"
                          icon={Check}
                        />
                      )}
                      <h3>Traveller's status</h3>
                      {statusOrder.map(status =>
                        <div className={wrapperDiv} key={status.key}>
                          <FormControlLabel
                            disabled
                            control={
                              <Checkbox
                                tabIndex={-1}
                                checked={get(tripDetails, `${status.key}.completed`, false)}
                                checkedIcon={<Check className={classes2.checkedIcon} />}
                                icon={<Check className={classes2.uncheckedIcon} />}
                                classes2={{ checked: classes2.checked }}
                              />
                            }
                            classes2={{
                              label: classes2.label,
                              disabled: classes2.disabledCheckboxAndRadio
                            }}
                            label={status.description}
                          />
                        </div>
                      )}
                      <h3>{`Traveller's Information`}</h3>
                      <h5>{`First name: ${tripDetails.firstName}`}</h5>
                      <h5>{`Last name: ${tripDetails.lastName}`}</h5>
                      <h5>{`Email: ${tripDetails.email}`}</h5>
                      <h5>{`Air line: ${tripDetails.airline_name}`}</h5>
                      <h5>{`Departure date: ${toDateTime(get(tripDetails, 'departure_date.seconds', ''))}`}</h5>
                      <h5>{`Return date: ${toDateTime(get(tripDetails, 'return_date.seconds', ''))}`}</h5>
                      <h5>{`Suitcase size: ${tripDetails.suitcase}`}</h5>
                      <h5>{`Supplies traveller is willing to carry:`}
                        {get(tripDetails, 'supplies', []).map(supply => <li key={supply}>{supply}</li>)}
                      </h5>
                      {get(tripDetails, 'availabilities.completed', false) && (
                        <>
                          <h3>{`Traveller's Availabilities`}</h3>
                          <p>{`Available times shown in green`}</p>
                          <AvailableTimes
                            weekStartsOn="sunday"
                            onEventsRequested={({ calendarId, start, end, callback }) => {
                              // loadMoreEvents(calendarId, start, end).then(callback);
                            }}
                            initialSelections={getAvailableTimes(tripDetails.availabilities.time)}
                            height={400}
                            recurring={false}
                            availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']}
                            availableHourRange={{ start: 0, end: 0 }}
                          />
                        </>
                      )}
                    </div> :
                      <div style={{ "display": "flex", "flexFlow": "row", "alignItems": "center", "justifyContent": "center", "margin": "30px 0px" }}>
                        <AutorenewIcon />
                        <h4 className={classes.title} style={{ "margin": "0 5px", "minHeight": "0" }}>Loading...</h4>
                      </div>
                    }
                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </div>
          <Footer />
        </div >
      )
      }
    </AuthUserContext.Consumer >
  );
}

export default withFirebase(AdminTripDetails);
