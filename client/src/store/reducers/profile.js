import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_REPOS,
  GET_PROFILES,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: null,
};

export default function (state = initialState, { payload, type }) {
  console.log(payload) ; 
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, profile: payload.data[0], loading: false };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload[0],
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload.data,
        loading: false,
      };

    case CLEAR_PROFILE:
      return {
        ...initialState,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: JSON.parse(payload.body),
      };
    default:
      return state;
  }
}
