import React, { useState, useEffect } from "react";
import { get } from "lodash";
import { Link } from "react-router-dom";
import * as ROUTES from 'constants/routes';

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Badge from 'components/Badge/Badge.js';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import InfoArea from "components/InfoArea/InfoArea.js";

// @material-ui/icons
import AutorenewIcon from '@material-ui/icons/Autorenew';

// firebase
import { withFirebase } from 'components/Firebase';

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

function AdminTripCards(props) {
  const classes = useStyles();

  useEffect(() => {
    props.firebase.getAdminTrips(props.authUser.chapter)
      .then((res) => {
        setLoading(false);
        setTripList(res);
      });
  }, []);

  const [tripList, setTripList] = useState([]);
  const [loading, setLoading] = useState(true);

  return !loading ? tripList.map(trip => (
    <Card key={trip.tripUid}>
      <CardBody>
        <span style={{ "display": "in-line" }}>
          <span style={{ "fontSize": "20px" }}>{`${trip.firstName} ${trip.lastName}`}</span>
          <span style={{ "float": "right" }}>
            {get(trip, 'availabilities.completed', false) && !get(trip, 'confirmed_time.completed', false) && <Badge color="danger">Action Required</Badge>}
          </span>
        </span>
        <p>{`Destination: ${trip.destination}`}</p>
        <Button
          color="primary"
          component={Link}
          to={`/admin-trip-details/${trip.tripUid}`}
        >
          View Details
        </Button>
      </CardBody>
    </Card >
  )) :
    <InfoArea
      title="Loading..."
      description=""
      icon={AutorenewIcon}
      iconColor="rose"
    />
}
export default withFirebase(AdminTripCards);
