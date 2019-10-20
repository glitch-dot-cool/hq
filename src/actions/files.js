import axios from "axios";
import { setAlert } from "./alert";

import { FILES_LOADED, FILE_ERROR } from "./types";

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

    ipc.on("decryptedB2Auth", (event, args) => {
      console.log(args);
    });
  } catch (err) {
    console.error(err);
  }
};

// get list of all files in B2 bucket
export const listFiles = () => async dispatch => {
  try {
    const res = await axios.get("/api/files");

    dispatch({
      type: FILES_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert("Error retrieving file list", "danger"));
  }
};
