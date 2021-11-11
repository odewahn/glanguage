import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Grid, Button } from "@mui/material";

import { useHistory } from "react-router-dom";

import Layout from "../Layout";

import SelectVocabularyMode from "../SelectVocabularyMode";
import SelectLanguages from "../SelectLanguages";
import SelectPracticeMode from "../SelectPracticeMode";
import SelectTutor from "../SelectTutor";

import { setPrompt, setPromptField } from "../../app/state/prompt";

import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Layout title="Settings">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SelectPracticeMode />
        </Grid>
        <Grid item xs={6}>
          <SelectLanguages />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(setPromptField("prompt", ""));
              dispatch(setPrompt());
              history.push("/main");
            }}
          >
            <ConnectWithoutContactIcon />
            Practice
          </Button>
        </Grid>
      </Grid>
      <hr />
      <SelectTutor />
      <nr />
      <SelectVocabularyMode />
    </Layout>
  );
};

export default Main;
