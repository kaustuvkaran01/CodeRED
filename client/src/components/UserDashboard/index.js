import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import AddIssues from "./Issues/AddIssues";
import Routes from "./Routes";

export default function index() {
  return (
    <div>
      <Router>
        <Routes />
      </Router>
    </div>
  );
}
