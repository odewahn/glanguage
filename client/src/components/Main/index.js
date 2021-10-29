import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";

import { Button, Box, Slider, Stack } from "@mui/material";

import { setTutorField } from "../../app/state/tutor";

import { setPrompt, sayPrompt } from "../../app/state/prompt";

import { sayIt } from "../../app/state/utils";

import SelectVocabularyMode from "../SelectVocabularyMode";
import SelectLanguages from "../SelectLanguages";
import SelectPracticeMode from "../SelectPracticeMode";
import Dictaphone from "../DictaphoneSpeechRecognition";

const Main = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  useEffect(() => {
    console.log("!!!!!translation changed!!!!");
    console.log("Translation is", store.Prompt.prompt_translation);
    dispatch(sayPrompt());
  }, [store.Prompt.prompt_translation]);

  return (
    <div className="Root">
      <Button
        variant="contained"
        onClick={() => {
          dispatch(setPrompt());
        }}
      >
        Set a prompt
      </Button>
      <hr />
      <p>{store.Prompt.prompt}</p>
      <p>{store.Prompt.prompt_translation}</p>
      <hr />

      <Button
        variant="contained"
        onClick={() => {
          //dispatch(sayPrompt());
          sayIt(store.Prompt.prompt, store.Student.language);
        }}
      >
        Say the prompt
      </Button>
      <hr />

      <Box style={{ width: "200px", margin: "10px" }}>
        <Stack direction="row" spacing={2}>
          Slow
          <Slider
            value={store.Tutor.rate}
            mim={0}
            max={100}
            onChange={(e, v) => {
              dispatch(setTutorField("rate", v));
            }}
          />
          Fast
        </Stack>
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          sayIt(
            store.Prompt.prompt_translation,
            store.Tutor.language,
            store.Tutor.rate
          );
        }}
      >
        Say the response
      </Button>

      <hr />

      <Dictaphone />
      {store.Student.response}

      <hr />

      <SelectLanguages />
      <SelectPracticeMode />
      <SelectVocabularyMode />
    </div>
  );
};

export default Main;
