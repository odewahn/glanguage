import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";

import "./index.css";

const Main = () => {
  const [vocabulary, setVocabulary] = useState({});

  useEffect(() => {
    fetch("/api/vocabulary")
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        console.log(users);
        setVocabulary(users);
      });
  }, []);

  return (
    <div className="Root">
      <h1>TEST!!!</h1>
      <Button
        variant="contained"
        onClick={() => {
          console.log(vocabulary);
        }}
      >
        Click me!
      </Button>
    </div>
  );
};

export default Main;
