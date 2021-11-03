import React from "react";

import "./index.css";

import {
  Link,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ThemeProvider,
  createMuiTheme,
} from "@mui/material";

import { useHistory } from "react-router-dom";

import SettingsIcon from "@mui/icons-material/Settings";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

const Main = (props) => {
  const history = useHistory();

  /*
  const theme = createMuiTheme({
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
  });
*/

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
      text: {
        primary: "#ff0000",
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
              <RecordVoiceOverIcon
                onClick={() => {
                  history.push("/");
                }}
              />

              <SettingsIcon
                onClick={() => {
                  history.push("/settings");
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
