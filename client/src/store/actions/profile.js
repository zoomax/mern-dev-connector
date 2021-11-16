import axios from "axios";
import { setAuthToken } from "../../utils/setAuthToken";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "./types";
import { apiUrl } from "../../helpers/index";
// get current  user profile
export const getCurrentProfile = () => async (dispatch) => {
  setAuthToken(localStorage.getItem("token"));
  try {
    const profile = await axios.get(`${apiUrl}/profiles/me`);
    console.log(profile);
    dispatch({
      type: GET_PROFILE,
      payload: profile.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        payload: err.response ? err.response.data.errors : [err.message],
      },
    });
  }
};

// get profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    const profiles = await axios.get(`${apiUrl}/profiles`, config);
    console.log(profiles.data.data);
    dispatch({
      type: GET_PROFILES,
      payload: profiles.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: [err.message],
    });
  }
};

// get profile by id
export const getProfileById = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    const profile = await axios.get(`${apiUrl}/profiles/${id}`, config);

    dispatch({
      type: GET_PROFILE,
      payload: profile.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response,
    });
  }
};

// get profile repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    const repos = await axios.get(
      `${apiUrl}/profiles/github/${username}`,
      config,
    );
    dispatch({
      type: GET_REPOS,
      payload: repos.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response ? err.response.data.errors : err.message,
    });
  }
};

// create / update user profile
export const createOrUpdateProfile =
  (formData, history, edit) => async (dispatch) => {
    setAuthToken(localStorage.getItem("token"));
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    try {
      const result = await axios.post(`${apiUrl}/profiles`, formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: result.data,
      });
      dispatch(
        setAlert(
          edit
            ? "profile updated successfully"
            : "profile created successfully",
          "primary",
        ),
      );

      if (edit == false) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response ? err.response.data.errors : [err.message];
      if (errors.length > 0) {
        errors.forEach((error) => {
          if (error.msg) {
            dispatch(setAlert(error.msg, "danger"));
          } else {
            dispatch(setAlert(error, "danger"));
          }
        });
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: errors,
      });
    }
  };

// add profile experience
export const addProfileExperience = (formData, history) => async (dispatch) => {
  setAuthToken(localStorage.getItem("token"));
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const result = await axios.put(
      `${apiUrl}/profiles/me/experiences`,
      formData,
      config,
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: result.data,
    });
    dispatch(setAlert("Experience added successfully", "success"));
    history.push("/dashboard");
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error, "danger"));
      });
    } else {
      dispatch(setAlert(err.response.data.errors[0], "danger"));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: errors,
    });
  }
};

// add profile education
export const addProfileEducation = (formData, history) => async (dispatch) => {
  setAuthToken(localStorage.getItem("token"));
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const result = await axios.put(
      `${apiUrl}/profiles/me/educations`,
      formData,
      config,
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: result.data,
    });
    dispatch(setAlert("Education added successfully", "success"));
    history.push("/dashboard");
  } catch (err) {
    console.log(err);
    const errors = err.response ? err.response.data.errors : [err.message];
    if (errors.length > 0) {
      errors.forEach((error) => {
        dispatch(setAlert(error, "danger"));
      });
      dispatch({
        type: PROFILE_ERROR,
        payload: errors,
      });
    }
  }
};

// delete profile education
export const deleteProfileEducation = (id) => async (dispatch) => {
  setAuthToken(localStorage.getItem("token"));
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const result = await axios.delete(
      `${apiUrl}/profiles/me/educations/${id}`,
      config,
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: result.data,
    });
    dispatch(setAlert("Education deleted successfully", "success"));
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response ? err.response.data.errors : err.message,
    });
  }
};

// delete profile experience
export const deleteProfileExperience = (id) => async (dispatch) => {
  setAuthToken(localStorage.getItem("token"));
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const result = await axios.delete(
      `${apiUrl}/profiles/me/experiences/${id}`,
      config,
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: result.data,
    });
    dispatch(setAlert("Experience deleted successfully", "success"));
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.errors,
    });
  }
};

// delete current user account
export const deleteAccount = () => async (dispatch) => {
  setAuthToken(localStorage.getItem("token"));
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  if (
    window.confirm(
      "your account is about to be deleted premanatly, Are You Sure.... ? ",
    )
  ) {
    try {
      const result = await axios.delete(`${apiUrl}/profiles/me`, config);
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });
      dispatch(setAlert("Account deleted successfully"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response ? err.response.data.errors : [err.message],
      });
    }
  }
};
