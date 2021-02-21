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

// get current  user profile
export const getCurrentProfile = () => async (dispatch) => {
  setAuthToken(localStorage.getItem("token"));
  try {
    const profile = await axios.get("http://localhost:5000/api/profiles/me");
    console.log(profile);
    dispatch({
      type: GET_PROFILE,
      payload: profile.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: "not found",
        status: "404",
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
    const profiles = await axios.get(
      "http://localhost:5000/api/profiles",
      config
    );
    console.log(profiles);
    dispatch({
      type: GET_PROFILES,
      payload: profiles.data.profiles,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
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
    const profile = await axios.get(
      `http://localhost:5000/api/profiles/${id}`,
      config
    );

    dispatch({
      type: GET_PROFILE,
      payload: profile.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
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
      `http://localhost:5000/api/profiles/github/${username}`,
      config
    );
    dispatch({
      type: GET_REPOS,
      payload: repos.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// create / update user profile
export const createOrUpdateProfile = (formData, history, edit) => async (
  dispatch
) => {
  setAuthToken(localStorage.getItem("token"));
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const result = await axios.post(
      "http://localhost:5000/api/profiles/",
      formData,
      config
    );
    dispatch({
      type: GET_PROFILE,
      payload: result.data,
    });
    dispatch(
      setAlert(
        edit ? "profile updated successfully" : "profile created successfully",
        "primary"
      )
    );

    if (edit == false) {
      history.push("/dashboard");
    }
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    } else {
      dispatch(setAlert(err.response.data.message, "danger"));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
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
      "http://localhost:5000/api/profiles/me/experiences",
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: result.data,
    });
    dispatch(setAlert("Experience added successfully", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    } else {
      dispatch(setAlert(err.response.data.message, "danger"));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
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
      "http://localhost:5000/api/profiles/me/educations",
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: result.data,
    });
    dispatch(setAlert("Education added successfully", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    } else {
      dispatch(setAlert(err.response.data.message, "danger"));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
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
      `http://localhost:5000/api/profiles/me/educations/${id}`,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: result.data,
    });
    dispatch(setAlert("Education deleted successfully", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
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
      `http://localhost:5000/api/profiles/me/experiences/${id}`,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: result.data,
    });
    dispatch(setAlert("Experience deleted successfully", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
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
      "your account is about to be deleted premanatly, Are You Sure.... ? "
    )
  ) {
    try {
      const result = await axios.delete(
        `http://localhost:5000/api/profiles/me/`,
        config
      );
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });
      dispatch(setAlert("Experience deleted successfully"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
