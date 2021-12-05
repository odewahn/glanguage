import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../Layout";
import QuestionResponseAnswerGrid from "../QuestionResponseAnswerGrid";

const Main = () => {
  const { lesson_slug } = useParams();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const [question, setQuestion] = useState("Hello");
  const [questionVoiceIdx, setQuestionVoiceIdx] = useState(0);
  const [answer, setAnswer] = useState("Bonjour");
  const [answerVoiceIdx, setAnswerVoiceIdx] = useState(0);
  const [response, setResponse] = useState("");
  const [pctCorrect, setPctCorrect] = useState(0);

  // Set the lesson
  useEffect(() => {
    console.log("the lesson is ", lesson_slug);
  }, lesson_slug);

  return (
    <Layout title="Lesson">
      <h2>{lesson_slug}</h2>
      <QuestionResponseAnswerGrid
        question={question}
        question_voice_idx={questionVoiceIdx}
        answer={answer}
        answer_voice_idx={answerVoiceIdx}
        onResponse={(r, p) => {
          setResponse(r);
          setPctCorrect(p);
        }}
        onResponseComplete={(r, p) => {
          setResponse(r);
          setPctCorrect(p);
          console.log(
            "They finished this response.  Now do some calculations!!!"
          );
        }}
        onNext={() => {
          console.log("Select the next prompt!!!");
        }}
      />
    </Layout>
  );
};

export default Main;
