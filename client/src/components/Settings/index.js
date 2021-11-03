import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Slider, Stack, Box } from "@mui/material";

import Layout from "../Layout";

import SelectVocabularyMode from "../SelectVocabularyMode";
import SelectLanguages from "../SelectLanguages";
import SelectPracticeMode from "../SelectPracticeMode";

import { setTutorField } from "../../app/state/tutor";

const Main = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  return (
    <Layout title="Settings">
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

      <SelectLanguages />
      <SelectPracticeMode />
      <SelectVocabularyMode />
    </Layout>
  );
};

export default Main;
