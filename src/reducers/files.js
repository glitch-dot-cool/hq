import { FILES_LOADED, FILE_ERROR } from "../actions/types";

const initialState = {
  loading: true,
  files: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
