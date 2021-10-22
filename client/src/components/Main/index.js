import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
//import Stack from "@mui/material/Stack";
//import { Slider } from "@mui/core";

import { setStudentField } from "../../app/state/student";
import {
  setTutorPrompt,
  setTutorField,
  translateText,
} from "../../app/state/tutor";

import { sayIt } from "../../app/state/utils";

import SelectVocabularyMode from "../SelectVocabularyMode";
import SelectLanguages from "../SelectLanguages";
import SelectPracticeMode from "../SelectPracticeMode";

const Main = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [hintSpeechRate, setHintSpeechRate] = useState(100);

  return (
    <div className="Root">
      <Button
        variant="contained"
        onClick={() => {
          dispatch(setTutorPrompt());
        }}
      >
        Set a prompt
      </Button>
      <hr />
      <p>{store.Tutor.prompt}</p>
      <p>{store.Student.response}</p>
      <hr />

      <Button
        variant="contained"
        onClick={() => {
          sayIt(store.Tutor.prompt, store.Student.language);
        }}
      >
        Say the prompt
      </Button>
      <hr />

      <Box style={{ width: "200px", margin: "10px" }}>
        Slow
        <Slider
          alignItems="center"
          value={hintSpeechRate}
          onChange={(e, v) => {
            console.log(v);
            setHintSpeechRate(v);
          }}
        />
        Fast
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          //dispatch(translateText(store.Tutor.prompt, store.Tutor.language));
          var rate = 0.5 + (0.5 * hintSpeechRate) / 100;
          sayIt(store.Student.response, store.Tutor.language, rate);
        }}
      >
        Say the response
      </Button>

      <hr />
      <SelectLanguages />
      <SelectPracticeMode />
      <SelectVocabularyMode />
    </div>
  );
};

export default Main;
