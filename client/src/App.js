import "./App.css";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./store/actions/auth";
import { setAuthToken } from "./utils/setAuthToken";
import { Provider } from "react-redux";
import store from "./store/store";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alerts from "./components/layout/Alerts";
import Dashboard from "./components/dashboard/dashboard";
import PrivateRoute from "./components/dashboard/routing/PrivateRoute" ; 

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Navbar />
          <Route exact component={Landing} path="/" />
          <div className="container">
            <Alerts />
            <Switch>
              <Route exact component={Register} path="/register" />
              <Route exact component={Login} path="/login" />
              <PrivateRoute exact component={Dashboard} path="/dashboard" />
            </Switch>
          </div>
        </Router>
      </Fragment>
    </Provider>
  );
}

export default App;
