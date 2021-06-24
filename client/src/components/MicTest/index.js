import React, { useState, useEffect } from "react";
// the button form material-ui is optional
// npm install @material-ui/core
import Button from "@material-ui/core/Button";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "fr-FR";

const RecordButton = () => {
  const [isMicOn, setIsMicOn] = useState(false);

  var buttonColour;
  var buttonLabel;

  if (isMicOn) {
    buttonColour = "secondary";
    buttonLabel = "Recording...";
  } else {
    buttonColour = "primary";
    buttonLabel = "Record";
  }

  useEffect(() => {
    handleListen();
  }, [isMicOn]);

  const handleListen = () => {
    if (isMicOn) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };
  // if you don't want to us the button from Material-ui, just change Button to button
  return (
    <Button
      variant="contained"
      color={buttonColour}
      onClick={() => {
        setIsMicOn(!isMicOn);
      }}
    >
      {buttonLabel}
    </Button>
  );
};

export default RecordButton;
