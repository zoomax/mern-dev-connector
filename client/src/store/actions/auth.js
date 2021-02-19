import {
  REGISTER_FAILURE,
  REGISTER_SUCCEESS,
  USER_LOADED,
  AUTH_FAILURE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import { setAuthToken } from "../../utils/setAuthToken";
import { setAlert } from "./alert";
import axios from "axios";

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  try {
    const res = await axios.get("http://localhost:5000/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAILURE,
    });
  }
};
export const register = ({ name, email, password, confirmPassword }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password, confirmPassword });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/",
      body,
      config
    );
    console.log(res);
    return dispatch({
      type: REGISTER_SUCCEESS,
      payload: res.data.user,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    } else {
      dispatch(setAlert(err.response.data.errorMessage, "danger"));
    }
    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/login",
      body,
      config
    );
    return dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.user,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err.response);
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    } else {
      dispatch(setAlert(err.response.data.message, "danger"));
    }
    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};
