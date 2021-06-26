import React from "react";
import "whatwg-fetch";

import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";

// REDUX
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./app/rootReducer";

import Users from "./components/Users";
import Test from "./components/DictaphoneSpeechRecognition";
import Main from "./components/Main";
import MicTest from "./components/MicTest";

// Create the store with middleware for thunks and react dev tools
// See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers

const composedEnhancer = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//const composedEnhancer = compose(applyMiddleware(thunk));

const store = createStore(rootReducer, undefined, composedEnhancer);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={Main} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/test" component={Test} />
      <Route exact path="/mic-test" component={MicTest} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
