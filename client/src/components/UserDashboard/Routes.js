import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//IMPORTING COMPONENTS
import Issues from "./Issues/index";

export default function Routes() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/issues" component={Issues} />
        </Switch>
      </Router>
    </div>
  );
}
