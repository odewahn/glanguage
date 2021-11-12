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

import { remapVoices } from "../../app/state/utils";
import { setTutorField } from "../../app/state/tutor";

const Main = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //const store = useSelector((state) => state);

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();
    console.log("Loaded", voices.length, "from the window.speechSynthesis");
    dispatch(setTutorField("voices", remapVoices(voices))); // Load the available voices
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
      primary: {
        main: "#333333",
      },
    },
    typography: {
      fontFamily: "Montserrat",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="Root">
        <AppBar position="static" sx={{ flexgrow: 1, marginBottom: "10px" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.title}
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
        <div className="Content">{props.children}</div>
      </div>
    </ThemeProvider>
  );
};

export default Main;
