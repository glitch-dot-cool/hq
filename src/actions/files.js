import axios from "axios";
import { setAlert } from "./alert";

import { FILES_LOADED, FILE_ERROR } from "./types";

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