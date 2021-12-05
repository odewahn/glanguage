import React, { useEffect, useState } from "react";

import { Grid, Button, Stack, LinearProgress } from "@mui/material";

import { sayIt } from "../../app/state/tutor";

import Dictaphone from "./DictaphoneSpeechRecognition";

import "./index.css";

var levenshtein = require("fast-levenshtein");

const Main = (props) => {
  const [response, setResponse] = useState("");
  const [pctCorrect, setPctCorrect] = useState(0);
  const [blurAnswer, setBlurAnswer] = useState(true);
  const [blurQuestion, setBlurQuestion] = useState(true);

  // TODO: Improve this a lot!
  // Compute the "percent correct", which vagulely indicates how close
  // what you said is to what was expected.  Right now it's just the
  // levenstein distance, which is a poor indicator but has the
  // bnefit of being easy to compute
  useEffect(() => {
    // Find maximum possible string length
    var maxLen = props.answer.length;
    if (response.length > maxLen) {
      maxLen = response.length;
    }

    var distance = levenshtein.get(
      props.answer.toLowerCase(),
      response.toLowerCase()
    );

    setPctCorrect(Math.trunc((1.0 - distance / maxLen) * 100));
  }, [response]);

  return (
    <div>
      <Grid container spacing={2}>
        {/* *************** Question Section ************************** */}

        <Grid
          item
          xs={2}
          sx={{
            borderTop: 1,
            borderLeft: 1,
            textAlign: "center",
          }}
        >
          <h2>Q</h2>
        </Grid>

        <Grid
          item
          xs={10}
          sx={{
            borderTop: 1,
            borderLeft: 1,
            borderRight: 1,
          }}
          onClick={() => {
            setBlurQuestion(!blurQuestion);
          }}
        >
          <div className={blurQuestion ? "Blurred" : ""}>{props.question}</div>
        </Grid>

        {/* *************** Response  ************************** */}

        <Grid
          item
          xs={2}
          sx={{
            borderTop: 1,
            borderLeft: 1,
            textAlign: "center",
          }}
        >
          <h2>R</h2>
        </Grid>

        <Grid item xs={10} sx={{ borderRight: 1, borderLeft: 1, borderTop: 1 }}>
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
          {response}
        </Grid>

        {/* *************** Answer  ************************** */}

        <Grid
          item
          xs={2}
          sx={{
            borderLeft: 1,
            borderBottom: 1,
            borderTop: 1,
            textAlign: "center",
          }}
        >
          <h2>A</h2>
        </Grid>

        <Grid
          item
          xs={10}
          sx={{
            border: 1,
          }}
          onClick={() => {
            setBlurAnswer(!blurAnswer);
          }}
        >
          <div className={blurAnswer ? "Blurred" : ""}>{props.answer}</div>
        </Grid>

        {/* *************** Control Buttons  ************************** */}

        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => {
                props.onNext();
              }}
            >
              Begin/Next
            </Button>

            <Dictaphone
              language={props.language}
              onResponse={(response) => {
                setResponse(response, pctCorrect);
              }}
              onResponseComplete={(response) => {
                setResponse(response, pctCorrect);
                console.log("They finished talking!!!");
              }}
            />

            <Button
              variant="outlined"
              onClick={() => {
                sayIt(props.question, props.question_voice_idx, 100);
              }}
            >
              Repeat
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                sayIt(props.question, props.question_voice_idx, 0);
              }}
            >
              Repeat (slower)
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
