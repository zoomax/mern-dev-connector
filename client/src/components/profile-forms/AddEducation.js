
import React, { Fragment, useState } from "react";
import { addProfileEducation } from "../../store/actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function AddEducation({ addProfileEducation, history }) {
  const initialState = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  };
  const [formData, setFormData] = useState(initialState);
  

  const { degree, school, description, current, fieldofstudy, from, to } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addProfileEducation(formData, history);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Add An Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any schools/bootcamps that you have attended in the past
      </p>
      <small>* = required field</small>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        className="form"
      >
        <div className="form-group">
          <input
            onChange={(e) => {
              onChange(e);
            }}
            type="text"
            placeholder="* School"
            name="school"
            // required
            value={school}
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => {
              onChange(e);
            }}
            type="text"
            placeholder="* Degree"
            name="degree"
            // required
            value={degree}
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => {
              onChange(e);
            }}
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            onChange={(e) => {
              onChange(e);
            }}
            type="date"
            name="from"
            value={from}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                console.log(formData.current);
              }}
              type="checkbox"
              name="current"
              checked={current}
              value={current ? true : false}
            />{" "}
            Current School
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            onChange={(e) => {
              onChange(e);
            }}
            type="date"
            name="to"
            value={to}
            disabled={current ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={(e) => onChange(e)}
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input
          onChange={(e) => {
            setFormData({ ...formData, current: !current });
          }}
          type="submit"
          className="btn btn-primary my-1"
        />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
}
AddEducation.propTypes = {
  addProfileEducation: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  addProfileEducation,
};

export default connect(null, mapDispatchToProps)(AddEducation);
