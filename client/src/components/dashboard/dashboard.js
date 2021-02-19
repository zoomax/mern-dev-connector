import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../store/actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
// import {}

function Dashboard({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 clasName="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && " " + user.name}
      </p>
      {!profile ? <Fragment>
        <p>It seems that you don't have a profile</p>
        <Link to="/profiles/create" className ="btn btn-primary"> Create Profile</Link>
      </Fragment> : <Fragment></Fragment>}
    </Fragment>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  getCurrentProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
