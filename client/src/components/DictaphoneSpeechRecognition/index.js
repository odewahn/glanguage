import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Fab } from "@mui/material";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

import { setStudentResponse } from "../../app/state/student";

import "./index.css";

const Dictaphone = () => {
  const {
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    transcript,
    finalTranscript,
  } = useSpeechRecognition();

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStudentResponse(finalTranscript));
  }, [finalTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      {listening ? (
        <Fab className="MicOn" onClick={SpeechRecognition.stopListening}>
          <RecordVoiceOverIcon className="HotMicIcon" />
        </Fab>
      ) : (
        <Fab
          onClick={() => {
            const voice = store.Settings.voices[store.Tutor.language].lang;
            SpeechRecognition.startListening({
              language: voice,
            });
          }}
        >
          <RecordVoiceOverIcon />
        </Fab>
      )}
    </div>
  );
};
export default Dictaphone;
