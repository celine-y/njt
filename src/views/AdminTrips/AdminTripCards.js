import React, { useState, useEffect } from "react";
import { get } from "lodash";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Badge from 'components/Badge/Badge.js';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

// @material-ui/icons
import Event from '@material-ui/icons/Event';

// firebase
import { withFirebase } from 'components/Firebase';

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

function AdminTripCards(props) {
  const classes = useStyles();

  useEffect(() => {
    props.firebase.process_tasks(props.authUser.chapter)
      .then((res) => {
        setLoading(false);
        setTripList(res);
      });
  }, []);

  const [tripList, setTripList] = useState([]);
  const [loading, setLoading] = useState(true);

  return !loading ? tripList.map(trip => (
    <Card key={trip.trip_uid}>
      <CardBody>
        <span style={{ "display": "in-line" }}>
          <span style={{ "fontSize": "20px" }}>{trip.firstName}</span>
          <span style={{ "float": "right" }}>
            {get(trip, 'availabilities.completed', false) && !get(trip, 'confirmed_time.completed', false) && <Badge color="danger">Action Required</Badge>}
          </span>
        </span>
        <p>{`Destination: ${trip.destination}`}</p>
        <Button color="primary">View Details</Button>
      </CardBody>
    </Card >
  )) : <div>Loading</div>
}
export default withFirebase(AdminTripCards);
