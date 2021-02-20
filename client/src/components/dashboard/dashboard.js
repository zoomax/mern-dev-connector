import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../store/actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
// import {}

function Dashboard({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) {
  useEffect(() => {
    getCurrentProfile();
  }, [loading]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && " " + user.name}
      </p>
      {!profile ? (
        <Fragment>
          <p>It seems that you don't have a profile</p>
          <Link to="/create-profile" className="btn btn-light">
            <i className="fas fa-user-circle text-primary"></i> Create Profile
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <DashboardActions />
          <Education education={profile.education} />
          <Experience experience={profile.experience} />
          <div className="my-2">
            <button
              onClick={() => {
                deleteAccount();
              }}
              className="btn btn-danger"
            >
              <i className="fas fa-user-minus"></i> Delete Account
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  getCurrentProfile,
  deleteAccount,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
