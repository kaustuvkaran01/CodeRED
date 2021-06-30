import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//IMPORTING COMPONENTS
// import Navbar from "../components/Navbar";
// import Main from "../components/HomePage/main";
// import StoreLocator from "../components/StoreLocator/index";

import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <>
        <Router>
          <Switch>
            {/* <Route exact path="/" component={Main} /> */}
            {/* <Route exact path="/store" component={StoreLocator} /> */}
          </Switch>
        </Router>
      </>
    )
  );
}
