import { combineReducers } from "redux";
import authReducer from "./auth" ;
import alertReducer from "./alert" ; 
import profileReducer from "./profile"
import postReducer from "./post" 
const reducers = {authReducer , alertReducer ,profileReducer , postReducer };

export default combineReducers(reducers);
