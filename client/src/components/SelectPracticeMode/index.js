import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import { setSettingsField } from "../../app/state/settings";

const Main = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  return (
    <FormControl component="fieldset">
      <RadioGroup
        name="practice_type"
        value={store.Settings.practice_type}
        onChange={(e) => {
          dispatch(setSettingsField("practice_type", e.target.value));
        }}
      >
        <FormControlLabel
          value="listening"
          control={<Radio />}
          label="Listening to"
        />
        <FormControlLabel
          value="speaking"
          control={<Radio />}
          label="Speaking to"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default Main;
