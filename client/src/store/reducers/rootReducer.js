import { combineReducers } from "redux";
import authReducer from "./auth" ;
import alertReducer from "./alert"
const reducers = {authReducer , alertReducer};

export default combineReducers(reducers);
