import React, { useEffect } from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Button } from "@mui/material";

import "./index.css";

const Dictaphone = (props) => {
  const {
    listening,
    browserSupportsSpeechRecognition,
    transcript,
    finalTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    props.onResponseComplete(finalTranscript);
  }, [finalTranscript]);

  useEffect(() => {
    props.onResponse(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const IsListeningButton = () => {
    return (
      <Button
        className="MicOn"
        variant="outlined"
        onClick={SpeechRecognition.stopListening}
      >
        Answer
      </Button>
    );
  };

  const StartListeningButton = () => {
    return (
      <Button
        variant="outlined"
        onClick={() => {
          SpeechRecognition.startListening({
            language: props.language,
          });
        }}
      >
        Answer
      </Button>
    );
  };

  return (
    <div>{listening ? <IsListeningButton /> : <StartListeningButton />}</div>
  );
};

export default Dictaphone;
