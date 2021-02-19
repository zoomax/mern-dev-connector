import { combineReducers } from "redux";
import authReducer from "./auth" ;
import alertReducer from "./alert" ; 
import profileReducer from "./profile"
const reducers = {authReducer , alertReducer ,profileReducer };

export default combineReducers(reducers);
