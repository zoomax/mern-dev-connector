import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const ProfileItem = ({ profile }) => {
  console.log(profile);
  const { company, skills, status, location, user : {_id , avatar ,name   } } = profile;
  console.log(profile.user);
  return (
    <Fragment>
      <div className="profile bg-light">
        <img src={avatar} className="round-img" />
        <div>
          <h2>{name}</h2>
          <p>
            {status}{" "}
            {company && (
              <span>
                {" "}
                at
                <strong>
                  <em> {company} </em>
                </strong>
              </span>
            )}
          </p>
          <p className="my-1">{location && <span>{location}</span>}</p>
          <Link to={`/profiles/${_id}`} className="btn btn-primary">
            {" "}
            View Profile
          </Link>
        </div>
        <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index} className="text-primary">
              <i className="fas fa-check"></i> {" " + skill}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem);
