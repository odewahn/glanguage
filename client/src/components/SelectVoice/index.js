import React from "react";

import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

import "./index.css";

const Main = (props) => {
  let labelId = "label" + Math.random();
  var voices = speechSynthesis.getVoices();

  return (
    <div className="LanguageBounds">
      <FormControl className="Language">
        <InputLabel id={labelId}>{props.label}</InputLabel>
        <Select
          labelId={labelId}
          value={props.value}
          onChange={(e) => props.setVoice(e.target.value)}
        >
          {voices.map((v, idx) => {
            return (
              <MenuItem value={idx}>{v.name + " (" + v.lang + ")"}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Main;
