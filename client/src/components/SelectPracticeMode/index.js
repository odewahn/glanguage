import React from "react";
import { useDispatch, useSelector } from "react-redux";

import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { setSettingsField } from "../../app/state/settings";

const Main = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  return (
    <div>
      <h3>Practice type</h3>
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
            label="Listen in the tutor's language and respond in my language"
          />
          <FormControlLabel
            value="speaking"
            control={<Radio />}
            label="Listen in my language and respond in the tutor's language"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Main;
