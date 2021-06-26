import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { setStudentResponse } from "../../app/state/student";

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
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
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <p>{finalTranscript}</p>
    </div>
  );
};
export default Dictaphone;
