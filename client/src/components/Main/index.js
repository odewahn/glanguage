import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";

import { Button } from "@material-ui/core";

import { setStudentField } from "../../app/state/student";
import { setTutorPrompt, setTutorField } from "../../app/state/tutor";

import { sayIt } from "../../app/state/utils";

import SelectVocabularyMode from "../SelectVocabularyMode";
import SelectLanguages from "../SelectLanguages";
import SelectPracticeMode from "../SelectPracticeMode";

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

      <SelectLanguages />
      <SelectPracticeMode />

      <SelectVocabularyMode />
    </div>
  );
};

export default Main;
