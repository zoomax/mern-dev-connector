import alert from "../reducers/alert";
import { SET_ALERT, REMOVE_ALERT } from "./types";
import * as uuid from "uuid";

// this is the syntax of asynchronous/synchrounous action generators that "redux-thunk" uses
export const setAlert = (message, alertType) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: {
      alertType,
      id,
      message,
    },
  });
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: {
          id,
        },
      }),
    2500
  );
};
