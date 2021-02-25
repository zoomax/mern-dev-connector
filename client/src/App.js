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
import CreateProfile from "./components/profile-forms/CreateProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import PrivateRoute from "./components/dashboard/routing/PrivateRoute";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile" ; 
import Post from "./components/post/Post" ; 
import SinglePost from  "./components/post/SinglePost" ; 


function App() {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  useEffect(() => {
    store.dispatch(loadUser());
  }, [loadUser]);
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
              <Route exact component={Profiles} path="/profiles" />
              <Route exact component={Profile} path="/profiles/:id" />
              <PrivateRoute exact component={Dashboard} path="/dashboard" />
              <PrivateRoute
                exact
                component={CreateProfile}
                path="/create-profile"
              />
              <PrivateRoute
                exact
                component={CreateProfile}
                path="/edit-profile"
              />
              <PrivateRoute
                exact
                component={AddExperience}
                path="/add-experience"
              />
              <PrivateRoute
                exact
                component={AddEducation}
                path="/add-education"
              />
              <PrivateRoute
                exact
                component={Post}
                path="/posts"
              />
               <PrivateRoute
                exact
                component={SinglePost}
                path="/posts/:id"
              />
            </Switch>
          </div>
        </Router>
      </Fragment>
    </Provider>
  );
}

export default App;
