import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Users from "./components/Users";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Users} />
    </div>
  </Router>,
  document.getElementById("root")
);
