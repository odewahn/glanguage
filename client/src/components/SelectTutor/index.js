import React from "react";

import { FormControl, Select } from "@mui/material";

import { remapVoices } from "../../app/state/utils";

import "./index.css";

const Main = (props) => {
  var voices = window.speechSynthesis.getVoices();

  const voicesMap = remapVoices(voices);
  const languageCodes = Object.keys(voicesMap).sort();

  return (
    <div className="LanguageBounds">
      <FormControl className="Language">
        <Select
          native
          value={props.value}
          onChange={(e) =>
            props.setVoice(e.target.value, voices[e.target.value].lang)
          }
        >
          {languageCodes.map((v) => {
            return (
              <optgroup label={voicesMap[v].language_name}>
                {voicesMap[v].speakers.map((s) => {
                  return (
                    <option value={s.original_idx}>{s.speaker_voice}</option>
                  );
                })}
              </optgroup>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Main;
