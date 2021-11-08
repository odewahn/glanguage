import React from "react";
import { useSelector } from "react-redux";

import { Fab } from "@mui/material";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import { sayIt } from "../../app/state/utils";

const Main = () => {
  const store = useSelector((state) => state);

  return (
    <div>
      <Fab
        onClick={() => {
          sayIt(
            store.Prompt.prompt_translation,
            store.Tutor.language,
            store.Tutor.rate
          );
        }}
      >
        <PlayCircleOutlineIcon />
      </Fab>

      <Fab
        onClick={() => {
          sayIt(store.Prompt.prompt_translation, store.Tutor.language, 0);
        }}
      >
        <SlowMotionVideoIcon />
      </Fab>
    </div>
  );
};

export default Main;
