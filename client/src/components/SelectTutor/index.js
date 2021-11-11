import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

import { remapVoices } from "../../app/state/utils";

const Main = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  let labelId = "label" + Math.random();
  var voices = window.speechSynthesis.getVoices();

  const voicesMap = remapVoices(voices);

  const [languageCode, setLanguageCode] = useState("");

  //const handleLanguageChange = (e) => {};

  return (
    <div className="LanguageBounds">
      <FormControl className="Language">
        <InputLabel id={labelId}>Language</InputLabel>
        <Select
          labelId={labelId}
          value={languageCode}
          onChange={(e) => setLanguageCode(e.target.value)}
        >
          {voicesMap.map((v, idx) => {
            return <MenuItem value={v}>voicesMap[v]</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Main;
