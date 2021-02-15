import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Landing } from "./components/layout/Landing";
import { Navbar } from "./components/layout/Navbar";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Route exact component={Landing} path="/" />
        <div className="container">
          <Switch>
            <Route exact component={Register} path="/register" />
            <Route exact component={Login} path="/login" />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
