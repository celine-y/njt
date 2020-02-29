import React from "react";
import classNames from "classnames";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import styles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

const useStyles = makeStyles(styles);


export default function RadioCanTransport(){
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const classes = useStyles();
  const wrapperDiv = classNames(
    classes.checkboxAndRadio,
    classes.checkboxAndRadioHorizontal
  );
  return (
    <div>
      <div className={wrapperDiv}>
        <FormControlLabel
          control={
            <Radio
              checked={selectedEnabled === "a"}
              onChange={() => setSelectedEnabled("a")}
              value="a"
              name="radio button enabled"
              aria-label="A"
              icon={
                <FiberManualRecord
                  className={classes.radioUnchecked}
                />
              }
              checkedIcon={
                <FiberManualRecord className={classes.radioChecked} />
              }
              classes={{
                checked: classes.radio
              }}
            />
          }
          classes={{
            label: classes.label
          }}
          label= "Small Package (5kg)"
        />
      </div>
      <div className={wrapperDiv}>
        <FormControlLabel
          control={
            <Radio
              checked={selectedEnabled === "b"}
              onChange={() => setSelectedEnabled("b")}
              value="b"
              name="radio button enabled"
              aria-label="B"
              icon={
                <FiberManualRecord
                  className={classes.radioUnchecked}
                />
              }
              checkedIcon={
                <FiberManualRecord className={classes.radioChecked} />
              }
              classes={{
                checked: classes.radio
              }}
            />
          }
          classes={{
            label: classes.label
          }}
          label= "Large Package (5kg)"
        />
      </div>
      <div className={wrapperDiv}>
        <FormControlLabel
          control={
            <Radio
              checked={selectedEnabled === "b"}
              onChange={() => setSelectedEnabled("b")}
              value="b"
              name="radio button enabled"
              aria-label="B"
              icon={
                <FiberManualRecord
                  className={classes.radioUnchecked}
                />
              }
              checkedIcon={
                <FiberManualRecord className={classes.radioChecked} />
              }
              classes={{
                checked: classes.radio
              }}
            />
          }
          classes={{
            label: classes.label
          }}
          label= "Full Suitcase"
        />
      </div>
      <div className={wrapperDiv}>
        <FormControlLabel
          control={
            <Radio
              checked={selectedEnabled === "b"}
              onChange={() => setSelectedEnabled("b")}
              value="b"
              name="radio button enabled"
              aria-label="B"
              icon={
                <FiberManualRecord
                  className={classes.radioUnchecked}
                />
              }
              checkedIcon={
                <FiberManualRecord className={classes.radioChecked} />
              }
              classes={{
                checked: classes.radio
              }}
            />
          }
          classes={{
            label: classes.label
          }}
          label= "Larger Amount"
        />
      </div>
    </div>
  );
}
