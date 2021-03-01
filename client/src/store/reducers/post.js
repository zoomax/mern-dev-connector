import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../actions/types";

const initialState = {
  post: null,
  posts: [],
  loading: true,
  errors: {},
};

export default function (state = initialState, { payload, type }) {
  console.log(payload);
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: payload.data,
      };
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: payload.data[0],
      };
    case ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, payload.data[0]],
      };
    case ADD_COMMENT:
      return {
        ...state,
        loading: false,
        post: payload.data[0],
      };
    case UPDATE_LIKE:
      console.log(payload) ;
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comments: payload.comments },
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: [...state.posts.filter((postx) => postx._id !== payload.id)],
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
