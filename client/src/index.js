import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Users from "./components/Users";
import Test from "./components/Test";
import Main from "./components/Main";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Main} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/test" component={Test} />
    </div>
  </Router>,
  document.getElementById("root")
);
