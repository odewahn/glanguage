import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Button } from "@mui/material";

import { useHistory } from "react-router-dom";

import Layout from "../Layout";

import SelectVocabularyMode from "./SelectPromptType";
import SelectPracticeMode from "./SelectPracticeMode";
import SelectTutor from "./SelectTutor";

import { setTutorField } from "../../app/state/tutor";

import { setPrompt, setPromptField } from "../../app/state/prompt";

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  return (
    <Layout title="Settings">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SelectPracticeMode />
        </Grid>
        <Grid item xs={8}>
          <SelectTutor />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(setPromptField("prompt", ""));
              dispatch(setPrompt());
              history.push("/main");
            }}
          >
            Begin
          </Button>
        </Grid>
      </Grid>
      <hr />
      <SelectVocabularyMode />
    </Layout>
  );
};

export default Main;
