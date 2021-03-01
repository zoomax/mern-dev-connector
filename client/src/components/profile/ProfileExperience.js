import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { description, from, to, company, location, title },
}) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        <strong>{location}</strong>
      </p>
      <p>
        <Moment format="YYYY/MM/DD" date={from} /> -{" "}
        {!to ? " Now" : <Moment format="YYYY/MM/DD" date={to} />}
      </p>
      <p>
        <strong>Position:</strong> {title}
      </p>
      {description && (
        <p>
          <strong>Description:</strong> {description}
        </p>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
