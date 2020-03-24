import React ,{useEffect,useState}from "react";

import { get } from 'lodash';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";



// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import { cardTitle } from "assets/jss/material-kit-react.js";
import dropbuttonStyles from "assets/jss/material-kit-react/dropbutton.js";


// Authorization
import { AuthUserContext, withAuthorization } from 'components/Session';

//connect firebase
import { withFirebase } from 'components/Firebase';

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

//date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//available time
import AvailableTimes from 'react-available-times';

import Select from "react-dropdown-select";
import SelectSearch from 'react-select-search'

import profile from "assets/img/faces/blank.png";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

import * as ROUTES from 'constants/routes';

import Collapsible from 'react-collapsible';
import { setConstantValue } from "typescript";
//load check mark image
import checkMarker from '../../assets/img/icon-mark.png'

const useStyles = makeStyles(styles);
const userStyle2 = makeStyles(dropbuttonStyles);

const cardStyles = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  }
};

const options = [
  'Yes', 'No'
];


function AdminTrips(props) {
  const classes = useStyles();
  const classes2 = userStyle2();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const { ...rest } = props;
  const [objectArrayTime,setObjectArrayTime]=useState([]);
  const [tripDetail,setTripDetail]=useState({});
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);


  const [tripID,setTripID] = useState("");
  const [dropValue1,setDropValue1] = useState("Yes");
  const [dropValue2,setDropValue2]= useState("No");
  const [dropValue3,setDropValue3]= useState("No");
  const [dropValue4,setDropValue4]= useState("No");
  const [dropValue5,setDropValue5]= useState("No");
  const [dropValue6,setDropValue6]= useState("No");


  const [startDate, setStartDate] = useState(new Date());
  const [clinicValue,setClinicValue] =useState({});
  const [clinic,setClinic]=useState([]);
  const [checkModal,setCheckModal]=useState(true);
  const [checkModal1,setCheckModal1]=useState(false);

  useEffect(() => {
    const tripId = get(props, 'match.params.id', "");
    setTripID(tripId);
    props.firebase.getTripDetails(tripId)
      .then((res) => {

        if(res !=={}) {
          setTripDetail(res);
          if(!res.requested.completed) setDropValue1("No");
          if(res.availabilities.completed) setDropValue2("Yes");
          if(res.picked_up.completed) setDropValue3("Yes");
          if(res.printed_forms.completed) setDropValue4("Yes");
          if(res.delivered.completed) setDropValue5("Yes");
          if(res.feedback.completed) setDropValue6("Yes");
          console.log(res);
        };

      });

  }, []);

  useEffect(() => {

    props.firebase.getClinics()
      .then((res) => {
       if(res !=={}){
        let temp = [];
        res.map((item, index) => {
          temp.push({ name: item.clinic_name, value: item.clinicUid })
        })
        setClinic(temp);
       }

      });
  }, []);

  function onSubmitRequest(){

   let requestResult=props.firebase.setRequestTripDetail(tripID,dropValue1);
    setOpen2(true)
    if(requestResult =={}){
         setCheckModal(false);
    }

  }

  function onSubmitPrint(){

   let printResult= props.firebase.setPrintTripDetail(tripID,dropValue4);
    setOpen2(true);
    if(printResult =={}){
      setCheckModal(false);
    }

  }

  function onSubmitPickup(){

     let pickupResult= props.firebase.setPrickupTripDetail(tripID,dropValue3);
      setOpen2(true);
      if(pickupResult =={}){
        setCheckModal(false);
      }



  }

  function onSubmitFeedback(){

     let feedbackResult= props.firebase.setFeedbackTripDetail(tripID,dropValue6);
      setOpen2(true);
      if(feedbackResult =={}){
        setCheckModal(false);
      }



  }


  function onSubmitDelivered(){
    let Dclinic="";
    console.log(tripID)
    if(clinicValue !==[]) Dclinic=clinicValue[0].value;
    console.log(clinicValue);
     let deliverResult=props.firebase.setDeliveredTripDetail(tripID,dropValue5,Dclinic);
      setOpen2(true);
      if(deliverResult =={}){
        setCheckModal(false);
      }

  }


  function onSubmitAvailTime(){

      let availableResult= props.firebase.setAvailTimeTripDetail(tripID,dropValue2,objectArrayTime);
        setOpen(false);
        setOpen1(true);

  }

  function onSubmitAvailCompleted(){
    let availabilities= props.firebase.setAvailTimeCompletedTripDetail(tripID,dropValue2,objectArrayTime);
    setOpen2(true);
    if(availabilities =={}){
      setCheckModal(false);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
    setObjectArrayTime([]);
    setCheckModal1(false);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleClose1 = () => {
    setOpen1(false);

  };
  const handleClose2 = () => {
    setOpen2(false);

  };

  function availableTimeFunction(selections){
    let objectArray=[];
    selections.forEach(({ start, end }) => {
      console.log('Start:', start, 'End:', end);
      let object={
        start_time:start,
        end_time:end
      }
      objectArray.push(object);
    });
    if(objectArray!==[]) setCheckModal1(true)
    setObjectArrayTime(objectArray);

  }
 console.log(clinic);
  return (
    <div>
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                </div>
              </GridItem>
            </GridContainer>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                     <h4 className={classes.cardTitle}>1. Requested</h4>
                     {
                       dropValue1 ==='Yes' &&(
                        <img src={checkMarker}/>
                       )
                     }

                  </div>

                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <p>Have you Requested a Suitcase?</p>

                      <Dropdown
                      options={options}
                      className={classes2.cusButton}
                      value={dropValue1}
                      onChange={(Dvalue)=>setDropValue1(Dvalue.value)}
                      controlClassName={classes2.controlButton}/>
                  </div>
                  <div style={{paddingTop:20,textAlign:'right'}}>
                    <Button
                        color="primary"
                        size="sm"
                        rel="noopener noreferrer"
                        onClick={onSubmitRequest}
                      >Done
                      </Button>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>

                  <h4 className={classes.cardTitle}>2. Set Time</h4>
                  {
                    dropValue2 === 'Yes'&&(
                      <img src={checkMarker}/>
                    )
                  }
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <p>Have you Set your Availability?</p>
                      <Dropdown
                      options={options}
                      className={classes2.cusButton}
                      value={dropValue2}
                      onChange={(Dvalue)=>setDropValue2(Dvalue.value)}
                      controlClassName={classes2.controlButton}/>

                  </div>
                  <div style={{paddingTop:20,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <Button
                        color="primary"
                        size="sm"
                        rel="noopener noreferrer"
                        onClick={handleClickOpen}
                      >Set Avail
                      </Button>
                      <Button
                        color="primary"
                        size="sm"
                        rel="noopener noreferrer"
                        onClick={onSubmitAvailCompleted}
                      >done
                      </Button>
                  </div>

                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h4 className={classes.cardTitle}>3. Pickup</h4>
                {
                    dropValue3 === 'Yes'&&(
                      <img src={checkMarker}/>
                    )
                  }
                </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <p>Have you Picked up a Suitcase?</p>
                      <Dropdown
                      options={options}
                      className={classes2.cusButton}
                      value={dropValue3}
                      onChange={(Dvalue)=>setDropValue3(Dvalue.value)}
                      controlClassName={classes2.controlButton}/>
                  </div>
                  <div style={{paddingTop:20,textAlign:'right'}}>
                      <Button
                        color="primary"
                        size="sm"
                        rel="noopener noreferrer"
                        onClick={onSubmitPickup}
                      >Done
                      </Button>
                  </div>

                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h4 className={classes.cardTitle}>4. Print</h4>
                {
                     dropValue4 === 'Yes'&&(
                      <img src={checkMarker}/>
                    )
                  }
                </div>

                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <p>Have you Printed the Forms?</p>
                      <Dropdown
                      options={options}
                      className={classes2.cusButton}
                      value={dropValue4}
                      onChange={(Dvalue)=>setDropValue4(Dvalue.value)}
                      controlClassName={classes2.controlButton}/>
                  </div>
                  <div style={{paddingTop:20,textAlign:'right'}}>
                      <Button
                        color="primary"
                        size="sm"
                        rel="noopener noreferrer"
                        onClick={onSubmitPrint}
                      >Done
                      </Button>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h4 className={classes.cardTitle}>5. Delivered</h4>
                {
                    dropValue5 === 'Yes'&&(
                      <img src={checkMarker}/>
                    )
                  }
                </div>

                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                     <p>Have you Delivered to a Clinic?</p>
                      <Dropdown
                      options={options}
                      className={classes2.cusButton}
                      value={dropValue5}
                      onChange={(Dvalue)=>setDropValue5(Dvalue.value)}
                      controlClassName={classes2.controlButton}/>
                  </div>

                 <div style={{display:'flex',justifyContent:'flex-first',alignItems:'center'}}>

                <Select
                   options={clinic}
                   searchable={true}
                   multi={false}
                   dropdownHeight="200px"
                   color="#16917D"
                   placeholder="Search Clinic"
                   labelField="name"
                   clearable={true}
                   onChange={(value)=>setClinicValue(value)}
                   />
                   </div>
            <div style={{paddingTop:20,display:'flex',justifyContent:'space-between',alignItems: 'center',}}>

            <Button
             color="primary"
             size="sm"
             href={ROUTES.SUBMIT_CLINIC}
             target="_blank"
             rel="noopener noreferrer">Add New Clinic</Button>

                  <Button
                        color="primary"
                        size="sm"
                        rel="noopener noreferrer"
                        onClick={onSubmitDelivered}
                      >Done
                      </Button>
                 </div>
                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h4 className={classes.cardTitle}>6. Feedback</h4>
                {
                     dropValue6 === 'Yes'&&(
                      <img src={checkMarker}/>
                    )
                  }
                </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <p>Have you Completed Feedback?</p>
                      <Dropdown
                      options={options}
                      className={classes2.cusButton}
                      value={dropValue6}
                      onChange={(Dvalue)=>setDropValue6(Dvalue.value)}
                      controlClassName={classes2.controlButton}/>
                  </div>
                  <div style={{paddingTop:20,textAlign:'right'}}>
                      <Button
                        color="primary"
                        size="sm"
                        rel="noopener noreferrer"
                        onClick={onSubmitFeedback}
                      >Done
                      </Button>
                  </div>

                </CardBody>
              </Card>
            </div>


            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <AvailableTimes
            weekStartsOn="monday"
            calendars={[
              {
                id: 'work',
                title: 'Work',
                foregroundColor: '#ff00ff',
                backgroundColor: '#f0f0f0',
                selected: true,
              },
              {
                id: 'private',
                title: 'My private cal',
                foregroundColor: '#666',
                backgroundColor: '#f3f3f3',
              },
            ]}
            onChange={(selections) => {
              availableTimeFunction(selections)
            }}
            onEventsRequested={({ calendarId, start, end, callback }) => {
            }}
            height={600}
            width={600}
            recurring={false}
            availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday','saturday','sunday']}
            availableHourRange={{ start: 0, end: 24 }}
          />
        <DialogActions>

          <Button onClick={onSubmitAvailTime} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
        </Dialog>
         <Dialog
            open={open1}
            onClose={handleClose1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{checkModal1?"Thanks for inputting your times.":"Please try again later."}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose1} color="primary" autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={open2}
            onClose={handleClose2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{checkModal?"Your checklist has been updated.":"Please try again later."}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose2} color="primary" autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>


      <Footer />
    </div >
  );

}

export default withFirebase(AdminTrips);
