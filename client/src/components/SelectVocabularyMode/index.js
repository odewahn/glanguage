import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";

import { setSettingsField } from "../../app/state/settings";

const Main = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  return (
    <div>
      <h3>Vocabulary to practice</h3>
      <FormControl component="fieldset">
        <RadioGroup
          name="mode"
          value={store.Settings.mode}
          onChange={(e) => {
            dispatch(setSettingsField("mode", e.target.value));
          }}
        >
          <FormControlLabel
            value="numbers"
            control={<Radio />}
            label="Numbers"
          />
          {store.Settings.mode === "numbers" ? (
            <div>
              <div className="BoundsInput">
                <TextField
                  variant="outlined"
                  label="From"
                  value={store.Settings.numbers_lower_bound}
                  onChange={(e) => {
                    dispatch(
                      setSettingsField("numbers_lower_bound", e.target.value)
                    );
                  }}
                />
              </div>
              <div className="BoundsInput">
                <TextField
                  className="BoundsInput"
                  variant="outlined"
                  label="To"
                  value={store.Settings.numbers_upper_bound}
                  onChange={(e) => {
                    dispatch(
                      setSettingsField("numbers_upper_bound", e.target.value)
                    );
                  }}
                />
              </div>
            </div>
          ) : null}
          <FormControlLabel value="dates" control={<Radio />} label="Dates" />
          <FormControlLabel
            value="prepositions"
            control={<Radio />}
            label="Prepositions"
          />
          <FormControlLabel
            disabled
            value="nouns_and_verbs"
            control={<Radio />}
            label="Nouns and verbs"
          />
          <FormControlLabel
            disabled
            value="questions"
            control={<Radio />}
            label="Questions"
          />
          <FormControlLabel
            disabled
            value="mad_libs"
            control={<Radio />}
            label="Mad-Lib style sentences"
          />
          <FormControlLabel
            disabled
            value="answer_questions_about_passages"
            control={<Radio />}
            label="Answer questions about passages"
          />
          <FormControlLabel
            disabled
            value="gpt3_conversation"
            control={<Radio />}
            label="GPT-3 conversation partner"
          />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="(Disabled option)"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Main;
