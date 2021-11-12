import React from "react";
import "whatwg-fetch";

import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";

// REDUX
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./app/rootReducer";

import Main from "./components/Main";
import Settings from "./components/Settings";

import { fetchVocabulary, setSettingsField } from "./app/state/settings";
import { setTutorDefaultLanguage, setTutorField } from "./app/state/tutor";
import { setStudentDefaultLanguage } from "./app/state/student";

import { remapVoices } from "./app/state/utils";

// Create the store with middleware for thunks and react dev tools
// See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers

const composedEnhancer = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//const composedEnhancer = compose(applyMiddleware(thunk));

const store = createStore(rootReducer, undefined, composedEnhancer);

//const store = createStore(rootReducer);

store.dispatch(fetchVocabulary()); // Load the default vocabulary

const speech = window.speechSynthesis;

if (speech.onvoiceschanged !== undefined) {
  speech.onvoiceschanged = () => {
    console.log("getting the voices middleware!!");
    const voices = speech.getVoices();
    console.log(voices);
    store.dispatch(setTutorDefaultLanguage()); // Load the tutor's default language
    store.dispatch(setStudentDefaultLanguage()); // Load the students's default language
    store.dispatch(setTutorField("voices", remapVoices(voices))); // Load the available voices
  };
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/main" component={Main} />
      <Route exact path="/" component={Settings} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
