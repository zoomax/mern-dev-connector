import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteProfileExperience } from "../../store/actions/profile";

export const Experience = ({ experience, deleteProfileExperience }) => {
  const experiences = experience.map(({ _id, company, from, to, title }) => (
    <tr key={_id}>
      <td>{company}</td>
      <td>{title}</td>
      <td>
        <Moment format="YYYY/MM/DD" date={from} /> -{" "}
        {!to ? " Now" : <Moment format="YYYY/MM/DD" date={to} />}
      </td>
      <td>
        <button
          onClick={() => deleteProfileExperience(_id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteProfileExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { deleteProfileExperience };

export default connect(mapStateToProps, mapDispatchToProps)(Experience);
