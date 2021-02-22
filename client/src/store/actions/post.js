import axios from "axios";
import { GET_POSTS, POST_ERROR } from "./types";

export const getPosts = () => async (dispatch) => {
  const config = {
    headers: {
      Content_Type: "Application/json",
    },
  };
  try {
    const posts = await axios.get("http://localhost:5000/api/posts", config);
    dispatch({
      type: GET_POSTS,
      payload: posts.data,
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
