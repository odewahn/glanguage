import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "./index.css";

/*
value={props.voice}
          onChange={(e) => props.setValue(e)}
          */

const Main = () => {
  let labelId = "label" + Math.random();
  var voices = speechSynthesis.getVoices();

  return (
    <div className="LanguageBounds">
      <FormControl className="Language">
        <InputLabel id={labelId}>And I will respond in</InputLabel>
        <Select labelId={labelId} id="demo-simple-select">
          {voices.map((v) => {
            console.log(v);
            return <MenuItem value={v}>{v.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Main;
