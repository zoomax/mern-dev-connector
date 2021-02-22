import { GET_POSTS, POST_ERROR } from "../actions/types";

const initialState = {
  post: null,
  posts: [],
  loading: true,
  errors: {},
};

export default function (state = initialState, { payload, type }) {
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: payload.posts,
      };
    case POST_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };
    default:
      return state;
  }
}
