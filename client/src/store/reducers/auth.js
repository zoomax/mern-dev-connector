import {
  REGISTER_SUCCEESS,
  REGISTER_FAILURE,
  AUTH_FAILURE,
  USER_LOADED,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/types";

const initialState = {
  loading: true,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
};
export default function (state = initialState, { type, payload }) {
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
      };
    case REGISTER_SUCCEESS:
      localStorage.setItem("token", payload.tokens[0]);
      return {
        ...state,
        token: payload.tokens[0],
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_FAILURE:
    case AUTH_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        token: "",
      };
    default:
      return state;
  }
}
