import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import sidebar from "./sidebar";
import files from "./files";

export default combineReducers({ alert, auth, sidebar, files });
