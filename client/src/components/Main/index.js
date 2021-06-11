import React from "react";

import { Button } from "@material-ui/core";

import "./index.css";

const Main = () => {
  return (
    <div className="Root">
      <h1>TEST!!!</h1>
      <Button
        variant="contained"
        onClick={() => {
          console.log("Click!");
        }}
      >
        Click me!
      </Button>
    </div>
  );
};

export default Main;
