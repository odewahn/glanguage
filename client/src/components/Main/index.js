import React from "react";

import { Button } from "@material-ui/core";

const Main = () => {
  return (
    <div>
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
