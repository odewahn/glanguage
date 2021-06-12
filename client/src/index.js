import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";

// REDUX
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./app/rootReducer";

import Users from "./components/Users";
import Test from "./components/Test";
import Main from "./components/Main";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={Main} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/test" component={Test} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
