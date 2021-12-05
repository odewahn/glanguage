import React, { useEffect, useState } from "react";

import Dictaphone from "./DictaphoneSpeechRecognition";
import Layout from "../Layout";

const Main = (props) => {
  const [response, setResponse] = useState("Click to start");
  return (
    <Layout title="Settings">
      <Dictaphone
        language="fr-FR"
        onResponse={(response) => {
          setResponse(response);
        }}
        onResponseComplete={(response) => {
          setResponse(response);
          console.log("They finished talking!!!");
        }}
      />
      <p1>{response}</p1>
    </Layout>
  );
};

export default Main;
