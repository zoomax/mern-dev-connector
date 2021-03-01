import {
  REGISTER_SUCCEESS,
  REGISTER_FAILURE,
  AUTH_FAILURE,
  USER_LOADED,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
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
      console.log(payload , "auth reducer") ; 
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.data[0],
      };
    case REGISTER_SUCCEESS:
      console.log(payload , "auth reducer") ; 
      localStorage.setItem("token", payload[0].tokens[0]);
      return {
        ...state,
        token: payload[0].token,
        isAuthenticated: true,
        loading: false,
        user: payload[0],
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload[0].token);
      return {
        ...state,
        token: payload[0].token,
        isAuthenticated: true,
        loading: false,
        user: payload[0],
      };
    case REGISTER_FAILURE:
    case AUTH_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT:
    case ACCOUNT_DELETED:
      console.log(payload , "auth reducer") ; 
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
