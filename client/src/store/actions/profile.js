import axios from "axios";
import { setAuthToken } from "../../utils/setAuthToken";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE  , ACCOUNT_DELETED , CLEAR_PROFILE} from "./types";

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

 export const deleteAccount  = () => async dispatch => { 
  setAuthToken(localStorage.getItem("token"));
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
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