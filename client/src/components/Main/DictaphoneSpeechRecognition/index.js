import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Fab, Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

import { setStudentField } from "../../../app/state/student";

import "./index.css";

const Dictaphone = () => {
  const {
    listening,
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
        <Button
          className="MicOn"
          variant="outlined"
          onClick={SpeechRecognition.stopListening}
        >
          Answer
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={() => {
            const expected_voice =
              store.Settings.practice_type == "listening"
                ? store.Tutor.voices_lookup[store.Student.voice_idx].language
                : store.Tutor.voices_lookup[store.Tutor.voice_idx].language;

            console.log(
              "Mode is",
              store.Settings.practice_type,
              "so I expect to hear",
              expected_voice
            );
            SpeechRecognition.startListening({
              language: expected_voice,
            });
          }}
        >
          Answer
        </Button>
      )}
    </div>
  );
};
export default Dictaphone;
