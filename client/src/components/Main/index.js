import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Fab, Stack, LinearProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import ReplayIcon from "@mui/icons-material/Replay";

import Layout from "../Layout";

import { setPrompt } from "../../app/state/prompt";

import { sayIt } from "../../app/state/tutor";

import Dictaphone from "./DictaphoneSpeechRecognition";

import "./index.css";

var levenshtein = require("fast-levenshtein");

const Main = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [pctCorrect, setPctCorrect] = useState(0);

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

  // Compute the "percent correct", which vagulely indicates how close what you said is to what
  // was expected
  useEffect(() => {
    // find the expected response the student should be saying
    const expectedResponse =
      store.Settings.practice_type == "speaking"
        ? store.Prompt.prompt_translation
        : store.Prompt.prompt;

    // Find maximum possible string length
    var maxLen = expectedResponse.length;
    if (store.Student.response_in_progress.length > maxLen) {
      maxLen = store.Student.response_in_progress.length;
    }

    var distance = levenshtein.get(
      expectedResponse.toLowerCase(),
      store.Student.response_in_progress.toLowerCase()
    );

    setPctCorrect(Math.trunc((1.0 - distance / maxLen) * 100));
  }, [store.Student.response_in_progress]);

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

        <Grid item xs={10} sx={{ border: 1 }}>
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
          <LinearProgress
            className="Progress"
            variant="determinate"
            value={pctCorrect}
            sx={{
              width: "95%",
              height: "12px",
              borderRadius: "6px",
              marginBottom: "1rem",
            }}
          />
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
            <Dictaphone />
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
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Main;
