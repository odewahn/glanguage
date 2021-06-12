import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@material-ui/core";

import "./index.css";

import { setConfigField } from "../../app/state/config";

const Main = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
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
          console.log(store);
        }}
      >
        Click me!
      </Button>
      <Button
        onClick={() => {
          dispatch(
            setConfigField("title", "The random number is " + Math.random())
          );
        }}
      >
        Set Title
      </Button>
    </div>
  );
};

export default Main;
