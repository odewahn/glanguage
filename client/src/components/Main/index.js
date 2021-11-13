import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Fab, Stack } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import ReplayIcon from "@mui/icons-material/Replay";

import Layout from "../Layout";

import { setPrompt } from "../../app/state/prompt";

import { sayIt } from "../../app/state/tutor";

import Dictaphone from "./DictaphoneSpeechRecognition";

import "./index.css";

const Main = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  useEffect(() => {
    console.log("Practice type is", store.Settings.practice_type);

    var text = store.Prompt.prompt;
    var language = store.Student.voice_idx;
    if (store.Settings.practice_type == "listening") {
      text = store.Prompt.prompt_translation;
      language = store.Tutor.voice_idx;
    }
    console.log("I'm saying", text, "using language", language);
    sayIt(text, language, 100);
  }, [store.Prompt.prompt_translation]);

  return (
    <Layout title="Practice">
      <div style={{ marginTop: "45px" }} />

      <Grid container spacing={2}>
        <Grid
          item
          xs={2}
          sx={{ border: 1, background: "darkgrey", textAlign: "center" }}
        >
          <h1>Q</h1>
        </Grid>

        <Grid item xs={10} sx={{ border: 1 }}>
          {store.Settings.practice_type == "speaking"
            ? store.Prompt.prompt
            : store.Prompt.prompt_translation}
        </Grid>

        <Grid
          item
          xs={2}
          sx={{ border: 1, background: "darkgrey", textAlign: "center" }}
        >
          <h1>A</h1>
        </Grid>
        <Grid item xs={10} sx={{ border: 1, backdropFilter: "blur(6px)" }}>
          {store.Settings.practice_type == "speaking"
            ? store.Prompt.prompt_translation
            : store.Prompt.prompt}
        </Grid>

        <Grid
          item
          xs={2}
          sx={{ border: 1, background: "darkgrey", textAlign: "center" }}
        >
          <h1>R</h1>
        </Grid>

        <Grid item xs={10} sx={{ border: 1 }}>
          {store.Student.response_in_progress}
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Fab
              onClick={() => {
                dispatch(setPrompt());
              }}
            >
              <PlayArrowIcon />
            </Fab>
            <Fab
              onClick={() => {
                sayIt(
                  store.Prompt.prompt_translation,
                  store.Tutor.voice_idx,
                  store.Tutor.rate
                );
              }}
            >
              <ReplayIcon />
            </Fab>
            <Fab
              onClick={() => {
                sayIt(
                  store.Prompt.prompt_translation,
                  store.Tutor.voice_idx,
                  0
                );
              }}
            >
              <SlowMotionVideoIcon />
            </Fab>
            <Dictaphone />
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Main;
