import axios from "axios";
import { setAlert } from "./alert";

import {
  FILES_LOADED,
  FILE_ERROR,
  B2_AUTH_LOADED,
  B2_AUTH_ERROR
} from "./types";

const electron = window.require("electron");
const ipc = electron.ipcRenderer;

// get local b2 auth
export const getB2Auth = () => async dispatch => {
  try {
    const res = await axios.get("/api/files/auth");
    const key = localStorage.token.substring(0, 32);

    ipc.send("receivedB2Auth", {
      key,
      payload: res.data.encrypted
    });

    ipc.on("decryptedB2Auth", async (event, args) => {
      let authObject = await args;
      await dispatch({
        type: B2_AUTH_LOADED,
        payload: authObject
      });
    });

    dispatch(setAlert("Successfully obtained B2 authentication", "success"));
  } catch (err) {
    console.error(err);
    dispatch({ type: B2_AUTH_ERROR });
    dispatch(setAlert("Error retrieving B2 authentication", "danger"));
  }
};

// get list of all files in B2 bucket
export const listFiles = auth => async dispatch => {
  try {
    ipc.send("listFiles", auth);

    ipc.on("fileListRetrieved", (event, files) => {
      dispatch({
        type: FILES_LOADED,
        payload: files
      });
    });
  } catch (err) {
    dispatch({
      type: FILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert("Error retrieving file list", "danger"));
  }
};
