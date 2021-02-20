import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createOrUpdateProfile,
  getCurrentProfile,
} from "../../store/actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CreateProfile = ({
  profile: { profile, loading },
  createOrUpdateProfile,
  getCurrentProfile , 
  history,
}) => {
 
  const getProfileValues = (profile) => {
    if (profile) {
      const {
        company,
        bio,
        location,
        skills,
        githubusername,
        website,
        status,
        social: { facebook, twitter, instagram, linkedin, youtube },
      } = profile;
      return {
        company: company || "",
        website: website || "",
        location: location || "",
        status: status || "",
        skills:
          skills.reduce((acc, skill) => {
            return (acc += "," + skill);
          }) || "",
        githubusername: githubusername || "",
        bio: bio || "",
        twitter: twitter || "",
        facebook: facebook || "",
        linkedin: linkedin || "",
        instagram: instagram || "",
        youtube: youtube || "",
      };
    }
    return {
      company: "",
      website: "",
      location: "",
      status: "0",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      youtube: "",
    };
  };

  const initialState = getProfileValues(profile);
  const [formData, setFormData] = useState(initialState);
  const [showSocial, setShowSocial] = useState(false);
  useEffect(() => {
    getCurrentProfile();
    setFormData({...getProfileValues(profile)})
  }, [loading]);
  const {
    company,
    bio,
    location,
    skills,
    githubusername,
    website,
    status,
    facebook,
    twitter,
    instagram,
    linkedin,
    youtube,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createOrUpdateProfile(formData, history, profile ? true : false);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">
        {profile ? "Update " : "Create "} Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        className="form"
      >
        <div className="form-group">
          <select onChange={(e) => onChange(e)} name="status" value={status}>
            <option value="">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Company"
            name="company"
            value={company}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Website"
            name="website"
            value={website}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Location"
            name="location"
            value={location}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            onChange={(e) => onChange(e)}
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => setShowSocial(!showSocial)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {showSocial && (
          <Fragment>
            <div className="form-group social-input ">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
              />
            </div>

            <div className="form-group social-input ">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
              />
            </div>

            <div className="form-group social-input ">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
              />
            </div>

            <div className="form-group social-input ">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
              />
            </div>

            <div className="form-group social-input ">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
              />
            </div>
          </Fragment>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createOrUpdateProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  createOrUpdateProfile,
  getCurrentProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
