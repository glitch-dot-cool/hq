import {
  FILES_LOADED,
  FILE_ERROR,
  B2_AUTH_LOADED,
  B2_AUTH_ERROR
} from "../actions/types";

const initialState = {
  loading: true,
  files: [],
  b2Auth: null,
  b2IsAuthenticated: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case B2_AUTH_LOADED:
      return {
        ...state,
        loading: false,
        b2IsAuthenticated: true,
        b2Auth: payload
      };
    case B2_AUTH_ERROR:
      return {
        ...state,
        loading: false,
        b2IsAuthenticated: false,
        b2Auth: null
      };
    case FILES_LOADED:
      return {
        ...state,
        loading: false,
        files: payload
      };
    case FILE_ERROR:
      return {
        ...state,
        loading: false,
        files: null
      };
    default:
      return state;
  }
}
