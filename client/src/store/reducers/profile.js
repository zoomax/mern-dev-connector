import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: null,
};

export default function (state = initialState, { payload, type }) {
  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload.profile, loading: false };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...initialState,
        loading: false,
      };
    default:
      return state;
  }
}
