import React, { Fragment, useState } from "react";
import { addProfileExperience } from "../../store/actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function AddExperience({ addProfileExperience, history }) {
  const initialState = {
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  };
  const [formData, setFormData] = useState(initialState);

  const { title, company, description, current, location, from, to } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addProfileExperience(formData, history);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
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
            placeholder="* Job Title"
            name="title"
            // required
            value={title}
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => {
              onChange(e);
            }}
            type="text"
            placeholder="* Company"
            name="company"
            // required
            value={company}
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => {
              onChange(e);
            }}
            type="text"
            placeholder="Location"
            name="location"
            value={location}
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
            Current Job
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
            value={description}
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
AddExperience.propTypes = {
  addProfileExperience: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  addProfileExperience,
};

export default connect(null, mapDispatchToProps)(AddExperience);
