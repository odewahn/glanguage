import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormControl, Select } from "@mui/material";

import { setTutorField } from "../../../app/state/tutor";

import "./index.css";

const Main = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const voicesMap = store.Tutor.voices;

  const languageCodes = Object.keys(voicesMap).sort();

  return (
    <div className="LanguageBounds">
      <FormControl className="Language">
        <Select
          native
          value={store.Tutor.voice_idx}
          onChange={(e) => {
            const voices = speechSynthesis.getVoices();
            const voice_idx = e.target.value;
            const voice = voices[voice_idx];
            dispatch(setTutorField("voice_idx", voice_idx));
            console.log("New Tutor is", voice_idx, voice.lang, voice);
          }}
        >
          {languageCodes.map((v) => {
            return (
              <optgroup label={v}>
                {voicesMap[v].map((s) => {
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
