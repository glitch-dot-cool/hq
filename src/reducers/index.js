import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import sidebar from "./sidebar";

export default combineReducers({ alert, auth, sidebar });
