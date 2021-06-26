import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@material-ui/core";

import "./index.css";

import { fetchVocabulary, setSettingsField } from "../../app/state/settings";

import { setStudentField } from "../../app/state/student";
import { setTutorPrompt, setTutorField } from "../../app/state/tutor";

import { sayIt } from "../../app/state/utils";

import SelectVoice from "../SelectVoice";

import Settings from "../Settings";

const Main = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchVocabulary());
  }, []);

  return (
    <div className="Root">
      <p>{store.Tutor.prompt}</p>

      <hr />

      <Button
        variant="contained"
        onClick={() => {
          dispatch(setTutorPrompt());
        }}
      >
        Give me a word
      </Button>

      <Button
        variant="contained"
        onClick={() => {
          sayIt(store.Tutor.prompt, store.Student.language);
        }}
      >
        Say it!
      </Button>
      <hr />

      <SelectVoice
        label="Tutor's language"
        value={store.Tutor.language}
        setVoice={(v) => {
          dispatch(setTutorField("language", v));
        }}
      />

      <SelectVoice
        label="Student's language"
        value={store.Student.language}
        setVoice={(v) => {
          dispatch(setStudentField("language", v));
        }}
      />

      <Settings />
    </div>
  );
};

export default Main;
