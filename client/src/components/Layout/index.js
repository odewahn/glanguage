import React, { useState, useEffect } from "react";

import "./index.css";

import {
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  createMuiTheme,
} from "@mui/material";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SettingsIcon from "@mui/icons-material/Settings";

import Flag from "react-world-flags";

import {
  remapVoices,
  setTutorField,
  findVoiceByLanguage,
} from "../../app/state/tutor";
import { setStudentField } from "../../app/state/student";

const Main = (props) => {
  const store = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();
    console.log("Loaded", voices.length, "from the window.speechSynthesis");
    const [remap, voices_lookup] = remapVoices(voices);
    console.log(remap, voices_lookup);
    dispatch(setTutorField("voices", remap)); // Load the available voices
    dispatch(setTutorField("voices_lookup", voices_lookup)); // Load the available voices
    if (store.Tutor.voice_idx == -1) {
      dispatch(
        setTutorField("voice_idx", findVoiceByLanguage("French", voices_lookup))
      );
    }
    if (store.Student.voice_idx == -1) {
      dispatch(
        setStudentField(
          "voice_idx",
          findVoiceByLanguage("English", voices_lookup)
        )
      );
    }
  }, []);

  const theme = createMuiTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiFabBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    palette: {
      type: "light",
    },
    typography: {
      fontFamily: "Montserrat",
    },
  });

  var flagCode = "US";
  var languageName = "English";
  if (store.Tutor.voice_idx != -1) {
    flagCode = store.Tutor.voices_lookup[store.Tutor.voice_idx]["country_code"];
    languageName =
      store.Tutor.voices_lookup[store.Tutor.voice_idx]["language_name"];
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="Root">
        <AppBar position="static" sx={{ flexgrow: 1, marginBottom: "10px" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.title}
              <span className="Flag">
                <Flag code={flagCode} height="16" />
              </span>
              {languageName}
            </Typography>

            <div>
              <SettingsIcon
                onClick={() => {
                  history.push("/");
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: "45px" }} />
        <div className="Content">{props.children}</div>
      </div>
    </ThemeProvider>
  );
};

export default Main;
