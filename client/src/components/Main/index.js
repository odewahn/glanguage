import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";

import { Button } from "@material-ui/core";

import { setStudentField } from "../../app/state/student";
import { setTutorPrompt, setTutorField } from "../../app/state/tutor";

import { sayIt } from "../../app/state/utils";

import SelectVoice from "../SelectVoice";
import Settings from "../Settings";

const Main = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

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
        Set a prompt
      </Button>

      <Button
        variant="contained"
        onClick={() => {
          sayIt(store.Tutor.prompt, store.Tutor.language);
        }}
      >
        Repeat Prompt
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
