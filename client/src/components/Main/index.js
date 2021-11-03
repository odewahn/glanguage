import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Fab, Stack } from "@mui/material";
import HearingIcon from "@mui/icons-material/Hearing";

import Layout from "../Layout";

import { setPrompt, sayPrompt } from "../../app/state/prompt";

import { sayIt } from "../../app/state/utils";

import Dictaphone from "../DictaphoneSpeechRecognition";

import "./index.css";

const Main = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  useEffect(() => {
    console.log("!!!!!translation changed!!!!");
    console.log("Translation is", store.Prompt.prompt_translation);
    dispatch(sayPrompt());
  }, [store.Prompt.prompt_translation]);

  return (
    <Layout title="Pratice">
      <hr />

      <Button
        onClick={() => {
          sayIt(
            store.Prompt.prompt_translation,
            store.Tutor.language,
            store.Tutor.rate
          );
        }}
      >
        Repeat
      </Button>

      <Button
        onClick={() => {
          sayIt(store.Prompt.prompt_translation, store.Tutor.language, 0);
        }}
      >
        Repeat slowly
      </Button>
      <hr />

      <Stack direction="row" spacing={2}>
        <Fab
          onClick={() => {
            dispatch(setPrompt());
          }}
        >
          <HearingIcon />
        </Fab>
        <Dictaphone />
      </Stack>

      <h2>{store.Student.response}</h2>
    </Layout>
  );
};

export default Main;
