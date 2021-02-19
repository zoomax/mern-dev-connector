import axios from "axios";
import { setAuthToken } from "../../utils/setAuthToken";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

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
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
