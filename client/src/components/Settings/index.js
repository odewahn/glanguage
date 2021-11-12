import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Button } from "@mui/material";

import { useHistory } from "react-router-dom";

import Layout from "../Layout";

import SelectVocabularyMode from "../SelectVocabularyMode";
import SelectPracticeMode from "../SelectPracticeMode";
import SelectTutor from "../SelectTutor";

import { setTutorField, setTutorDefaultLanguage } from "../../app/state/tutor";

import { setPrompt, setPromptField } from "../../app/state/prompt";

import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

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
          <SelectTutor
            value={store.Tutor.language}
            setVoice={(voice_index, voice_code) => {
              dispatch(setTutorField("language", voice_index));
              dispatch(setTutorField("language_code", voice_code));
            }}
          />
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
