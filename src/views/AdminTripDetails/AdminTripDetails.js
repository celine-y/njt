import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { get } from 'lodash';
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AutorenewIcon from '@material-ui/icons/Autorenew';

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import checkBoxStyles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";
import AvailableTimes from 'react-available-times';
import Datetime from "react-datetime";
import Badge from 'components/Badge/Badge.js';

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

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(checkBoxStyles);

function AdminTripDetails(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
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
        console.log(res);
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
      "description": "Confirmed suitcase pick-up date and location"
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
    statusOrder[2].description = `Confirmed suitcase pick-up date and location: ${toDateTime(secs)}`;
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

  const handleConfirmTime = tripDetails => {
    console.log(confirmedDate);
    var isValid = false;

    var availableTimes = getAvailableTimes(tripDetails.availabilities.times);
    availableTimes.forEach(date => {
      console.log(date);
      if (confirmedDate >= date.start && confirmedDate <= date.end) {
        isValid = true;
      }
    });

    if (confirmedDate && isValid) {
      console.log("IN RANGE");
      props.firebase.tripByTripId(tripDetails.tripUid)
        .set({ confirmed_time: { completed: true, time: confirmedDate } }, { merge: true });
    } else {
      console.log("NOT IN RANGE");
    }
  };

  const availabilityCalendar = tripDetails => {
    var availableTimes = getAvailableTimes(tripDetails.availabilities.times);
    console.log(availableTimes);
    return (
      <>
        <br />
        <span>
          <span style={{ "fontSize": "1.5625rem", "marginRight": "5px" }}>Confirm meet up time</span>
          <span style={{ "verticalAlign": "text-bottom" }}><Badge color="danger">Action Required</Badge></span>
        </span>
        <span>
          <Datetime
            inputProps={{ placeholder: "Pick a Date and Time here" }}
            onChange={e => setConfirmedDate(e.toDate())}
          />
          <Button color="primary" type="button" onClick={() => handleConfirmTime(tripDetails)}>Confirm Time</Button>
        </span>
        <h5>{`Refer to ${tripDetails.firstName}'s availabilities in green below.`}</h5>
        <AvailableTimes
          weekStartsOn="sunday"
          onChange={(selections) => {
            selections.forEach(({ start, end }) => {
              console.log('Start:', start, 'End:', end);
            })
          }}
          onEventsRequested={({ calendarId, start, end, callback }) => {
            // loadMoreEvents(calendarId, start, end).then(callback);
          }}
          initialSelections={availableTimes}
          height={400}
          recurring={false}
          availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']}
          availableHourRange={{ start: 0, end: 0 }}
        />
        <br />
      </>
    )
  }

  return (
    <AuthUserContext.Consumer>
      {authUser => authUser && authUser.roles[ROLES.ADMIN] && (
        <div>
          <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
              <div className={classes.container}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={6}>
                    {!loading ? <div style={{ "paddingBottom": "30px" }}>
                      <h3 className={classes.title}>{`${tripDetails.firstName}'s Trip Details`}</h3>
                      {
                        get(tripDetails, 'availabilities.completed', false) && !get(tripDetails, 'confirmed_time.completed', false) ?
                          availabilityCalendar(tripDetails) :
                          get(tripDetails, 'confirmed_time.completed', false) &&
                          appendConfirmTime(tripDetails.confirmed_time.time.seconds)
                      }
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
