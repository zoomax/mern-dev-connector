import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../store/actions/profile";

const ProfileGithub = ({ username, getGithubRepos, profile: { repos } }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos.length > 0 ? (
        <Fragment>
          {repos.map((repo) => (
            <Fragment>
              <div className="repo bg-white p-1 my-1">
                <div>
                  <h4>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.name}
                    </a>
                  </h4>
                  <p>{repo.description}</p>
                </div>
                <div>
                  <ul>
                    <li className="badge badge-primary">
                      Stars:{repo.stargazers_count}
                    </li>
                    <li className="badge badge-dark">
                      Watchers: {repo.watchers_count}
                    </li>
                    <li className="badge badge-light">
                      Forks: {repo.forks_count}
                    </li>
                  </ul>
                </div>
              </div>
            </Fragment>
          ))}
        </Fragment>
      ) : (
        <h4>No Github Repos Credentials</h4>
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  getGithubRepos,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGithub);
