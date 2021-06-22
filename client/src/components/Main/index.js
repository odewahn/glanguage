import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

import TextField from "@material-ui/core/TextField";

import "./index.css";

import {
  fetchVocabulary,
  setVocabularyField,
  setTarget,
} from "../../app/state/vocabulary";
import { setSettingsField } from "../../app/state/settings";

import SelectVoice from "../SelectVoice";

const Main = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchVocabulary());
  }, []);

  const sayIt = () => {
    const voices = speechSynthesis.getVoices();
    let utterance = new window.SpeechSynthesisUtterance(
      store.Vocabulary.target
    );
    utterance.voice = voices[store.Settings.tutor_language];
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="Root">
      <input
        value={store.Vocabulary.target}
        onChange={(e) => {
          dispatch(setVocabularyField("target", e.target.value));
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          dispatch(setTarget());
        }}
      >
        Click me!
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          sayIt();
        }}
      >
        Say it!
      </Button>
      <hr />

      <SelectVoice
        label="Tutor's language"
        value={store.Settings.tutor_language}
        setVoice={(v) => {
          console.log(v);
          dispatch(setSettingsField("tutor_language", v));
        }}
      />

      <SelectVoice
        label="Student's language"
        value={store.Settings.student_language}
        setVoice={(v) => {
          console.log(v);
          dispatch(setSettingsField("student_language", v));
        }}
      />

      <FormControl component="fieldset">
        <FormLabel component="legend">Mode</FormLabel>
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

      <h1>Resources</h1>
    </div>
  );
};

export default Main;
