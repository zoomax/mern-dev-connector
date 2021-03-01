import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { description, from, to, degree, fieldofstudy, school },
}) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <strong>{fieldofstudy}</strong>
      </p>
      <p>
        <Moment format="YYYY/MM/DD" date={from} /> -{" "}
        {!to ? " Now" : <Moment format="YYYY/MM/DD" date={to} />}
      </p>
      <p>
        <strong>Degree:</strong> {degree}
      </p>
      {description && (
        <p>
          <strong>Description:</strong> {description}
        </p>
      )}
    </div>
  );
};

ProfileEducation.propTypes = { education: PropTypes.object.isRequired };

export default ProfileEducation;
