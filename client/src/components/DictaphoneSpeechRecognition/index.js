import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Fab } from "@mui/material";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import MicIcon from "@mui/icons-material/Mic";

import { setStudentField } from "../../app/state/student";

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
    dispatch(setStudentField("response", finalTranscript));
  }, [finalTranscript]);

  useEffect(() => {
    dispatch(setStudentField("response_in_progress", transcript));
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      {listening ? (
        <Fab className="MicOn" onClick={SpeechRecognition.stopListening}>
          <MicIcon className="HotMicIcon" />
        </Fab>
      ) : (
        <Fab
          onClick={() => {
            var expected_language = store.Tutor.language;
            console.log("Student language is", store.Student.language);

            if (store.Settings.practice_type == "listening") {
              expected_language = store.Student.language;
            }

            console.log(expected_language);
            const voice = store.Settings.voices[expected_language].lang;
            SpeechRecognition.startListening({
              language: voice,
            });
          }}
        >
          <MicIcon />
        </Fab>
      )}
    </div>
  );
};
export default Dictaphone;
