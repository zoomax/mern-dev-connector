import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./types";
import { apiUrl } from "../../helpers/index";
export const getPosts = () => async (dispatch) => {
  try {
    const posts = await axios.get(`${apiUrl}/posts`);
    dispatch({
      type: GET_POSTS,
      payload: posts.data,
    });
    dispatch(setAlert("posts fetched successfully", "green"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    const post = await axios.get(`${apiUrl}/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: post.data,
    });
    dispatch(setAlert("post fetched successfully", "green"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const like_dislike_Post = (id) => async (dispatch) => {
  try {
    const likes = await axios.put(`${apiUrl}/posts/${id}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { likes: likes.data.data, id },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    const post = await axios.delete(`${apiUrl}/posts/${id}`);
    console.log(id);
    console.log(post.data.post._id);
    dispatch({
      type: DELETE_POST,
      payload: { id: post.data.post._id },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      Content_Type: "Application/json",
    },
  };
  try {
    const post = await axios.post(`${apiUrl}/posts`, formData, config);
    console.log(post.data.post);
    dispatch({
      type: ADD_POST,
      payload: post.data,
    });
    dispatch(setAlert("post created successfully", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.data.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addComment = (formData, id) => async (dispatch) => {
  const config = {
    headers: {
      Content_Type: "Application/json",
    },
  };
  try {
    const post = await axios.put(
      `${apiUrl}/posts/${id}/comments`,
      formData,
      config,
    );
    console.log(post.data);
    dispatch({
      type: ADD_COMMENT,
      payload: post.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const deleteComment = (id, commentId) => async (dispatch) => {
  try {
    const post = await axios.put(`${apiUrl}/posts/${id}/comments/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: { comments: post.data.data[0].comments },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
