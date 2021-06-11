import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Users from "./components/Users";
import Test from "./components/Test";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Users} />
      <Route exact path="/test" component={Test} />
    </div>
  </Router>,
  document.getElementById("root")
);
